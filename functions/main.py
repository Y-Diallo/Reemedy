# Welcome to Cloud Functions for Firebase for Python!
# To get started, simply uncomment the below code or create your own.
# Deploy with `firebase deploy`

from firebase_functions import https_fn
from firebase_admin import initialize_app, db
from openai import OpenAI

import logging

logger = logging.getLogger('cloudfunctions.googleapis.com%2Fcloud-functions')
logger.setLevel(logging.INFO)
logger.addHandler(logging.StreamHandler())

# openai.api_key = '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'
initialize_app()


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
def make_recommendation(req: https_fn.CallableRequest) -> list:
    user_ref = db.reference(f"users/{req.auth.uid}")
    user = user_ref.get()
    
    if user:
        ongoing_remedies = user.get("onGoingRemedies", [])
        prompt = "I'm currently taking these natural remedies: " 
        
        if ongoing_remedies:
            list_of_remedies = ", ".join(ongoing_remedies)
            prompt += list_of_remedies + ". Please give me 5 recommendations for similar natural remedies"
        else: 
            prompt = "Please recommend me 5 natural remedies"
        
        client = OpenAI()
        completion = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are a Doctor who specialize in natural remedies"},
                {"role": "user", "content": prompt}
            ]
        )

        logger.info(completion.choices[0].message)

        
        
        
            

    