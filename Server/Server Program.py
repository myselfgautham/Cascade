# Flask MVC Framework Imports
from flask import (
    Flask,
    render_template,
    request,
    jsonify
)
from flask_caching import Cache
from flask_compress import Compress
from flask_cors import CORS

# Firebase Admin SDK Imports
from firebase_admin import initialize_app
from firebase_admin.credentials import Certificate
from firebase_admin.auth import (
    create_user,
    PhoneNumberAlreadyExistsError,
    EmailAlreadyExistsError,
    get_user_by_email,
    UserNotFoundError,
    generate_email_verification_link
)
from google.cloud.firestore import FieldFilter
from firebase_admin._user_mgt import UserRecord
from firebase_admin import firestore

# Pyrebase SDK Imports
from pyrebase.pyrebase import (
    initialize_app as pyrebaseSDK,
    HTTPError
)

# Device UID Generator Import
from uuid import uuid4

# Date Time ( Python ) Imports
from datetime import datetime
from datetime import UTC

# SendGrid Imports
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail

# Miscellaneous Imports
from re import search
from psutil import cpu_percent
from os import environ
from json import loads

# Firebase Admin SDK & Pyrebase Setup
credentials = Certificate(loads(environ.get("FIREBASE")))
firebaseConfig = loads(environ.get("PYREBASE"))
authentication = pyrebaseSDK(config=firebaseConfig).auth()
firebase = initialize_app(credentials)
db = firestore.client(app=firebase)

# Application Configuration
application: Flask = Flask(__name__)
application.static_folder = "../Website/"
application.template_folder = "../Website/Pages/"
application.config["CORS_HEADERS"] = "Content-Type"
Compress(app=application)
cache: Cache = Cache(app=application, config={
    "CACHE_TYPE": "simple",
    "CACHE_DEFAULT_TIMEOUT": 300
})
_ = CORS(
    app=application,
    origins=["http://192.168.143.177:3000"]
)

# SendGrid Configuration
sendgrid: SendGridAPIClient = SendGridAPIClient(
    api_key=environ.get("SENDGRID")
)

# User Password Strength Checker
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

# Device Authorization Checker Function
def checkDeviceAuthorization(uid: str, email: str) -> bool:
    try:
        document = db.collection("Devices").document(uid).get()
        if not document.exists:
            return False
        try:
            if (document.to_dict().get("User Email") == email):
                return True
            else:
                return False
        except Exception:
            return False
    except Exception:
        return False

# Customer Side Routes : Home
@cache.cached(timeout=None)
@application.get("/")
def serveHomePage():
    return render_template("HomePage.html")

