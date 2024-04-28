# Welcome to Cloud Functions for Firebase for Python!
# To get started, simply uncomment the below code or create your own.
# Deploy with `firebase deploy`

from firebase_functions import https_fn
from firebase_admin import initialize_app, db
from openai import OpenAI
from dotenv import load_dotenv

import logging
import openai
import os
import json

logger = logging.getLogger('cloudfunctions.googleapis.com%2Fcloud-functions')
logger.setLevel(logging.INFO)
logger.addHandler(logging.StreamHandler())

# openai.api_key = 'sk-proj-k9n3hai8ISoaHuDt4OELT3BlbkFJuEYQLWxcC8QZYfFt7Tue'
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

        # Convert the list to a JSON-formatted string
        contents_json = json.dumps(contents)

        # Log the JSON-formatted string
        logger.info(contents_json)
        return contents_json
        

        
        
        
         
        
        
            

    