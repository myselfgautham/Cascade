# Dependencies Import
from flask import Flask
from flask import render_template as Serve
from flask import jsonify
from Simple import Device

# Flask Application Definitions
STATIC: str = "../"
TEMPLATES: str = "../HTML"

# Flask Application Setup
application = Flask(__name__)
application.template_folder = TEMPLATES
application.static_folder = STATIC

# Website Cookies Page
@application.route("/")
def acceptCookiesNotifier():
    return Serve("AcceptCookies.html")

# Website Home Page
@application.route("/home")
def serveHomePage():
    return Serve("IndexPage.html")

# Website About Page
@application.route("/about")
def serveAboutPage():
    return Serve("AboutPage.html")

# Handle 404 Error
@application.errorhandler(404)
def handle404Error(Error):
    print(f"\nServer Error => {Error}\n")
    return Serve("Error404.html")

# Website Console Page
@application.route("/user")
def serveConsolePage():
    return Serve("ConsolePage.html")

# UID Generator
@application.route("/api/getUID", methods=['GET'])
def apiToGetUID():
    responseDictionary = {"uid": Device.createUID()}
    return jsonify(responseDictionary)

# Execution Of Flask Application
if __name__ == "__main__":
    application.run(debug=True,port=1920)