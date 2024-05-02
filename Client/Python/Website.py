# Dependencies Import
from flask import Flask
from flask import jsonify
from flask import request
from flask import render_template as Serve
from Simple import Device

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
def serveSignupPage():
    return Serve("CreateAccount.html")

# API Interfacing Routes
@website.route("/api/getNewUID")
def responseUID():
    return jsonify({"UID" : Device.createUID()})

@website.route("/api/createAccount", methods = ["POST"])
def createNewAccount():
    data = request.json()
    print(data)
    return jsonify({"Test": 200})

# Error / Exception Handling Routes
@website.errorhandler(404)
def handle404Error(_):
    return Serve("Error404.html")

# Final Script Execution
if __name__ == "__main__":
    website.run(debug=True, port=1920)