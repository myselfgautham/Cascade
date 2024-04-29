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

# Handle 404 Error
@application.errorhandler(404)
def handle404Error(Error):
    print(f"\nServer Error => {Error}\n")
    return Serve("Error404.html")

# Website Console Page
@application.route("/user")
def serveConsolePage():
    return Serve("ConsolePage.html")

# Execution Of Flask Application
if __name__ == "__main__":
    application.run(debug=True,port=1920)