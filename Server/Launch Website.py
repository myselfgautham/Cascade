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
from Firebase import registerDevice
from Firebase import getUserRealName
from Firebase import getVerificationStatus
from Firebase import deleteDocument
from UserCards import createNewCard
from UserCards import deleteCard
from Firebase import getSignedInDevices
from Firebase import sendEmailOTP
from Firebase import checkDeviceExistence
from UserCards import getLinkedCards

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
    "fallbacks": 120,
    "about" : 86400
}

# Website Root Serving ( Home Page )
@app.route("/")
@cache.cached(timeout=routesCache["root"])
def serveHomePage():
    return Serve("HomePage.html")

# Cookies Enforcement Route
@app.route("/policy")
@cache.cached(timeout=routesCache["policy"])
def serveCookiesPolicy():
    return Serve("AcceptCookies.html")

# Console Fallback Page
@app.route("/profile")
@cache.cached(timeout=routesCache["fallbacks"])
def serveConsoleFallbackPage():
    return Serve("ConsoleFallbackPage.html")

# Serve Account Creation Page
@app.route("/account")
def serveAccountCreationPage(key = ""):
    return Serve("CreateAccountPage.html",notification = key)

# Login Page Serving Route
@app.route("/login")
def serveLoginPage(note: str = ""):
    return Serve("LoginPage.html",notification = note)

# UID Generate API
@app.route("/api/uid")
def serveNewUID():
    return jsonify({"UID": createUID()})

# Phone Verification Route
@app.route("/verify/phone")
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

# Method Not Allowed Error Handling
@app.errorhandler(405)
@cache.cached(timeout=routesCache["404"])
def except405Error(_):
    return Serve("MethodNotAllowed.html")

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

# Complete Device Registration
@app.route("/api/complete", methods = ["POST"])
def completeDeviceRegistration():
    try:
        data: dict = request.json
        response: bool = registerDevice(
            uid= data.get("UID"),
            user= data.get("Email")
        )
        return jsonify({"Response": "True"}) if response else jsonify({"Response": "False"})
    except Exception:
        return jsonify({"Response": "False"})

# Console Page Serving
@app.route("/dashboard")
def serveConsolePage():
    return Serve("ConsolePage.html")

# About Page Serving
@app.route("/about")
@cache.cached(timeout=routesCache["about"])
def serveAboutPage():
    return Serve("AboutPage.html")

# User Data Route
@app.route("/api/user", methods = ["POST"])
def serveUserInformation():
    data: dict = request.json
    try:
        email = data.get("Email")
        user: dict = {
            "Name": getUserRealName(email),
            "Phone": getPhoneNumber(getUserUIDFromEMail(email)),
            "UID": getUserUIDFromEMail(email),
            "Verified": getVerificationStatus(email),
            "Devices": getSignedInDevices(email)
        }
        return jsonify(user)
    except Exception:
        return jsonify({"Response": "None"})

# Account Page
@app.route("/manage")
def serveAccountPage():
    return Serve("AccountPage.html")

# Sign Out System
@app.route("/api/logout", methods = ["POST"])
def logoutCurrentUser():
    try:
        uid = request.json.get("UID")
        deleteDocument("Devices", uid)
        return jsonify({"Response": "True"})
    except Exception:
        return jsonify({"Response": "False"})

# Email Verification
@app.route("/verify/email")
def verifyEmailOTP():
    return Serve("EmailVerification.html")

# Email OTP Buffer
EMAILOTP = {}

# Email Verification API
@app.route("/api/generate-email", methods = ["POST"])
def verifyOTP():
    data = request.json.get("Email")
    if data not in EMAILOTP:
        otp = randint(10000,99999)
        EMAILOTP[data] = otp
        if (sendEmailOTP(data, otp)):
            return jsonify({"Response": True})
        else:
            return jsonify({"Response": False})
    else:
        return jsonify({"Response": False})

# Verify Email OTP API
@app.route("/api/verify-email", methods = ["POST"])
def verifyEmailLoginOTP():
    data: dict = request.json
    email = data.get("Email")
    inputOTP = int(data.get("OTP"))
    if email in EMAILOTP:
        if (EMAILOTP[email] == inputOTP):
            del EMAILOTP[email]
            return jsonify({"Response": True})
        else:
            return jsonify({"Response": False})
    else:
        del EMAILOTP[email]
        return jsonify({"Response": False})

# Cards Management UI
@app.route("/cards")
def serveCardsPage():
    return Serve("CardsManagement.html")

# Cards Fetching API
@app.route("/api/cards", methods = ["POST"])
def fetchAllCards():
    email: str = request.json.get("Email")
    cards: list = getLinkedCards(user=getUserUIDFromEMail(email))
    return jsonify({"Result": cards})

# New Cards Form Route
@app.route("/cards/new")
def serveCreateNewCardPage():
    return Serve("AddCard.html")

# New Card API
@app.route("/api/newCard", methods = ["POST"])
def newCardCreateAPI():
    try:
        data: dict = {
            "Number": request.form.get("number"),
            "From": request.form.get("from"),
            "Till": request.form.get("till"),
            "Flags": {
                "Encrypted": request.form.get("encrypt"),
                "Verified": request.form.get("verify"),
                "CVV": request.form.get("cvv")
            },
            "User": request.form.get("user")
        }
        for key in data["Flags"].keys():
            if data["Flags"][key] == "on":
                data["Flags"][key] = True
            else:
                data["Flags"][key] = False
        createNewCard({
            "Card Number": data["Number"],
            "Valid From": data["From"],
            "Valid Till": data["Till"],
            "Card Flags": data["Flags"],
            "Card Owners": [
                getUserUIDFromEMail(data["User"])
            ]
        })
        return jsonify({"Response": 200})
    except Exception:
        return jsonify({"Response": 101})

# Verify Device Existence
@app.route("/api/verify/device", methods = ["POST"])
def verifyDeviceExists():
    uid: str = request.json.get("UID")
    return jsonify({"Existence": checkDeviceExistence(uid)})

# Card Deletion Route
@app.route("/api/deleteCard", methods = ["POST"])
def deleteCardRoute():
    uid: str = request.json.get("CUID")
    if (deleteCard(uid)):
        return jsonify({"Response": "Delete Successful"})
    else:
        return jsonify({"Response": "Delete Failed"})

# Run Server Script
if (__name__ == "__main__"):
    app.run (
        debug = SERVER.DEBUG,
        port = SERVER.PORT,
        host=SERVER.IP,
        threaded=True
    )