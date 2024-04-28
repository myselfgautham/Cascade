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

# Execution Of Flask Application
if __name__ == "__main__":
    application.run(debug=True,port=1920)