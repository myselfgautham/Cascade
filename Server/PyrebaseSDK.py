from pyrebase import pyrebase
from firebase_admin.auth import get_user_by_email

firebaseConfig: dict[str,str] = {
  "apiKey": "AIzaSyBIpNPJ1jYxuHmAlEJVeQEaFuWz2wofONc",
  "authDomain": "simple-cards-unifier.firebaseapp.com",
  "projectId": "simple-cards-unifier",
  "storageBucket": "simple-cards-unifier.appspot.com",
  "messagingSenderId": "811926276875",
  "appId": "1:811926276875:web:063a3e48382e336421f00e",
  "measurementId": "G-ZPBVDRMDZT",
  "databaseURL": ""
}

class UserNotVerified(Exception):
    message = "Account Not Verified"
    def __init__(self) -> None:
        super().__init__(self.message)
        return None

application = pyrebase.initialize_app(firebaseConfig)
authentication = application.auth()

def loginUserWithEmailAndPassword(email: str, password: str):
    user = get_user_by_email(email=email)
    response = {}
    try:
        _ = authentication.sign_in_with_email_and_password(email=email, password=password)
        if not user.email_verified:
            raise UserNotVerified()
        response["response"] = "Sign In Completed Successfully"
    except pyrebase.HTTPError:
        response['response'] = "Invalid Credentials"
    except UserNotVerified:
        response["response"] = UserNotVerified.message
    finally:
        return response