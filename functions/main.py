# Welcome to Cloud Functions for Firebase for Python!
# To get started, simply uncomment the below code or create your own.
# Deploy with `firebase deploy`

from firebase_functions import https_fn
from firebase_admin import initialize_app, db

import logging

logger = logging.getLogger('cloudfunctions.googleapis.com%2Fcloud-functions')
logger.setLevel(logging.INFO)
logger.addHandler(logging.StreamHandler())

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
            "profilePicture": "linkToStorage",
            "name": req.data['name'],
            "email": req.data['email'],
            "description": "Hey everyone I'm your favorite nutritionist",
            "isVerified": False,
            "subscriptionTier": "Free",
            "onGoingRemedies": [
            {
                "rating": 3,
                "dateStarted": "dateString",
                "remedyId": "remedy1"
            }
            ],
            "chatThreadId": "openai1",
            "chatHistory": [
            {
                "role": "user",
                "content": "I have a crazy red rash please help.",
                "timeStamp": "dateString"
            }
            ]
        })
        return True
    else:
        return False