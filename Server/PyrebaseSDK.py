from pyrebase import pyrebase

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

application = pyrebase.initialize_app(firebaseConfig)
authentication = application.auth()

def loginUserWithEmailAndPassword(email: str, password: str):
    response = {}
    try:
        _ = authentication.sign_in_with_email_and_password(email=email, password=password)
        response["response"] = "Sign In Completed Successfully"
    except pyrebase.HTTPError:
        response['response'] = "Invalid Credentials"
    finally:
        return response