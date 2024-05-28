from flask import Flask
from Components import BasicUI
from socket import (
    gethostname,
    gethostbyname
)

application = Flask(__name__)
application.static_folder = "../Client/"
application.template_folder = "../Client/Templates/"
application.register_blueprint(BasicUI.BasicUI)

if (__name__ == "__main__"):
    application.run(
        port=1920,
        debug=True,
        threaded = True,
        host=gethostbyname(gethostname())
    )