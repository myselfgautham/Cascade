from flask import Flask
from flask import request
from firebase_admin import initialize_app
from firebase_admin.credentials import Certificate
from firebase_admin import App
from firebase_admin.auth import create_user
from firebase_admin.auth import (
    EmailAlreadyExistsError,
    PhoneNumberAlreadyExistsError
)
from flask import jsonify
from PasswordAnalyser import (
    SQLInjectionCharactersError,
    PasswordAnalyzer,
    WeakPasswordError
)
from sendgrid import (
    Mail,
    SendGridAPIClient
)
from firebase_admin._user_mgt import UserRecord
from flask_cors import CORS
from pyrebase import pyrebase
from firebase_admin.auth import (
    get_user_by_email,
    generate_email_verification_link    
)

application = Flask(__name__)
method = ["POST"]
credentials = Certificate("./Administrator.json")
cors = CORS(app=application, origins=["http://localhost:3000"])
try:
    firebase: App = initialize_app(credentials)
except Exception:
    print("\nFirebase Failed To Initialise\n\n")
firebaseConfig = {
  "apiKey": "AIzaSyCDyvXeVLxNr3g8oYHu9EU1BU5pSofbpt8",
  "authDomain": "swiftjs-development.firebaseapp.com",
  "projectId": "swiftjs-development",
  "storageBucket": "swiftjs-development.appspot.com",
  "messagingSenderId": "396909879457",
  "appId": "1:396909879457:web:47e323aa1ca83f686fd0e0",
  "measurementId": "G-REWZSYLBHN",
  "databaseURL": ""
}
class UserNotVerified(Exception):
    message = "Account Not Verified"
    def __init__(self) -> None:
        super().__init__(self.message)
        return None
try:
    pyrebaseClient = pyrebase.initialize_app(firebaseConfig)
    auth = pyrebaseClient.auth()
except Exception:
    print("\nPyrebase Client Failed\n\n")

@application.route("/api/accounts/create", methods = method)
def createNewAccount():
    try:
        data: dict = request.json
        analyser: bool = PasswordAnalyzer(data.get("password")).getStrength()
        if not (analyser):
            raise WeakPasswordError
        create_user(
            display_name = data.get("name"),
            email = data.get("email"),
            email_verified = False,
            phone_number = data.get("phone"),
            password = data.get("password"),
            disabled = False
        )
        sendVerificationEmail(email=data.get("email"))
        return jsonify({"Response": "Account Created Successfully"})
    except PhoneNumberAlreadyExistsError:
        return jsonify({"Response": "Phone Number Already Exists"})
    except EmailAlreadyExistsError:
        return jsonify({"Response": "Email Already Registered"})
    except WeakPasswordError:
        return jsonify({"Response": WeakPasswordError.message})
    except SQLInjectionCharactersError:
        return jsonify({"Response": SQLInjectionCharactersError.message})
    except Exception:
        return jsonify({"Response": "Something Went Wrong"})

@application.route("/api/accounts/login", methods = method)
def loginExistingUser():
    try:
        data: dict = request.json
        email = data.get("email")
        password = data.get("password")
        user = get_user_by_email(email=email)
        if not (user.email_verified):
            raise UserNotVerified()
        _ = auth.sign_in_with_email_and_password(email=email, password=password)
        return jsonify({"Response": "Proceeding To Verification"})
    except UserNotVerified:
        return jsonify({"Response": UserNotVerified.message})
    except pyrebase.HTTPError:
        return jsonify({"Response": "Invalid Credentials"})
    except Exception:
        return jsonify({"Reponse": "Something Went Wrong"})

def sendVerificationEmail(email: str):
    try:
        message = Mail(
            from_email="gauthamkrishnav@icloud.com",
            to_emails=email,
            subject="Simple Account Email Verification"
        )
        user: UserRecord = fetchUserFromEmail(email=email)
        message.dynamic_template_data = {
            "name" : user.display_name,
            "url" : generate_email_verification_link(email=email)
        }
        message.template_id = "d-e57dd5ac3b2b423994c161d316b3dc0f"
        sg = SendGridAPIClient("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")
        sg.send(message)
        return True
    except Exception:
        return False

def fetchUserFromEmail(email: str):
    try:
        user: UserRecord = get_user_by_email(email=email)
        return user
    except Exception:
        return {}

if (__name__ == "__main__"):
    application.run(
        debug = True,
        port = 1920,
        threaded = True
    )