# Script Imports
from flask import Flask
from flask import render_template as Serve
from Simple.Definitions import CORS
from Simple.Definitions import Server
from Simple.Definitions import server
from Simple.Definitions import getServerIPAddress
from Simple.Definitions import FlaskCache

# Flask Definitions
app = Flask(__name__)
app.static_folder = "../Client/"
app.template_folder = "../Client/HTML/"

# Server Metadata Implementation
serverMetaData = Server(
    NAME = server["Server Name"],
    DEBUG = server["Debug Mode"],
    PORT = server["Port"],
    IP = getServerIPAddress()
)

# Caching Implementation
cacheConfiguration: dict = {
    'CACHE_TYPE': server["Cache Configuration"]["Cache Type"],
    'CACHE_DEFAULT_TIMEOUT': server["Cache Configuration"]["Default Timeout"]
}
cache = FlaskCache(
    APPLICATION = app,
    CONFIGURATION = cacheConfiguration
).implementCacheBuffer()
routesCache: dict = server["Cache Configuration"]["Cache Metadata"]

# Home Page Serving
@app.route("/")
@cache.cached(timeout=routesCache["Root"])
def serveHomePage():
    return Serve("HomePage.html")

# Cookies Policy Page Serving
@app.route("/policy")
@cache.cached(timeout=routesCache["Policy"])
def servePoliciesPage():
    return Serve("AcceptCookies.html")

# Flask Server Error Handlers
class FlaskErrorHandlers(object):
    @app.errorhandler(404)
    @cache.cached(timeout=routesCache["Exceptions"])
    def handle404HTTPError(_):
        return Serve("PageNotFound.html")
    
    @app.errorhandler(405)
    @cache.cached(timeout=routesCache["Exceptions"])
    def handle405HTTPError(_):
        return Serve("MethodNotAllowed.html")

# UI / UX Serving Routes
class UIUXRoutes(object):
    # About Page
    @app.route("/about")
    @cache.cached(timeout=routesCache["About"])
    def serveAboutPage():
        return Serve("AboutPage.html")

# Run Server
if (__name__ == "__main__"):
    app.run(
        host = serverMetaData.IP,
        debug = serverMetaData.DEBUG,
        port = serverMetaData.PORT,
        threaded = True
    )