# Modules Import
from psutil import cpu_percent
from flask import Flask
from flask import request
from flask import render_template as Serve
from Device import createUID
from flask import jsonify
from Device import getServerIPAddress
from PyrebaseSDK import loginUserWithEmailAndPassword
from Firebase import createNewUserAccount
from flask_cors import CORS
from random import randint
from Twilio import sendOTPMessage
from Firebase import getPhoneNumber
from Firebase import getUserUIDFromEMail
from flask_caching import Cache

# Server Metadata Class
class Server():
    """
    A Class For The Flask Website Server
    With Support For CPU Usage Monitoring
    And Multiple Servers Using Ports
    Usage : Server(DEBUG: bool, PORT: int)
    Route : host:PORT/route
    Prefix Determined By JavaScript At Runtime
    On The Basis Of CPU Usage
    """
    def __init__(self, NAME: str, DEBUG: bool, PORT: int, IP: str) -> None:
        self.NAME = NAME
        self.DEBUG = DEBUG
        self.PORT = PORT
        self.IP = IP
        
    @property
    def cpuUsage(self) -> int:
        return int(cpu_percent())
    
# IPv4 Address Class
class IPv4(object):
    def __init__(self,protocol: str, host: str, port:int) -> None:
        self.protocol = protocol
        self.host = host
        self.port = port
        return None
    @property
    def address(self):
        return f"{self.protocol}://{self.host}:{self.port}"

# Server Object Definition
SERVER: Server = Server (
    NAME = "Main Server",
    DEBUG = True,
    PORT = 1920,
    IP=getServerIPAddress()
)

# Cache Configuration
cacheConfiguration: dict = {
    'CACHE_TYPE': 'simple',
    'CACHE_DEFAULT_TIMEOUT': 300
}

# Flask Configuration
app: Flask = Flask(__name__)
app.template_folder = "../Client/HTML/"
app.static_folder = "../Client"
ORIGINS = [
    IPv4("http",getServerIPAddress(),SERVER.PORT).address,
    IPv4("http","127.0.0.1",5500).address
]
CORS(app, origins=ORIGINS)

# Flask Cache Initialization
cache = Cache(app=app, config=cacheConfiguration)
cache.init_app(app=app)

# Routes Cache Configuration
routesCache = {
    "root": None,
    "policy": 3600,
    "404": 86400,
    "accounts": 300,
    "fallbacks": 120
}

# Website Root Serving ( Home Page )
@app.route("/")
@cache.cached(timeout=routesCache["root"])
def serveHomePage():
    return Serve("BasePage.html")

# Cookies Enforcement Route
@app.route("/policy")
@cache.cached(timeout=routesCache["policy"])
def serveCookiesPolicy():
    return Serve("AcceptCookies.html")

# Console Home Page Serving
@app.route("/dashboard")
def serveDashboardPage():
    return Serve("ConsoleHomePage.html")

# Console Fallback Page
@app.route("/profile")
@cache.cached(timeout=routesCache["fallbacks"])
def serveConsoleFallbackPage():
    return Serve("ConsoleFallbackPage.html")

# Serve Account Creation Page
@app.route("/account")
@cache.cached(timeout=routesCache["accounts"])
def serveAccountCreationPage(key = ""):
    return Serve("CreateAccountPage.html",notification = key)

# Login Page Serving Route
@app.route("/login")
@cache.cached(timeout=routesCache["accounts"])
def serveLoginPage(note: str = ""):
    return Serve("LoginPage.html",notification = note)

# UID Generate API
@app.route("/api/uid")
def serveNewUID():
    return jsonify({"UID": createUID()})

# Phone Verification Route
@app.route("/verify")
def serveVerificationPage():
    return Serve("PhoneVerification.html")

# Account Creation Route
@app.route("/createAccount", methods = ["POST"])
def createNewSimpleAccount():
    response: dict[str] = createNewUserAccount (
        fullName = request.form.get("name"),
        eMail = request.form.get("email"),
        phoneNumber = request.form.get("phone"),
        password = request.form.get("password")
    )
    return serveAccountCreationPage(key = response["response"])

# Website Login Route
@app.route("/loginToAccount", methods = ["POST"])
def loginToAccount():
    response: dict = loginUserWithEmailAndPassword(
        email = request.form.get("email"),
        password = request.form.get("password")
    )
    return serveLoginPage(note = response["response"])

# 404 Error Handling
@app.errorhandler(404)
@cache.cached(timeout=routesCache["404"])
def except404Error(_):
    return Serve("PageNotFound.html")

# Server CPU Usage
@app.route("/api/usage", methods = ["POST"])
def serverCPUUsage():
    return jsonify({"Usage" : SERVER.cpuUsage})

# User Phone Fetching
@app.route("/api/phone", methods = ["POST"])
def getUserPhoneNumber():
    email = request.json.get("Email")
    phone = getPhoneNumber(getUserUIDFromEMail(email))
    if email not in OTP:
        otp:int = randint(100000,999999)
        OTP[email] = str(otp)
        sendOTPMessage(phone,otp)
    return jsonify({"Phone" : phone})

# OTP Data Buffer
OTP: dict = {}

# OTP Verification Route
@app.route("/api/verify-otp", methods = ["POST"])
def validateOTP():
    try:
        data = request.json
        email = data.get("Email")
        if OTP[email] == data.get("OTP"):
            del OTP[email]
            return jsonify({"State": "true"})
        else:
            return jsonify({"State": "false"})
    except Exception:
        return jsonify({"State": "verified"})

# Run Server Script
if (__name__ == "__main__"):
    app.run (
        debug = SERVER.DEBUG,
        port = SERVER.PORT,
        host=SERVER.IP,
        threaded=True
    )