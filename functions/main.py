# Welcome to Cloud Functions for Firebase for Python!
# To get started, simply uncomment the below code or create your own.
# Deploy with `firebase deploy`

from firebase_functions import https_fn
from firebase_admin import initialize_app, db
import logging
from openai import OpenAI

client = OpenAI()
assistant_id = "boomboomboom"

logger = logging.getLogger('cloudfunctions.googleapis.com%2Fcloud-functions')
logger.setLevel(logging.INFO)
logger.addHandler(logging.StreamHandler())

initialize_app()


@https_fn.on_request()
def on_request_example(req: https_fn.Request) -> https_fn.Response:
    return https_fn.Response("Hello world!")

# Function to fetch user data from Firebase Realtime Database

def fetch_user_data(email):
    ref = db.reference('users')
    snapshot = ref.order_by_child('email').equal_to(email).get()

    if snapshot:
        user_data = next(iter(snapshot.values()))  # Get the first user data
        return user_data
    else:
        return None
    
    
@https_fn.on_call()
def sign_up(req: https_fn.CallableRequest) -> bool:
    user_ref = db.reference(f"users/{req.auth.uid}")
    user = user_ref.get()
    logger.info(req)
    logger.info(req.data)
    if not user:
        # temporary preset data
        user_ref.set({
            "profilePicture": "https://firebasestorage.googleapis.com/v0/b/reemedy-backend.appspot.com/o/profilePhotos%2FbaseProfilePicture.png?alt=media&token=bf180f68-fbc6-4ff2-84b3-8ecf56d8dfee",
            "name": req.data['name'],
            "email": req.data['email'],
            "description": "Hey everyone I'm new to this app!",
            "isVerified": False,
            "subscriptionTier": "Free",
            "onGoingRemedies": [],
            "chatThreadId": "",
            "chatHistory": []
        })
        return True
    else:
        return False
    
@https_fn.on_call()
def do_chat_message(req: https_fn.CallableRequest) -> str:
    user_ref = db.reference(f"users/{req.auth.uid}")
    user = user_ref.get()

    run = None
    if "chatThreadId" not in user:
        # no chat thread id present, create a new thread
        all_messages = [chatHistory.message for chatHistory in user.chatHistory].append(
            {"role": "user", "content": req.data['message']}
        )
        run = client.beta.threads.create_and_run_poll(
            assistant_id=assistant_id,
            thread={
                "messages": all_messages
            }
        )
    else:
        client.beta.threads.messages.create(
            role= "user",
            content= req.data['message']
        )
        run = client.beta.threads.runs.create_and_poll(
            thread_id= user["chatThreadId"],
            assistant_id=assistant_id
        )
    logger.info(run)
    return ""

@https_fn.on_call()
def make_recommendation(req: https_fn.CallableRequest) -> list:
    all_remedies_ref = db.reference("remedies")
    all_remedies = all_remedies_ref.get()
    
    user_ref = db.reference(f"users/{req.auth.uid}")
    user = user_ref.get()
    

    prompt = ""
    
    if user:
        ongoing_remedies = user.get("onGoingRemedies", [])
        
        remedy_info_list = []
        for remedy_info in all_remedies:
            remedy_name = remedy_info.get("name", "Unknown Name")
            remedy_description = remedy_info.get("description", "No description available")
            remedy_benefits = remedy_info.get("benefits")
            remedy_info_list.append(f"name: {remedy_name}, description: {remedy_description}, benefits: {remedy_benefits}")
            
        list_of_all_remedies = ", ".join(remedy_info_list)
        
        if ongoing_remedies:
            list_of_remedies = ", ".join(ongoing_remedies)
            prompt = f"I'm currently taking these natural remedies: {list_of_remedies}. From all of these options: {list_of_all_remedies}. Please give me 5 recommendations for similar natural remedies based on remedyId"
        else: 
            prompt = f"Please recommend me 5 natural remedies from this based on their remedyId: {list_of_all_remedies}."
        
        client = OpenAI()
        completion = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are a Doctor who specializes in natural remedies"},
                {"role": "user", "content": prompt}
            ]
        )

        logger.info(completion.choices[0].message)
    return []