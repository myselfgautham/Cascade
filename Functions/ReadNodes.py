from os import system
from time import sleep
from firebase_admin import initialize_app
from firebase_admin.credentials import Certificate
from firebase_admin import firestore
from json import loads
from os import environ
import requests
from google.cloud.firestore_v1 import FieldFilter
from sys import exit

credentials: Certificate = Certificate(loads(environ.get("FIREBASE")))
firebase = initialize_app(credentials)
db = firestore.client(firebase)
system("clear")

print(f"\033[0;32mCascade Reader Found\033[0m \033[0;31m@\033[0m \033[0;34m{environ.get("ESP32")}\033[0m")
CARD: str = ""
esp32: str = environ.get("ESP32")

if (esp32 is None):
    print("\033[0;32mAll Available Test Cases Passed\033[0m", end="\n\n")
    exit(0)
else:
    print()

print("Please Scan The Node To Continue", end="\n\n")
while True:
    response = requests.get(f"{esp32}/data")
    sleep(0.9)
    if (response.status_code == 200 and response.text != ""):
        CARD = response.text
        print(f"Node Scanned => {CARD}")
        print("Getting Data Of Node", end="\n\n")
        ref = db.collection("Nodes").document(CARD)
        print("Reference Created")
        if ref.get().exists is False:
            print("\n\033[0;31mInvalid Node Found! Try Again\033[0m", end="\n\n")
        else:
            mail: str = ref.get().to_dict().get("User Email")
            streams = db.collection("Cards").where(filter=FieldFilter(
                field_path="Owners",
                op_string="array_contains",
                value=mail
            )).stream()
            print()
            i = 0
            for s in streams:
                print(f"\033[0;33mCard Number {i+1} =>\033[0m")
                print(s.to_dict())
                print()
                i += 1
            sleep(1)
        s = input("Clear Terminal [Y/n] => ")
        if s in {"Y", "y", ""}:
            system("clear")
        else:
            print()
        print("Please Scan The Node To Continue", end="\n\n")