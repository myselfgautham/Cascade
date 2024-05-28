# Firebase Admin SDK Import
from firebase_admin.credentials import Certificate
from firebase_admin import App
from firebase_admin import initialize_app
from firebase_admin.auth import get_user_by_email
from firebase_admin.auth import generate_email_verification_link
from firebase_admin._user_mgt import UserRecord
from firebase_admin.auth import create_user

# Firebase Account Creation Errors
from firebase_admin.auth import (
    PhoneNumberAlreadyExistsError,
    EmailAlreadyExistsError
)

# SendGrid API Client
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail

# Custom Exceptions Import
from Exceptions import SQLInjectionCharactersError
from Exceptions import WeakPasswordError

# Firebase Admin SDK Class
class FirebaseSDK(object):
    def __init__(self, credentials: Certificate) -> None:
        self.credentials: Certificate = credentials
    def initialiseFirebase(self) -> App | None:
        try:
            application: App = initialize_app(self.credentials)
            return application
        except Exception:
            return None
    class FirebaseAuthentication(object):
        def __init__(self, instance: App) -> None:
            self.firebase: App = instance
        def createNewUserAccount(self, email: str, password: str, name: str, phone: str) -> str:
            try:
                if not PasswordAnalyser(password).isStrongPassword:
                    raise WeakPasswordError
                create_user(
                    display_name=name,
                    email=email,
                    email_verified=False,
                    phone_number=phone,
                    password=password,
                    disabled=False,
                    app=self.firebase
                )
                return "Account Created Successfully"
            except PhoneNumberAlreadyExistsError:
                return "Phone Number Already Registered"
            except EmailAlreadyExistsError:
                return "Email Already Registered"
            except SQLInjectionCharactersError:
                return SQLInjectionCharactersError.message
            except WeakPasswordError:
                return WeakPasswordError.message
            except Exception:
                return "Something Went Wrong"
            

# SendGrid SMTP Client Class
class SendGridComponentSDK(object):
    def __init__(self, sendGridSDKKey: str) -> None:
        self.key = sendGridSDKKey
        self.sendGridClient = None
    def initialiseSendGrid(self) -> bool:
        try:
            self.sendGridClient = SendGridAPIClient(self.key)
            return True
        except Exception:
            return False
    def sendVerificationEmail(self, email: str, firebaseInstance: App):
        try:
            message = Mail(
                from_email="gauthamkrishnav@icloud.com",
                to_emails=email,
                subject="Swift Account Email Verification"
            )
            user: UserRecord = get_user_by_email(email=email, app=firebaseInstance)
            message.dynamic_template_data = {
                "name": user.display_name,
                "url": generate_email_verification_link(email=email)
            }
            message.template_id = "d-e57dd5ac3b2b423994c161d316b3dc0f"
            self.sendGridClient.send(message=message)
            return True
        except Exception as error:
            print(f"\n{error}\n\n", end="")
            return False
        
# Password Analyzer Class
class PasswordAnalyser(object):
    def __init__(self, password: str) -> None:
        self.password = password
        if "\"" in self.password or "\'" in self.password:
            raise SQLInjectionCharactersError()
    @property
    def isStrongPassword(self):
        score: int = 100
        criteria: list[bool] = [
            any(char.isupper() for char in self.password),
            any(char.islower() for char in self.password),
            any(char.isdigit() for char in self.password),
            any(char in "!@#$%^&*()-_+=~`[]{}|\\:;\"'<>,.?/" for char in self.password),
            len(self.password) >= 8
        ]
        for x in criteria:
            if (not x):
                score -= 20
            else:
                continue
        return score >= 60