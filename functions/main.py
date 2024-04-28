# Welcome to Cloud Functions for Firebase for Python!
# To get started, simply uncomment the below code or create your own.
# Deploy with `firebase deploy`
from dotenv import load_dotenv
from datetime import datetime
import os
import json
from firebase_functions import https_fn
from firebase_admin import initialize_app, db
import logging
from openai import OpenAI

client = OpenAI()

logger = logging.getLogger('cloudfunctions.googleapis.com%2Fcloud-functions')
logger.setLevel(logging.INFO)
logger.addHandler(logging.StreamHandler())

initialize_app()
load_dotenv()

@https_fn.on_request()
def on_request_example(req: https_fn.Request) -> https_fn.Response:
    return https_fn.Response("Hello world!")
    
    
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
def add_remedy(req: https_fn.CallableRequest) -> bool:
    user_remedy_ref = db.reference(f"users/{req.auth.uid}/onGoingRemedies")
    if not user_remedy_ref.get():
        #make an array an set it equal
        user_remedy_ref.set({
            0:{
                "remedyId":req.data["remedyId"],
                "rating":5,
                "dateStarted":datetime.now().isoformat()
            }
        })
    else:
        user_remedy_ref.push({
            "remedyId":req.data["remedyId"],
            "rating":5,
            "dateStarted":datetime.now().isoformat()
        })
    make_recommendation(req)

@https_fn.on_call()
def update_assistant(req: https_fn.CallableRequest) -> bool:
    create_assistant()

def create_assistant():
    remedies = db.reference(f"remedies").get()
    assistant = client.beta.assistants.create(
        name="Reemedy Assistant",
        description="The main chatting assistant for finding remedies for a user to use from the reemedy site.",
        instructions="""You are Reemedy's Doctor Assistant!

This assistant is designed to provide guidance akin to a doctor's sensibilities. It can offer suggestions and recommendations based on a set of remedies provided in the prompt or suggest seeking professional medical attention when necessary.

Here's how it operates:

1. **Empathy and Understanding**: The assistant prioritizes empathy and understanding, mimicking the bedside manner of a compassionate doctor. It aims to address users' concerns with care and respect.

2. **Remedy Evaluation**: When presented with a set of remedies, the assistant evaluates each option based on the user's symptoms or condition. It considers factors such as efficacy, safety, and appropriateness for the situation.

3. **Customized Recommendations**: Taking into account the user's specific needs and circumstances, the assistant tailors its recommendations accordingly. It may suggest specific remedies from the provided list or propose alternative approaches if none of the options are suitable. Each remedy will be accompanied by a remedy ID enclosed in curly braces {} for easy reference.

4. **Medical Caution**: If the user's condition requires professional medical attention, the assistant advises seeking help from a qualified healthcare provider. It emphasizes the importance of consulting a doctor for proper diagnosis and treatment, especially in cases of serious illness or injury.

5. **Educational Insights**: Alongside recommendations, the assistant provides informative insights to help users understand their symptoms, remedies, and potential courses of action. It aims to empower users with knowledge to make informed decisions about their health.

6. **Privacy and Confidentiality**: The assistant respects user privacy and maintains confidentiality regarding sensitive health information. It adheres to strict privacy protocols to ensure user trust and confidentiality.

7. **Continuous Learning and Improvement**: The assistant continuously learns from user interactions and feedback to improve its accuracy, effectiveness, and responsiveness over time. It strives to evolve and adapt to better serve users' healthcare needs.

Remember, while this assistant can offer valuable guidance and support, it's not a substitute for professional medical advice. Users should always consult with a qualified healthcare provider for personalized diagnosis and treatment. \n Here is the list of remedies""" + str(remedies),
        model= "gpt-4-turbo"
    )
    logger.info(assistant)
    db.reference(f"assistant/id/").set(assistant.id)
    db.reference(f"assistant/expiryDate").set(assistant.created_at+600)

