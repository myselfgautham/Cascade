from firebase_admin import initialize_app
from firebase_admin.credentials import Certificate
from firebase_admin import App
from firebase_admin.auth import create_user
from os.path import abspath
from firebase_admin.auth import EmailAlreadyExistsError
from firebase_admin.auth import PhoneNumberAlreadyExistsError

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
    Return Type : Integer
    Dependencies : Firebase Admin SDK For Python
    Exception Classes : 
    """
    try:
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
    except Exception as e:
        print(f"\n{e}\n")