import json
from firebase_admin import initialize_app
from firebase_admin.credentials import Certificate
from firebase_admin import App
from firebase_admin.auth import create_user
from os.path import abspath
from firebase_admin import firestore
from datetime import datetime
from datetime import UTC
from firebase_admin._user_mgt import UserRecord
from firebase_admin.auth import get_user_by_email
from firebase_admin.auth import EmailAlreadyExistsError
from firebase_admin.auth import PhoneNumberAlreadyExistsError
from PasswordAnalyser import SQLInjectionCharactersError
from PasswordAnalyser import PasswordAnalyser
from firebase_admin.auth import get_user
from firebase_admin.auth import generate_password_reset_link
from firebase_admin.auth import generate_email_verification_link
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail

class WeakPasswordError(Exception):
    message: str = "Choose A Stronger Password"
    def __init__(self) -> None:
        super().__init__(self.message)
        return None

serviceAccountKey: Certificate = Certificate(abspath("Server/SimpleServer.json"))
firebaseApplication: App = initialize_app(serviceAccountKey)
FIRESTORE = firestore.client(firebaseApplication)

with open(abspath("./Server/SimpleServer.json")) as file:
    data = json.load(file)

def createNewUserAccount(fullName: str, eMail: str, phoneNumber: str, password: str) -> dict[str]:
    """
    Creates New User With The Given
    Display Name
    E Mail Address
    Phone Number
    And Password
    Usage : createNewUserAccount(fullName: str, eMail: str, phoneNumber: str, password: str)
    Return Type : HashMap
    Dependencies : Firebase Admin SDK For Python
    Exception Classes : Firebase Exception & Weak Password Error & SQL Injection Error
    """
    try:
        if not PasswordAnalyser(password).getStrength():
            raise WeakPasswordError()
        create_user (
            display_name = fullName,
            email = eMail,
            phone_number = phoneNumber,
            password = password,
            email_verified = False
        )
        sendVerificationEmail(eMail)
        return {"response": "Account Created Successfully"}
    except PhoneNumberAlreadyExistsError:
        return {"response": "Phone Number Already Exists"}
    except EmailAlreadyExistsError:
        return {"response": "Email ID Already Exists"}
    except WeakPasswordError:
        return {"response": WeakPasswordError.message}
    except SQLInjectionCharactersError:
        return {"response": SQLInjectionCharactersError.message}
    except Exception as e:
        print(e)
        return {"response": "Something Went Wrong"}
    
def createNewDocument(collection: str, document: str, data: dict):
    try:
        FIRESTORE.collection(collection).document(document).set(data)
        return True
    except Exception:
        return False

def updateDocument(collection: str, document: str, data: dict):
    try:
        FIRESTORE.collection(collection).document(document).update(data)
        return True
    except Exception:
        return False
    
def deleteDocument(collection: str, document: str):
    try:
        FIRESTORE.collection(collection).document(document).delete()
        return True
    except Exception:
        return False
    
def readDocument(collection: str, document: str) -> dict:
    try:
        DOCUMENT = FIRESTORE.collection(collection).document(document).get()
        if (DOCUMENT.exists):
            DOCUMENT = DOCUMENT.to_dict()
            return DOCUMENT
        else:
            return {}
    except Exception:
        return {}
    
def getUserUIDFromEMail(email: str) -> str:
    try:
        USER: UserRecord = get_user_by_email(email)
        return USER.uid
    except Exception:
        return ""

def getUserRealName(email: str) -> str:
    try:
        USER: UserRecord = get_user_by_email(email)
        return USER.display_name
    except Exception:
        return ""
    
def registerDevice(uid: str, user: str):
    try:
        current_utc_time = datetime.now(UTC)
        utc_time_string = current_utc_time.strftime('%Y-%m-%d %H:%M:%S')
        createNewDocument("Devices", uid, {
            "Device UID": uid,
            "Active User": getUserUIDFromEMail(user),
            "Activation Time": utc_time_string,
            "Name Of User": getUserRealName(user),
            "Email Address": user
        })
        return True
    except Exception:
        return False
    
def resetPassword(email: str):
    try:
        link = generate_password_reset_link(email=email)
        return link
    except Exception:
        return "Something Went Wrong"
    
def getPhoneNumber(uid: str) -> str:
    try:
        user: UserRecord =  get_user(uid=uid)
        return user.phone_number
    except Exception:
        return ""
    
def getEmailVerificationLink(email: str):
    try:
        return generate_email_verification_link(email)
    except Exception:
        return ""
    
def sendVerificationEmail(email: str):
    try:
        message = Mail(
            from_email=data["Twilio SendGrid"]["Mail"],
            to_emails=email,
            subject="Simple Account Email Verification"
        )
        message.dynamic_template_data = {
            "name" : getUserRealName(email),
            "url" : getEmailVerificationLink(email)
        }
        message.template_id = data["Twilio SendGrid"]["Templates"]["Verification"]
        sg = SendGridAPIClient(data["Twilio SendGrid"]["Key"])
        sg.send(message)
        return True
    except Exception:
        return False
    
def getVerificationStatus(email: str) -> bool:
    user: UserRecord = get_user(uid=getUserUIDFromEMail(email))
    return user.email_verified