# Firebase Admin Python SDK Imports
from firebase_admin import initialize_app
from firebase_admin.credentials import Certificate
from firebase_admin import firestore

# Python UUID Generator Import
from uuid import uuid4

# Python Sockets Dependencies Imports
from socket import gethostbyname
from socket import gethostname

# JSON Module ( Server Metadata Editing ) Importing
import json

# Platform And System Modules
from platform import (
    system,
    release,
    version,
    python_version
)
from sys import argv
from os import environ

# Firebase Initialization With Firestore
credentials = Certificate(json.loads(environ.get("FIREBASE", None)))
firebase = initialize_app(credentials)
db = firestore.client(app=firebase)
print("\033[92mFirebase Initialized\033[0m", end="")

# Server Class For Code Organization
class Server(object):
    def __init__(self, NAME: str, PORT: int, HOST: str = "") -> None:
        self.name: str = NAME
        self.port: int = PORT
        self.host: str = str(gethostbyname(gethostname())) if not HOST else HOST
    def RegisterServer(self) -> bool:
        with open("../Certificates/Server.json", "r", encoding="utf-8") as file:
            jsonData = json.load(file)
        if "UID" not in jsonData:
            jsonData["UID"] = str(uuid4())
            with open("../Certificates/Server.json", "w") as file:
                json.dump(jsonData, file, ensure_ascii=False, indent=4)
            return False
        else:
            documentReference = db.collection("Servers").document(jsonData.get("UID"))
            if (documentReference.get().exists):
                try:
                    data: dict = {
                        "`Host Address`": self.host,
                        "`Server Identifier`": jsonData.get("UID"),
                        "`Server Name`": self.name,
                        "`Server Port`": self.port,
                        "`Server Location`": jsonData.get("Location"),
                        "`Server Program Version`": jsonData.get("Version"),
                        "`Network Address`": jsonData.get("Network Address"),
                        "`Server Type`": jsonData.get("Type"),
                        "`Operating System`": system().title(),
                        "`System Release`": release(),
                        "`System Version`": version(),
                        "`Python Version`": python_version(),
                        "`Server Owner`": jsonData.get("Owner"),
                        "`Server Owner Email`": jsonData.get("Owner Email"),
                        "`Server Available`": jsonData.get("Available")
                    }
                    documentReference.update(field_updates=data)
                    return True
                except Exception:
                    return False
            else:
                try:
                    data: dict = {
                        "Host Address": self.host,
                        "Server Identifier": jsonData.get("UID"),
                        "Server Name": self.name,
                        "Server Port": self.port,
                        "Server Location": jsonData.get("Location"),
                        "Server Program Version": jsonData.get("Version"),
                        "Network Address": jsonData.get("Network Address"),
                        "Server Type": jsonData.get("Type"),
                        "Operating System": system().title(),
                        "System Release": release(),
                        "System Version": version(),
                        "Python Version": python_version(),
                        "Server Owner": jsonData.get("Owner"),
                        "Server Owner Email": jsonData.get("Owner Email"),
                        "Server Available": jsonData.get("Available")
                    }
                    documentReference.set(document_data=data)
                    return True
                except Exception:
                    return False

# Driver Code For Running In Terminal
if (__name__ == "__main__"):
    SERVER: Server = Server(
        NAME=argv[1],
        PORT=argv[2]
    )
    for x in range(5):
        print(f"\n\033[33mServer Registrar\033[0m | \033[94mTry {x+1}\033[0m")
        if (SERVER.RegisterServer() is True):
            print("\033[33mServer Registrar\033[0m | \033[92mSuccess\033[0m", end="\n\n")
            break
        else:
            print("\033[33mServer Registrar\033[0m | \033[91mFailed\033[0m", end="\n")
            continue