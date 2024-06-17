from flask import (
    Flask,
    render_template as Serve,
    request
)
from flask_caching import Cache
from flask_compress import Compress

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