@https_fn.on_call()
def do_chat_message(req: https_fn.CallableRequest) -> bool:
    user_ref = db.reference(f"users/{req.auth.uid}")
    user = user_ref.get()

    #validate user chat thread
    if"chatThreadExpiry" in user:
        threadExpiry = datetime.fromtimestamp(user["chatThreadExpiry"]+10)
        if threadExpiry <= datetime.now():
            user["chatThreadId"] = ""
    

    #validate assistant exists
    assistantExpiry = datetime.fromtimestamp(db.reference(f"assistant/expiryDate").get()+10)
    if assistantExpiry <= datetime.now():
        create_assistant()

    history_ref = db.reference(f"users/{req.auth.uid}/chatHistory")
    def addSelfMessage():
        if not history_ref.get():
            #make an array an set it equal
            history_ref.set({
                0:{
                    "message":{
                        "role": "user", "content": req.data['message']
                    },
                    "timeStamp":datetime.now().isoformat()
                }
            })
        else:
            history_ref.push({
                "message":{
                    "role": "user", "content": req.data['message']
                },
                "timeStamp":datetime.now().isoformat()
            })
    onGoingRemedies = db.reference(f"users/{req.auth.uid}/onGoingRemedies").get()
    name = user["name"]
    additional_instructions=f"The users name is {name}."
    if onGoingRemedies:
        additional_instructions += f"Here are the remedies the user is currently doing and their ratings of them! {str(additional_instructions)}"
    
    run = None
    if "chatThreadId" not in user or user["chatThreadId"] == "":
        logger.info("creating thread")
        # no chat thread id present, create a new thread
        all_messages = []
        message_history = history_ref.get()
        if message_history:
            for key in message_history:
                all_messages.append(
                    message_history[key]["message"]
                )
        addSelfMessage()
        all_messages.append(
            {"role": "user", "content": req.data['message']}
        )

        logger.info(all_messages)
        thread = client.beta.threads.create(
            messages= all_messages
        )
        
        run = client.beta.threads.runs.create_and_poll(
            assistant_id=db.reference(f"assistant/id/").get(),
            thread_id=thread.id,
            additional_instructions=additional_instructions
        )
        db.reference(f"users/{req.auth.uid}/chatThreadId").set(run.thread_id)
        db.reference(f"users/{req.auth.uid}/chatThreadExpiry").set(thread.created_at+600)
    else:
        client.beta.threads.messages.create(
            thread_id= user["chatThreadId"],
            role= "user",
            content= req.data['message']
        )
        addSelfMessage()
        run = client.beta.threads.runs.create_and_poll(
            thread_id= user["chatThreadId"],
            assistant_id=db.reference(f"assistant/id/").get(),
            additional_instructions=additional_instructions
        )
    logger.info(run)
    # capture result and add it to the databasecd .
    run_id = run.id
    generated_messages = client.beta.threads.messages.list(
        thread_id=run.thread_id,
        run_id=run_id,
        order="asc"
    )
    for message in generated_messages.data:
        logger.info(message)
        history_ref.push({
                "message":{
                    "role": "assistant", "content": message.content.pop().text.value
                },
                "timeStamp":datetime.now().isoformat()
            })
    return True


def make_recommendation(req: https_fn.CallableRequest) -> list:
    all_remedies_ref = db.reference("/remedies")
    all_remedies = all_remedies_ref.get()
    
    user_ref = db.reference(f"users/{req.auth.uid}")
    user = user_ref.get()
    
    prompt = ""
    
    if user:
        ongoing_remedies = user.get("onGoingRemedies", [])
        
        remedy_info_list = []
        for remedy_id, remedy_info in all_remedies.items():
            logger.info(remedy_id)
            remedy_name = remedy_info["name"]
            remedy_description = remedy_info["description"]
            remedy_benefits = remedy_info["benefits"]
            list_of_benefits = ", ".join(remedy_benefits)
            remedy_info_list.append(f"id: {remedy_id}, name: {remedy_name}, description: {remedy_description}, benefits: {list_of_benefits}")
            
        list_of_all_remedies = ", ".join(remedy_info_list)
        logger.info(list_of_all_remedies)
        
        if ongoing_remedies:
            list_of_remedies = ", ".join(ongoing_remedies)
            prompt = (
                f"I'm currently taking these natural remedies: {list_of_remedies}. "
                f"From all of these options: {list_of_all_remedies}. "
                "Please give me 3 recommendations for similar natural remedies. Please only return a list of the remedy id in this format (remedy1, remedy2, remedy3)"
            )
        else:
            prompt = (
                f"Please recommend me 3 natural remedies from this based on their remedyId: {list_of_all_remedies}. Please only return a list of the remedy id in this format (remedy1, remedy2, remedy3)"
            )
            
        logger.info(prompt)
        logger.info("HERE")
        client = OpenAI(
            api_key=os.environ.get("OPENAI_API_KEY"),
        )
        
        completion = client.chat.completions.create(
            model="gpt-4-turbo",
            messages=[
                {"role": "user", "content": prompt}
            ]
        )       

        contents = []
        for choice in completion.choices:
            content = choice.message.content
            # Split the string by comma and remove leading/trailing whitespace and parentheses
            remedies = [remedy.strip() for remedy in content.strip('()').split(',')]
            contents.extend(remedies)

        # Log the contents
        logger.info(contents)

        db.reference(f"users/{req.auth.uid}/recommendations").set(contents)
        # Convert the list to a JSON-formatted string
        contents_json = json.dumps(contents)

        # Log the JSON-formatted string
        logger.info(contents_json)
        return contents_json