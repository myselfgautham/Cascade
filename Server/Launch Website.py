# Modules Import
from psutil import cpu_percent
from flask import Flask
from flask import request
from flask import render_template as Serve
from Device import createUID
from flask import jsonify
from PyrebaseSDK import loginUserWithEmailAndPassword
from Firebase import createNewUserAccount

# Server Metadata Class
class Server():
    """
    A Class For The Flask Website Server
    With Support For CPU Usage Monitoring
    And Multiple Servers Using A Server Prefix
    Usage : Server(DEBUG: bool, PORT: int, PREFIX: str)
    Route : host/prefix/route
    Prefix Determined By JavaScript At Runtime
    On The Basis Of CPU Usage
    """
    def __init__(self, NAME: str, DEBUG: bool, PORT: int, PREFIX: str) -> None:
        self.NAME = NAME
        self.DEBUG = DEBUG
        self.PORT = PORT
        self.PREFIX = PREFIX
        
    @property
    def cpuUsage(self) -> int:
        return int(cpu_percent())
    
# Server Object Definition
SERVER: Server = Server (
    NAME = "Main Server",
    DEBUG = True,
    PORT = 1920,
    PREFIX = "main"
)

# Flask Configuration
app: Flask = Flask(__name__)
app.template_folder = "../Client/HTML/"
app.static_folder = "../Client"

# Website Root Serving ( Home Page )
@app.route("/")
def serveHomePage():
    return Serve("BasePage.html")

# Cookies Enforcement Route
@app.route("/policy")
def serveCookiesPolicy():
    return Serve("AcceptCookies.html")

# Console Home Page Serving
@app.route("/dashboard")
def serveDashboardPage():
    return Serve("ConsoleHomePage.html")

# Console Fallback Page
@app.route("/profile")
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

# Run Server Script
if (__name__ == "__main__"):
    app.run (
        debug = SERVER.DEBUG,
        port = SERVER.PORT
    )