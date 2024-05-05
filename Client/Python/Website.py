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

# Cookies Accepting Website
@website.route("/")
def serveWebsiteRoot():
    return Serve("AcceptCookies.html")

# Website Homepage Route
@website.route("/home")
def serveHomePage():
    return Serve("HomePage.html")

# Website About Page
@website.route("/about")
def serveAboutPage():
    return Serve("AboutPage.html")

# Profile / Dashboard Page
@website.route("/dashboard")
def serveDashboard():
    return Serve("ConsolePage.html")

# Blank Console For Aesthetics
@website.route("/profile")
def serveBlankPage():
    return Serve("BlankConsole.html")

# Signup Page Serving
@website.route("/signup")
def serveSignupPage(value = ""):
    return Serve("CreateAccount.html", notification = value)

# Login Page Serving
@website.route("/login")
def serveLoginPage(note: str = ""):
    return Serve("LoginPage.html", notification = note)

# Account Page Serving
@website.route("/accountManage")
def serveAccountPage():
    return Serve("AccountPage.html")

# Account Fallback Page Serving
@website.route("/account")
def serveFallbackPageAccount():
    return Serve("AccountPageFallback.html")

# New UID Interface
@website.route("/api/getNewUID")
def responseUID():
    return jsonify({"UID" : Device.createUID()})

# Create Account Form
@website.route("/createAccount", methods = {"POST"})
def createNewAccount():
    R = Firebase.createNewUserAccount (
        fullName = request.form.get("name"),
        eMail = request.form.get("email"),
        phoneNumber = request.form.get("phone"),
        password = request.form.get("password")
    )
    return serveSignupPage(R["response"])

# Login Account Form
@website.route("/loginToAccount", methods = {"POST"})
def loginToAccount():
    R = PyrebaseSDK.loginUserWithEmailAndPassword(
        email = str(request.form.get("email")),
        password = str(request.form.get("password"))
    )
    return serveLoginPage(R["response"])

# Device Registration Completion
@website.route("/api/completeRegister", methods = {"POST"})
def registerClient():
    Firebase.registerDevice(
        uid = request.json.get("UID"),
        user = request.json.get("Email")
    )
    return jsonify({"Response": 200})

# Name For Console Page
@website.route("/api/username", methods = {"POST"})
def getUserName():
    name: str = request.json.get("Email")
    name = Firebase.getUserRealName(name)
    return jsonify({"Name": name})

# Fetch Server Side User Data
@website.route("/api/validate", methods = ["POST"])
def getValidationData():
    uid: str = request.json.get("UID")
    data = Firebase.readDocument("Devices",uid)
    if (data != {}):
        return jsonify(data)
    else:
        return {"Response": "Device Does Not Exist"}

# Delete Device Collection
@website.route("/api/signout", methods = ["POST"])
def signOutUser():
    uid: str = request.json.get("UID")
    status: bool = Firebase.deleteDocument("Devices",uid)
    return jsonify({"Response": "Success"}) if status else jsonify({"Response": "Failed"})

# Password Reset Route
@website.route("/api/reset", methods = ["POST"])
def resetPassword():
    try:
        email: str = request.json.get("Email")
        link = Firebase.resetPassword(email)
        return jsonify({"Link": link,"Response" : "Success"})
    except Exception:
        return jsonify({"Response" : "Failed"})

# 404 Error / Exception Handling
@website.errorhandler(404)
def handle404Error(_):
    return Serve("Error404.html")

# Final Script Execution
if __name__ == "__main__":
    website.run(debug=True, port=1920)