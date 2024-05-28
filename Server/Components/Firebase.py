from firebase_admin import initialize_app
from firebase_admin.credentials import Certificate

try:
    credentials: Certificate = Certificate("../FirebaseKeys.json")
    firebase = initialize_app(credentials)
except Exception:
    print("Firebase Initialization Failed")
    
