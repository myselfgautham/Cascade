# Scripts Import Firebase
from firebase_admin import App
from firebase_admin.credentials import Certificate
from firebase_admin import firestore
from firebase_admin.auth import create_user
from firebase_admin.auth import PhoneNumberAlreadyExistsError
from firebase_admin.auth import EmailAlreadyExistsError
from firebase_admin._user_mgt import UserRecord
from firebase_admin.auth import get_user
from firebase_admin.auth import generate_email_verification_link
from firebase_admin.auth import get_user_by_email
from google.cloud.firestore_v1.base_query import FieldFilter

# Scripts Import Definitions
from Definitions import FirebaseSDK
from Definitions import Path

# Password Analyzer Imports
from Passwords import PasswordAnalyzer

# Exceptions Import
from Exceptions import SQLInjectionCharactersError
from Exceptions import WeakPasswordError

# Date Time Import
from datetime import datetime
from datetime import UTC

# Firebase Application Initialization
firebaseSDK = FirebaseSDK(
    Credentials = Certificate(Path("../../Configurations/SimpleServer.json").absolute)
)
firebase: App = firebaseSDK.initialiseFirebase()
FIRESTORE = firestore.client(firebase)

# Create New User Account
def createNewUserAccount(fullName: str, eMail: str, phoneNumber: str, password: str) -> dict[str]:
    try:
        if not PasswordAnalyzer(password).isSecurePassword:
            raise WeakPasswordError
        create_user (
            display_name = fullName,
            email = eMail,
            phone_number = phoneNumber,
            password = password,
            email_verified = False
        )
        return {"response": "Account Created Successfully"}
    except PhoneNumberAlreadyExistsError:
        return {"response": "Phone Number Already Exists"}
    except EmailAlreadyExistsError:
        return {"response": "Email ID Already Exists"}
    except WeakPasswordError:
        return {"response": WeakPasswordError.message}
    except SQLInjectionCharactersError:
        return {"response": SQLInjectionCharactersError.message}
    except Exception:
        return {"response": "Something Went Wrong"}

# User Verification Status
def getVerificationStatus(email: str) -> bool:
    user: UserRecord = get_user(uid=getUserUIDFromEMail(email))
    return user.email_verified

# User UID From Email
def getUserUIDFromEMail(email: str) -> str:
    try:
        USER: UserRecord = get_user_by_email(email)
        return USER.uid
    except Exception:
        return ""

# Get User Real Name
def getUserRealName(email: str) -> str:
    try:
        USER: UserRecord = get_user_by_email(email)
        return USER.display_name
    except Exception:
        return ""

# Register Device
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
    
# Firebase => Create Document
def createNewDocument(collection: str, document: str, data: dict):
    try:
        FIRESTORE.collection(collection).document(document).set(data)
        return True
    except Exception:
        return False
    
# Firebase => Read Document
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
    
# Firebase => Delete Document
def deleteDocument(collection: str, document: str):
    try:
        FIRESTORE.collection(collection).document(document).delete()
        return True
    except Exception:
        return False
    
# Email Verification Link
def getEmailVerificationLink(email: str):
    try:
        return generate_email_verification_link(email)
    except Exception:
        return ""
    
# Check Device Existence
def checkDeviceExistence(uid: str) -> bool:
    reference = FIRESTORE.collection("Devices").document(uid)
    document = reference.get()
    return True if document.exists else False

# Signed In Devices
def getSignedInDevices(email: str, length: bool = True) -> int:
    try:
        filter: FieldFilter = FieldFilter("`Active User`","==",getUserUIDFromEMail(email))
        document = FIRESTORE.collection("Devices").where(filter=filter).get()
        return len(document) if length else document
    except Exception:
        return 0