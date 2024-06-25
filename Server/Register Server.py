from firebase_admin import initialize_app
from firebase_admin.credentials import Certificate
from firebase_admin import firestore
from uuid import uuid4
from socket import gethostbyname
from socket import gethostname
import json
from platform import (
    system,
    release,
    version,
    python_version
)
from sys import argv

credentials = Certificate("../Certificates/Firebase.json")
firebase = initialize_app(credentials)
db = firestore.client(app=firebase)
print("Firebase Initialized")

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
            else:
                docReference = db.collection("Servers").document(jsonData.get("UID"))
                docReferenceGet = docReference.get()
                if (docReferenceGet.exists):
                    try:
                        docReference.update({
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
                        })
                        return True
                    except Exception:
                        return False
                else:
                    try:
                        docReference.set({
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
                        })
                        return True
                    except Exception:
                        return False
            with open("../Certificates/Server.json", "w") as rax:
                json.dump(jsonData, rax, indent=4, ensure_ascii=False)
            self.RegisterServer()

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