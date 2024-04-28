# Dependencies Import
from flask import Flask
from flask import render_template as Serve

# Flask Application Definitions
STATIC: str = "../"
TEMPLATES: str = "../HTML"

# Flask Application Setup
application = Flask(__name__)
application.template_folder = TEMPLATES
application.static_folder = STATIC

# Website Home Page
@application.route("/")
def serveHomePage():
    return Serve("IndexPage.html")

# Website About Page
@application.route("/about")
def serveAboutPage():
    return Serve("AboutPage.html")

# Website Services Page
@application.route("/services")
def serveServicesPage():
    return Serve("ServicesPage.html")

# Website Documentation
@application.route("/help")
def serveDocumentations():
    return Serve("DocumentsPage.html")

# Website Contacts Page
@application.route("/contact")
def serveContactPage():
    return Serve("ContactsPage.html")

# Execution Of Flask Application
if __name__ == "__main__":
    application.run(debug=True,port=1920)