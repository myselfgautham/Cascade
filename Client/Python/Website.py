# Dependencies Import
from flask import Flask
from flask import render_template as Serve
from flask import jsonify
from flask import request
from Simple import Device

# Flask Application Definitions
STATIC: str = "../"
TEMPLATES: str = "../HTML"

# Environment Definitions
ENVIRONMENT: dict[str] = dict()

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
    print(ENVIRONMENT.get("STATE"))
    return Serve("ConsolePage.html",userProfilePicture="https://picsum.photos/46")

# UID Generator
@application.route("/api/getUID", methods=['GET'])
def apiToGetUID():
    responseDictionary = {"uid": Device.createUID()}
    return jsonify(responseDictionary)

# Get Cookies Data
@application.route('/api/cookiesBuffer', methods=['POST'])
def browserCookiesGET():
    data: dict[str] = request.json
    print("\nReceived data:", data, "\n")
    ENVIRONMENT["ID"] = data.get("uid")
    ENVIRONMENT["STATE"] = data.get("userStatus")
    response_data = {'status': 200}
    return jsonify(response_data)

# Execution Of Flask Application
if __name__ == "__main__":
    application.run(debug=True,port=1920)