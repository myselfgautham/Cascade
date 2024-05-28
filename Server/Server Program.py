# Flask Import
from flask import Flask
from flask import render_template as Serve
from flask_compress import Compress

# Flask Caching System
from flask_caching import Cache

# Flask Definitions
application: Flask = Flask(__name__)
application.static_folder = "../Client/"
application.template_folder = "../Client/Templates/"
cache = Cache(application,config={
    "CACHE_TYPE": "simple",
    "DEFAULT_CACHE_TIMEOUT": 300
})
Compress(app=application)

class UIRoutes(object):
    def __init__(self) -> None:
        @application.route("/", methods = ["GET"])
        @cache.cached(timeout=None)
        def serveRenderedHomePage():
            return Serve("HomePage.html")

if (__name__ == "__main__"):
    UIRoutes()
    application.run()