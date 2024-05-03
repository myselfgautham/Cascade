from firebase_admin import initialize_app
from firebase_admin.credentials import Certificate
from firebase_admin import App
from firebase_admin.auth import create_user
from os.path import abspath
from firebase_admin.auth import EmailAlreadyExistsError
from firebase_admin.auth import PhoneNumberAlreadyExistsError
from Server.PasswordAnalyser import SQLInjectionCharactersError
from Server.PasswordAnalyser import PasswordAnalyser

class WeakPasswordError(Exception):
    message: str = "Choose A Stronger Password"
    def __init__(self) -> None:
        super().__init__(self.message)
        return None

serviceAccountKey: Certificate = Certificate(abspath("Server/SimpleServer.json"))
firebaseApplication: App = initialize_app(serviceAccountKey)

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
            password = password
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
    except Exception as e:
        print(e)
        return {"response": "Something Went Wrong"}