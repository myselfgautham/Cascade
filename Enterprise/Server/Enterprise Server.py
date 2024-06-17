# Flask Packages Import
from flask import (
    Flask,
    render_template as Serve,
    request
)
from flask_caching import Cache
from flask_compress import Compress

# Firebase Admin SDK Imports
from firebase_admin import initialize_app
from firebase_admin.credentials import Certificate
from firebase_admin import App
from firebase_admin.firestore import client as Firestore
from google.cloud.firestore import Client

# Application Configuration
application: Flask = Flask(__name__)
application.static_folder = "../Content/"
application.template_folder = "../Content/HTML/"
Compress(application)
cache: Cache = Cache(
    app=application,
    config={
        "CACHE_TYPE": "simple",
        "CACHE_DEFAULT_TIMEOUT": 300
    }
)

# Firebase Admin Setup
credentials: Certificate = Certificate("../../Certificates/Firebase.json")
firebase: App = initialize_app(credential=credentials)
database: Client = Firestore(app=firebase)

# Enterprise Home Page
@application.route("/", methods = ["GET"])
@cache.cached(timeout=None)
def serveEnterpriseHomePage():
    return Serve("EnterpriseHome.html")

# Account Creation Page
@application.route("/account/register", methods = ["GET", "POST"])
def serveEnterpriseRegistrationPage():
    if (request.method == "GET"):
        return Serve("RegisterBusiness.html")

# Account Login Page
@application.route("/account/login", methods = ["GET", "POST"])
def serveEnterpriseLoginPage():
    if (request.method == "GET"):
        return Serve("BusinessLogin.html")