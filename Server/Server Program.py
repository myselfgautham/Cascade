from flask import (
    Flask,
    render_template,
    request,
    jsonify
)
from flask_caching import Cache
from flask_compress import Compress
from pyrebase.pyrebase import (
    initialize_app as pyrebaseSDK,
    HTTPError
)
from re import search
from firebase_admin import initialize_app
from firebase_admin.credentials import Certificate
from firebase_admin.auth import (
    create_user,
    PhoneNumberAlreadyExistsError,
    EmailAlreadyExistsError,
    get_user_by_email,
    UserNotFoundError
)
from uuid import uuid4
from firebase_admin._user_mgt import UserRecord
from firebase_admin import firestore
from datetime import datetime
from datetime import UTC
from google.cloud.firestore import FieldFilter

application: Flask = Flask(__name__)
application.static_folder = "../Client/"
application.template_folder = "../Client/HTML/"
Compress(app=application)
cache: Cache = Cache(app=application, config={
    "CACHE_TYPE": "simple",
    "CACHE_DEFAULT_TIMEOUT": 300
})

credentials = Certificate("../Certificates/Firebase.json")
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
authentication = pyrebaseSDK(config=firebaseConfig).auth()
firebase = initialize_app(credentials)
db = firestore.client(app=firebase)

def isStrongPassword(password: str) -> bool:
    if (len(password) < 8):
        return False
    if not (search(r'[A-Z]', password)):
        return False
    if not (search(r'[a-z]', password)):
        return False
    if not (search(r'\d', password)):
        return False
    if not (search(r'[^A-Za-z0-9]', password)):
        return False
    return True

@cache.cached(timeout=None)
@application.get("/")
def serveHomePage():
    return render_template("HomePage.html")

@application.route("/account/create", methods = ["GET", "POST"])
def createNewSwiftAccount():
    if (request.method == "GET"):
        return render_template("CreateAccount.html")
    else:
        try:
            data: dict = request.json
            if ("\'" in data.get("password")) or ("\"" in data.get("password")):
                return jsonify({"Response": "Invalid Password"})
            elif not (isStrongPassword(data.get("password"))):
                return jsonify({"Response": "Choose A Stronger Password"})
            create_user(
                display_name=data.get("name"),
                email=data.get("email"),
                email_verified=True,
                phone_number=data.get("phone"),
                password=data.get("password"),
                disabled=False,
                app=firebase
            )
            return jsonify({"Response": "Account Created Successfully"})
        except PhoneNumberAlreadyExistsError:
            return jsonify({"Response": "Phone Number Already Registered"})
        except EmailAlreadyExistsError:
            return jsonify({"Response": "Email Already Registered"})
        except Exception as e:
            print(f"\n{e}", end="\n\n")
            return jsonify({"Response": "Something Went Wrong"})
        
@application.route("/account/login", methods = ["GET", "POST"])
def initiateLoginProcess():
    if request.method == "GET":
        return render_template("LoginPage.html")
    else:
        try:
            data: dict = request.json
            user: UserRecord = get_user_by_email(
                email=data.get("email"),
                app=firebase
            )
            if not (user.email_verified):
                return jsonify({"Response": "Account Not Verified"})
            authentication.sign_in_with_email_and_password(
                email=data.get("email"),
                password=data.get("password")
            )
            user: UserRecord = get_user_by_email(data.get("email"))
            db.collection("Devices").document(data.get("uid")).set({
                "Device UID": data.get("uid"),
                "User Email": data.get("email"),
                "User Account": user.uid,
                "User Name": user.display_name,
                "User Phone Number": user.phone_number,
                "Authorization Time": datetime.now(UTC).strftime('%Y-%m-%d %H:%M:%S UTC')
            })
            return jsonify({"Response": "Login Completed"})
        except HTTPError:
            raise jsonify({"Response": "Invalid Credentials"})
        except Exception:
            return jsonify({"Response": "Try Again Later"})
        
@application.route("/api/device", methods = ["POST"])
def generateNewUUIDForDevice():
    return jsonify({"Response": str(uuid4())})

@application.route("/user/dashboard", methods = ["GET"])
@cache.cached(timeout=3600)
def serveDashboardPage():
    return render_template("DashboardPage.html")

def checkDeviceAuthorization(uid: str) -> bool:
    try:
        doc_ref = db.collection("Devices").document(uid).get()
        if (doc_ref.exists):
            return True
        else:
            return False
    except Exception:
        return False
    
@application.route("/api/cards", methods = ["POST"])
def cardsJSONDataServe():
    try:
        data: dict = request.json
        if not checkDeviceAuthorization(data.get("uid")):
            return jsonify({"Response": "Unauthorized Device"})
        documents = db.collection("Cards").where(filter=FieldFilter("Owners", "array_contains", data.get("email"))).stream()
        cards = {}
        for doc in documents:
            cards[doc.id] = doc.to_dict()
        return jsonify({"Response": cards})
    except Exception:
        return jsonify({"Response": {}})
    
@application.route("/user/manage", methods = ["GET", "POST"])
def serveAccountManagementPage():
    if (request.method == "GET"):
        return render_template("ManageAccount.html")
    else:
        try:
            data: dict = request.json
            user: UserRecord = get_user_by_email(data.get("email"))
            devices = db.collection("Devices").where(filter=FieldFilter("`User Email`", "==", data.get("email"))).stream()
            cards = db.collection("Cards").where(filter=FieldFilter("Owners", "array_contains", data.get("email"))).stream()
            devLen: int = 0
            cardsLen: int = 0
            vendors = set()
            for _ in devices:
                devLen += 1
            for card in cards:
                cardsLen += 1
                vendor: str = card.get("Vendor")
                if vendor not in vendors:
                    vendors.add(vendor)
            return jsonify({"Response": {
                "Name": user.display_name,
                "Cards": cardsLen,
                "Devices": devLen,
                "Vendors": len(vendors)
            }})
        except Exception:
            return jsonify({"Response": "Error"})

@application.route("/api/logout", methods = ["POST"])
def logOutUser():
    try:
        data: dict = request.json
        reference = db.collection("Devices").document(data.get("uid"))
        fetch = reference.get()
        if (fetch.exists):
            reference.delete()
            return jsonify({"Response": "S"})
        else:
            raise Exception
    except Exception:
        return jsonify({"Response": "F"})
    
@application.route("/cards/share", methods = ["GET", "POST"])
def shareCardUIAndEndpoint():
    if request.method == "GET":
        return render_template("ShareCard.html")
    else:
        try:
            get_user_by_email(request.json.get("email"))
            if not (checkDeviceAuthorization(request.json.get("uid"))):
                raise Exception("Invalid Device")
            db.collection("Cards").document(request.json.get("card")).update({
                "Owners": firestore.ArrayUnion([request.json.get("email")])
            })
            return jsonify({"Response": "Added"})
        except UserNotFoundError:
            return jsonify({"Response": "User Not Found"})
        except Exception:
            return jsonify({"Response": "Card Share Failed"})