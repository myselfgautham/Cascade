from flask import (
    Flask,
    render_template as Serve
)
from flask_caching import Cache
from flask_compress import Compress

# Application Configuration
application: Flask = Flask(__name__)
application.static_folder = "../Content/"
application.template_folder = "../Content/HTML/"
Compress(application)
cache: Cache = Cache(
    app=application,
    config={
        "CACHE_TYPE": "simple",
        "CACHE_DEFAULT_TIMEOUT": 300
    }
)

# Enterprise Home Page
@application.route("/", methods = ["GET"])
@cache.cached(timeout=None)
def serveEnterpriseHomePage():
    return Serve("EnterpriseHome.html")