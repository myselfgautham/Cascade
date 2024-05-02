# Dependencies Import
from flask import Flask
from flask import jsonify
from flask import request
from flask import render_template as Serve
from Simple import Device
from Simple import Firebase

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
    return Serve("ConsolePage.html", userProfilePicture="https://picsum.photos/46",name="Gautham")

@website.route("/signup")
def serveSignupPage(value = ""):
    return Serve("CreateAccount.html", notification = value)

# API Interfacing Routes
@website.route("/api/getNewUID")
def responseUID():
    return jsonify({"UID" : Device.createUID()})

@website.route("/createAccount", methods = {"POST"})
def createNewAccount():
    formData = getFormData("create")
    R = Firebase.createNewUserAccount (
        fullName = formData["name"],
        eMail = formData["email"],
        phoneNumber = formData["phone"],
        password = formData["password"]
    )
    return serveSignupPage(R["response"])

# Get Form Data From Website
def getFormData(state: str) -> dict[str]:
    data: dict = {}
    if (state == "create"):
        data['name'] = request.form.get("name")
        data['email'] = request.form.get("email")
        data['phone'] = request.form.get("phone")
        data['password'] = request.form.get("password")
        return data
    elif (state == "login"):
        data['email'] = request.form.get("email")
        data['password'] = request.form.get("password")
    else:
        return {"RETURN": "Invalid Input"}

# Error / Exception Handling Routes
@website.errorhandler(404)
def handle404Error(_):
    return Serve("Error404.html")

# Final Script Execution
if __name__ == "__main__":
    website.run(debug=True, port=1920)