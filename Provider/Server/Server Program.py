# Flask Packages Import
from flask import (
    Flask,
    render_template as Serve,
    request,
    jsonify,
    abort
)
from flask_caching import Cache
from flask_compress import Compress
from jinja2 import TemplatesNotFound

# Firebase Admin SDK Imports
from firebase_admin import initialize_app
from firebase_admin.credentials import Certificate
from firebase_admin import App
from firebase_admin.firestore import client as Firestore
from google.cloud.firestore import Client
from google.cloud.firestore_v1 import FieldFilter
from firebase_admin.auth import get_user_by_email
from firebase_admin.auth import UserNotFoundError

# Miscellaneous Imports
from hashlib import sha384
from uuid import uuid4

# Application Configuration
application: Flask = Flask(__name__)
application.static_folder = "../Website/"
application.template_folder = "../Website/Jinja/"
Compress(application)
cache: Cache = Cache(
    app=application,
    config={
        "CACHE_TYPE": "simple",
        "CACHE_DEFAULT_TIMEOUT": 300
    }
)

# Firebase Configuration
credentials: Certificate = Certificate("../../Certificates/Firebase.json")
firebase: App = initialize_app(credential=credentials)
database: Client = Firestore(app=firebase)

# User Password Hash Function
def hashUserPassword(password: str) -> str:
    password = password.encode()
    hashed = sha384(password)
    return hashed.hexdigest()

# Enterprise Home Page
@application.route("/", methods = ["GET"])
@cache.cached(timeout=None)
def serveEnterpriseHomePage():
    try:
        return Serve("HomePage.jinja2")
    except TemplatesNotFound:
        abort(404)

# Enterprise Registration Route
@application.route("/account/register", methods = ["GET", "POST"])
def serveEnterpriseRegistrationPage():
    if (request.method == "GET"):
        return Serve("RegisterBusiness.jinja2")
    else:
        try:
            data: dict = request.json
            if (len(data.get("password")) < 8):
                return jsonify({"Response": "Choose A Stronger Password"})
            counter: int = 0
            for _ in (
                database.collection("Enterprises").where(filter=FieldFilter(
                    field_path="`Email Address`",
                    op_string="==",
                    value=data.get('email')
                )).stream()
            ):
                counter += 1
            if (counter != 0):
                return jsonify({"Response": "Email Already Exists"})
            for _ in (
                database.collection("Enterprises").where(
                    filter=FieldFilter(
                        field_path="`Phone Number`",
                        op_string="==",
                        value=data.get("phone")
                    )
                ).stream()
            ):
                counter += 1
            if (counter != 0):
                return jsonify({"Response": "Phone Number Already Exists"})
            database.collection("Enterprises").document(uuid4().hex).set({
                "Business Name": data.get("business"),
                "Business Owner": data.get("owner"),
                "Email Address": data.get("email"),
                "Phone Number": data.get("phone"),
                "Password Hash": hashUserPassword(password=data.get("password")),
                "Verified": False
            })
            return jsonify({"Response": "Account Created"})
        except Exception:
            return jsonify({"Response": "Something Went Wrong"})

# Enterprise Login Route
@application.route("/account/login", methods = ["GET", "POST"])
def serveEnterpriseLoginPage():
    if (request.method == "GET"):
        return Serve("BusinessLogin.jinja2")
    else:
        try:
            data: dict = request.json
            document: dict | None = None
            for documents in (
                database.collection("Enterprises").where(filter=FieldFilter(
                    field_path="`Email Address`",
                    op_string="==",
                    value=data.get("email")
                )).stream()
            ):
                if (document is None):
                    document = documents.to_dict()
                else:
                    continue
            if document is None:
                return jsonify({"Response": "Account Doesn't Exist"})
            elif document["Verified"] is False:
                return jsonify({"Response": "Account Not Verified"})
            return jsonify({"Response": (hashUserPassword(data.get("password")) == document["Password Hash"])})
        except Exception:
            return jsonify({"Response": "Something Went Wrong"})

# Dashboard Page
@application.route("/dashboard", methods = ["GET", "POST"])
def serveEnterpriseDashboardPage():
    if (request.method == "GET"):
        return Serve("DashboardPage.jinja2")

# Issue New Card API
@application.route("/cards/new", methods = ["GET", "POST"])
def issueNewCardInterface():
    if (request.method == "GET"):
        return Serve("IssueNewCard.jinja2")
    else:
        try:
            data: dict = request.json
            get_user_by_email(
                email=data.get("owner"),
                app=firebase
            )
            format: dict = {
                "Flags": data.get("flags"),
                "From": data.get("from"),
                "Till": data.get("till"),
                "Owners": [data.get("owner")],
                "Main Owner": data.get("owner"),
                "Number": data.get("cardNumber")
            }
            if (data.get("flags")["CVV"]):
                format["CVV"] = data.get("cvv")
            vendorName: str = database.collection("Enterprises").where(filter=FieldFilter(
                field_path="`Email Address`",
                op_string="==",
                value=data.get("vendor")
            )).get()[0].to_dict().get("Business Name")
            format["Vendor"] = vendorName.title()
            database.collection("Cards").document(uuid4().hex).set(format)
            return jsonify({"Response": "Card Created Successfully"})
        except UserNotFoundError:
            return jsonify({"Response": "User Does Not Exist"})
        except Exception:
            return jsonify({"Response": "Something Went Wrong"})

# Business Analytics Route
@application.route("/analytics", methods = ["GET", "POST"])
def serveAnalyticsPageEnterprise():
    pass