# Dependencies Import
from flask import Flask
from flask import jsonify
from flask import request
from flask import render_template as Serve
from Simple import Device
from Simple import Firebase
from Simple import PyrebaseSDK

# Definitions For Server
STATIC: str = "../"
TEMPLATES: str = "../HTML"

# Setting Up The Server
website: Flask = Flask(__name__)
website.template_folder = TEMPLATES
website.static_folder = STATIC

# User Interface Serving Routes
@website.route("/")
def serveWebsiteRoot():
    return Serve("AcceptCookies.html")

@website.route("/home")
def serveHomePage():
    return Serve("HomePage.html")

@website.route("/about")
def serveAboutPage():
    return Serve("AboutPage.html")

@website.route("/profile")
def serveConsole():
    return Serve("BlankConsole.html", userProfilePicture="https://picsum.photos/46",name="Gautham")

@website.route("/signup")
def serveSignupPage(value = ""):
    return Serve("CreateAccount.html", notification = value)

@website.route("/login")
def serveLoginPage(note: str = ""):
    return Serve("LoginPage.html", notification = note)

@website.route("/dashboard")
def serveDashboard():
    return Serve("ConsolePage.html", userProfilePicture="https://picsum.photos/46",name="Gautham")

# API Interfacing Routes
@website.route("/api/getNewUID")
def responseUID():
    return jsonify({"UID" : Device.createUID()})

@website.route("/createAccount", methods = {"POST"})
def createNewAccount():
    R = Firebase.createNewUserAccount (
        fullName = request.form.get("name"),
        eMail = request.form.get("email"),
        phoneNumber = request.form.get("phone"),
        password = request.form.get("password")
    )
    return serveSignupPage(R["response"])

@website.route("/loginToAccount", methods = {"POST"})
def loginToAccount():
    R = PyrebaseSDK.loginUserWithEmailAndPassword(
        email = str(request.form.get("email")),
        password = str(request.form.get("password"))
    )
    return serveLoginPage(R["response"])

@website.route("/api/completeRegister", methods = {"POST"})
def registerClient():
    Firebase.registerDevice(
        uid = request.json.get("UID"),
        user = request.json.get("Email")
    )
    return jsonify({"Response": 200})

# Error / Exception Handling Routes
@website.errorhandler(404)
def handle404Error(_):
    return Serve("Error404.html")

# Final Script Execution
if __name__ == "__main__":
    website.run(debug=True, port=1920)