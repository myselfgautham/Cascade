from pyrebase import pyrebase
from firebase_admin.auth import get_user_by_email
from Firebase import data

firebaseConfig: dict[str,str] = data["FireBaseSDK"]

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
        response["response"] = "Proceeding To Verification"
    except pyrebase.HTTPError:
        response['response'] = "Invalid Credentials"
    except UserNotVerified:
        response["response"] = UserNotVerified.message
    finally:
        return response