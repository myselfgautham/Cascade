from flask import (
    Flask,
    render_template
)
from flask_caching import Cache
from socket import (
    gethostbyname,
    gethostname
)

application = Flask(__name__)
application.static_folder = "../Content/"
application.template_folder = "../Templates/"
cache = Cache(
    application,
    config={
        "CACHE_TYPE": "simple",
        "CACHE_DEFAULT_TIMEOUT": 300
    }
)

@cache.cached(timeout=None)
@application.route("/", methods = ["GET"])
def serveEnterpriseHomePage():
    return render_template("EnterpriseHome.html")

if (__name__ == "__main__"):
    application.run(
        host=str(gethostbyname(gethostname())),
        port=3000,
        debug=True
    )