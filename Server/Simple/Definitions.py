# Modules Import
from psutil import cpu_percent
from flask import Flask
from flask_cors import CORS as POLICY
from flask_caching import Cache
from os.path import abspath
from json import load
from .Exceptions import (
    JSONConfigurationNotInitializedError,
    FlaskCacheBuildFailedError,
    StandardPathError,
    JSONConfigurationInitializationFailed,
    CORSException,
    FirebaseInitializationError,
    FailedToInitializeSendGrid
)
from firebase_admin.credentials import Certificate
from firebase_admin import App
from firebase_admin import initialize_app
from sendgrid import SendGridAPIClient
from socket import gethostname
from socket import gethostbyname

# Server Object For Simple Server
class Server(object):
    def __init__(self,  NAME: str, DEBUG: bool, PORT: int, IP: str) -> None:
        self.NAME = NAME
        self.DEBUG = DEBUG
        self.PORT = PORT
        self.IP = IP
    @property
    def cpuUsage() -> int:
        return int(cpu_percent(
            interval=1,
            percpu=False
        ))
    @property
    def serverName(self):
        return self.NAME
    
# IPv4 Address Class
class IPv4(object):
    def __init__(self, PROTOCOL: str, HOST: str, PORT: int) -> None:
        self.PROTOCOL = PROTOCOL
        self.HOST = HOST
        self.PORT = PORT
    @property
    def address(self):
        return (f"{self.PROTOCOL}://{self.HOST}:{self.PORT}")
    
# Cross Origin Resource Sharing
class CORS(object):
    def __init__(self, APPLICATION: Flask, ORIGINS: list[IPv4]) -> None:
        self.application = APPLICATION
        self.origins = ORIGINS
    def implementCORS(self) -> bool:
        try:
            derivedOrigins: list[str] = [(ipv4Address.address) for ipv4Address in self.origins]
            POLICY(
                app = self.application,
                origins = derivedOrigins
            )
            return True
        except Exception:
            raise CORSException
        
# Flask Cache System
class FlaskCache(object):
    def __init__(self, APPLICATION: Flask, CONFIGURATION: dict[str, str]) -> None:
        self.application = APPLICATION
        self.configuration = CONFIGURATION
    def implementCacheBuffer(self) -> Cache:
        try:
            cache = Cache(
                app = self.application,
                config = self.configuration
            )
            cache.init_app(
                app = self.application
            )
            return cache
        except Exception:
            raise FlaskCacheBuildFailedError()
        
# Standard Path Class
class Path(object):
    def __init__(self, PATH: str) -> None:
        self.path = PATH
    @property
    def absolute(self):
        try:
            return abspath(path = self.path)
        except Exception:
            raise StandardPathError()
        
# Server JSON Data
class JSON(object):
    def __init__(self, SERVER: Path, BACKEND: Path) -> None:
        self.serverFile = SERVER.absolute
        self.backendFile = BACKEND.absolute
        self.server: dict = {}
        self.backend: dict = {}
    def initialise(self):
        try:
            with open(self.serverFile) as serverConfiguration:
                self.server = load(serverConfiguration)
            with open(self.backendFile) as backendConfiguration:
                self.backend = load(backendConfiguration)
        except Exception:
            raise JSONConfigurationInitializationFailed()
    def transpose(self):
        if (self.backend == {}) or (self.server == {}):
            raise JSONConfigurationNotInitializedError()
        else:
            return (self.backend, self.server)
        
# Firebase Initializer Class
class FirebaseSDK(object):
    def __init__(self, Credentials: Certificate) -> None:
        self.certificate = Credentials
    def initialiseFirebase(self) -> App:
        try:
            return initialize_app(self.certificate)
        except Exception:
            raise FirebaseInitializationError
        
# JSON Data Definitions
JSONLinkedData: JSON = JSON(
    SERVER = Path("../../Configurations/Server.json"),
    BACKEND = Path("../../Configurations/SimpleServer.json")
)
JSONLinkedData.initialise()
backend, server = JSONLinkedData.transpose()

# SendGrid Class
class SendGrid(object):
    def __init__(self, KEY: str) -> None:
        self.key = KEY
    def initialise(self) -> SendGridAPIClient:
        try:
            sg = SendGridAPIClient(backend["Twilio SendGrid"]["Key"])
            return sg
        except Exception:
            raise FailedToInitializeSendGrid
        
# Get Assigned IP Address
def getServerIPAddress():
    hostname = gethostname()
    return gethostbyname(hostname)