# Consumer Side Route : Create Account
@application.route("/account/create", methods = ["GET", "POST"])
def createNewUserAccount():
    if (request.method == "GET"):
        return render_template("CreateAccount.html")
    else:
        try:
            data: dict = request.json
            if ("\'" in data.get("password")) or ("\"" in data.get("password")):
                return jsonify({"Response": "Invalid Password"})
            elif not (isStrongPassword(data.get("password"))):
                return jsonify({"Response": "Choose A Stronger Password"})
            try:
                message: Mail = Mail(
                    from_email="gauthamkrishnav@icloud.com",
                    to_emails=data.get("email")
                )
                message.template_id = "d-e57dd5ac3b2b423994c161d316b3dc0f"
                link: str = generate_email_verification_link(data.get("email"))
                message.dynamic_template_data = {
                    "name": data.get("name"),
                    "url": link
                }
                sendgrid.send(message)
            except Exception:
                raise Exception()
            create_user(
                display_name=data.get("name"),
                email=data.get("email"),
                email_verified=False,
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
        except Exception:
            return jsonify({"Response": "Something Went Wrong"})

# Consumer Side Routes : Account Login
@application.route("/account/login", methods = ["GET", "POST"])
def initiateLoginProcess():
    if request.method == "GET":
        return render_template("LoginPage.html")
    else:
        try:
            data: dict = request.json
            if ("\'" in data.get("password")) or ("\"" in data.get("password")):
                return jsonify({"Response": "Invalid Password"})
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
            return jsonify({"Response": "Invalid Credentials"})
        except Exception:
            return jsonify({"Response": "Try Again Later"})
        
# Device UID API : POST
@application.route("/api/device", methods = ["POST"])
def generateNewUUIDForDevice():
    return jsonify({"Response": str(uuid4())})

# Consumer Side Routes : Dashboard Page
@application.route("/user/dashboard", methods = ["GET"])
@cache.cached(timeout=None)
def serveDashboardPage():
    return render_template("DashboardPage.html")

# Cards Data For CSR : API
@application.route("/api/cards", methods = ["POST"])
def cardsJSONDataServe():
    try:
        data: dict = request.json
        if not checkDeviceAuthorization(data.get("uid"), data.get("email")):
            return jsonify({"Response": "Unauthorized Device"})
        documents = db.collection("Cards").where(filter=FieldFilter("Owners", "array_contains", data.get("email"))).stream()
        cards = {}
        for doc in documents:
            cards[doc.id] = doc.to_dict()
        return jsonify({"Response": cards})
    except Exception:
        return jsonify({"Response": {}})

# Consumer Routes : Account Management Page
@application.route("/user/manage", methods = ["GET", "POST"])
def serveAccountManagementPage():
    if (request.method == "GET"):
        return render_template("ManageAccount.html")
    else:
        try:
            if not (checkDeviceAuthorization(request.json.get("uid"), request.json.get("email"))):
                return jsonify({"Response": "Unauthorized Device"})
            data: dict = request.json
            user: UserRecord = get_user_by_email(data.get("email"))
            devices = db.collection("Devices").where(filter=FieldFilter("`User Email`", "==", data.get("email"))).stream()
            cards = db.collection("Cards").where(filter=FieldFilter("Owners", "array_contains", data.get("email"))).stream()
            nodes = db.collection("Nodes").where(filter=FieldFilter("`User Email`", "==", data.get("email"))).stream()
            devLen: int = 0
            nodesLen: int = 0
            cardsLen: int = 0
            vendors = set()
            for _ in devices:
                devLen += 1
            for card in cards:
                cardsLen += 1
                vendor: str = card.get("Vendor")
                if vendor not in vendors:
                    vendors.add(vendor)
            for _ in nodes:
                nodesLen += 1
            return jsonify({"Response": {
                "Name": user.display_name,
                "Cards": cardsLen,
                "Devices": devLen,
                "Vendors": len(vendors),
                "Nodes": nodesLen
            }})
        except Exception:
            return jsonify({"Response": "Error"})

# Consumer APIs : Logout
@application.route("/api/logout", methods = ["POST"])
def logOutUserBinary():
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

# Consumer Routes : Share Card
@application.route("/cards/share", methods = ["GET", "POST"])
def shareCardUIAndEndpoint():
    if request.method == "GET":
        return render_template("ShareCard.html")
    else:
        try:
            get_user_by_email(request.json.get("party"))
            if not (checkDeviceAuthorization(request.json.get("uid"), request.json.get("email"))):
                return jsonify({"Response": "Unauthorized Device"})
            docRef = db.collection("Cards").document(request.json.get("card"))
            if (docRef.get().exists):
                flags: dict = docRef.get().to_dict().get("Flags")
                if (docRef.get().to_dict().get("Main Owner") != request.json.get("email")):
                    return jsonify({"Response": "Sharing Not Permitted"})
                elif (flags.get("Encrypt")):
                    return jsonify({"Response": "Card Cannot Be Shared"})
                else:
                    docRef.update({
                        "Owners": firestore.ArrayUnion([request.json.get("party")])
                    })
            else:
                return jsonify({"Response": "Card Not Enrolled"})
            return jsonify({"Response": "Added"})
        except UserNotFoundError:
            return jsonify({"Response": "User Not Found"})
        except Exception:
            return jsonify({"Response": "Card Share Failed"})

# 404 Error Handler
@cache.cached(timeout=None)
@application.errorhandler(404)
def serve404ErrorPage(_):
    return render_template("PageNotFound.html")

# Nodes Manager Page
@application.route("/user/nodes", methods = ["GET", "POST"])
def serveNodesManagerPage():
    if request.method == "GET":
        return render_template("NodesPage.html")
    else:
        try:
            data: dict = request.json
            if not (checkDeviceAuthorization(data.get("uid"), data.get("email"))):
                return jsonify({"Response": "Unauthorized Device"})
            returnData: dict = dict()
            dataFetched = db.collection("Nodes").where(filter=FieldFilter(
                field_path="`User Email`",
                op_string="==",
                value=data.get("email")
            )).where(filter=FieldFilter(
                field_path="Activated",
                op_string="==",
                value=True
            )).stream()
            for document in dataFetched:
                returnData[document.id] = document.to_dict()
            return jsonify({"Response": returnData})
        except Exception:
            return jsonify({"Response": "Error"})

# Delete Cards API
@application.route("/api/cards/delete", methods = ["POST"])
def deleteCards():
    try:
        data: dict = request.json
        if not checkDeviceAuthorization(data.get("uid"), data.get("email")):
            return jsonify({"Response": "Unauthorized Device"})
        reference = db.collection("Cards").document(data.get("card"))
        if (reference.get().to_dict().get("Main Owner") == data.get("email")):
            reference.delete()
        else:
            reference.update({
                "Owners": firestore.ArrayRemove([data.get("email")])
            })
        return jsonify({"Response": "Card Deleted"})
    except Exception:
        return jsonify({"Response": "Something Went Wrong"})

# Nodes Activation Page
@application.route("/user/nodes/new", methods = ["GET", "POST"])
def handleNodeEnrollment():
    if (request.method == "GET"):
        return render_template("EnrollNode.html")
    else:
        try:
            data: dict = request.json
            if not checkDeviceAuthorization(data.get("uid"), data.get("email")):
                return jsonify({"Response": "Unauthorized Device"})
            nodes = db.collection("Nodes").where(filter=FieldFilter(
                field_path="`User Email`", op_string="==", value=data.get("email")
            )).where(filter=FieldFilter(
                field_path="Activated", op_string="==", value=False
            )).where(filter=FieldFilter(
                field_path="`Activation Code`", op_string="==", value=data.get("code")
            )).limit(1).stream()
            NodeToActivate: str | None = None
            for node in nodes:
                NodeToActivate = node.id
            if NodeToActivate is None:
                return jsonify({"Response": "Invalid Node"})
            db.collection("Nodes").document(NodeToActivate).update({"Activated": True})
            return jsonify({"Response": "Node Activated"})
        except Exception:
            return jsonify({"Response": "Something Went Wrong"})
        
# Node Deletion Route
@application.route("/user/nodes/remove", methods = ['POST'])
def deleteExistingNodeBinary():
    try:
        data: dict = request.json
        if not checkDeviceAuthorization(data.get("uid"), data.get("email")):
            raise Exception
        db.collection("Nodes").document(data.get("node")).delete()
        return jsonify({"Response": "S"})
    except Exception:
        return jsonify({"Response": "F"})

# Nodes Rename Page Serving
@application.route("/user/nodes/rename", methods = ["GET", "POST"])
def serveNodeRenamingPage():
    if (request.method == "GET"):
        return render_template("RenameNode.html")
    else:
        try:
            data: dict = request.json
            if not checkDeviceAuthorization(data.get("uid"), data.get("email")):
                return jsonify({"Response": "Unauthorized Device"})
            reference = db.collection("Nodes").document(data.get("node"))
            reference.update({"`Common Name`": data.get("common")})
            return jsonify({"Response": "Renamed Successfully"})
        except Exception:
            return jsonify({"Response": "Something Went Wrong"})

# System Wide CPU Usage
@application.route("/api/cpu", methods = ["POST"])
def returnSystemWideCPUUsage():
    return jsonify({
        "Response": {
            "CPU Usage": int(cpu_percent(
                interval=0.5,
                percpu=False
            )),
            "Cores Usage": [(int(x)) for x in cpu_percent(interval=0.5, percpu=True)]
        }
    })

# Revoke Cards Function
@application.route("/cards/revoke", methods = ["POST"])
def revokeCardSharing():
    try:
        data: dict = request.json
        if not checkDeviceAuthorization(data.get("uid"), data.get("email")):
            return jsonify({"Response": "Unauthorized Device"})
        reference = db.collection("Cards").document(data.get("card"))
        reference_get = reference.get()
        if (reference_get.exists):
            if data.get("party") not in reference_get.to_dict().get("Owners"):
                return jsonify({"Response": "Card Not Shared Yet"})
            reference.update({
                "Owners": firestore.ArrayRemove([data.get("party")])
            })
            return jsonify({"Response": "Revoked"})
        else:
            raise Exception()
    except Exception:
        return jsonify({"Response": "Something Went Wrong"})