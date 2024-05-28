from flask import Blueprint
from flask import render_template as Serve

BasicUI = Blueprint("Basics", __name__)

@BasicUI.route("/")
def serveHomePage():
    return Serve("HomePage.jinja")

@BasicUI.route("/account/login")
def serveLoginPage():
    return Serve("LoginPage.jinja")

@BasicUI.route("/account/create")
def serveSignUpPage():
    return Serve("CreateAccount.jinja")

@BasicUI.route("/verify/email")
def serveEmailVerificationPage():
    return Serve("EmailOTPVerification.jinja")