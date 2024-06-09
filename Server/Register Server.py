from firebase_admin import initialize_app
from firebase_admin.credentials import Certificate
from firebase_admin import firestore
from uuid import uuid4
from socket import gethostbyname
from socket import gethostname
import json
from sys import argv

credentials = Certificate("../Certificates/Firebase.json")
firebase = initialize_app(credentials)
db = firestore.client(app=firebase)

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
                            "`Server ID`": jsonData.get("UID"),
                            "`Server Name`": self.name,
                            "`Server Port`": self.port
                        })
                        return True
                    except Exception:
                        return False
                else:
                    try:
                        docReference.set({
                            "Server Name": self.name,
                            "Server Port": self.port,
                            "Host Address": self.host,
                            "Server ID": jsonData.get("UID")
                        })
                        return True
                    except Exception:
                        return False
            with open("../Certificates/Server.json", "w") as rax:
                json.dump(jsonData, rax, indent=4, ensure_ascii=False)
            self.RegisterServer()

SERVER: Server = Server(
    NAME=argv[1],
    PORT=argv[2]
)
print(SERVER.RegisterServer())