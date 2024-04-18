# Imports
from flask import Flask
from flask import url_for
from flask import render_template as serveWebsite

# Environment Variables
STATIC: str = "../Global"
TEMPLATES: str = "../Pages"

# Application Defenition
website = Flask(__name__)

# Website Directories Setup
website.template_folder = TEMPLATES
website.static_folder = STATIC

# Website Root
@website.route("/")
def serveHomePage():
    return serveWebsite("Index.html")

# Launch Server
if __name__ == "__main__":
    website.run(debug=True)