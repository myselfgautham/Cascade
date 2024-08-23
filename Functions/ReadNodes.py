from time import sleep
from firebase_admin import initialize_app
from firebase_admin.credentials import Certificate
from firebase_admin import firestore
from json import loads
from google.cloud.firestore_v1 import FieldFilter
import serial as pyserial
from os import environ
from os import system

system("clear")
credentials: Certificate = Certificate(loads(environ.get("FIREBASE")))
firebase = initialize_app(credentials)
db = firestore.client(firebase)
try:
    serial = pyserial.Serial(
        port="/dev/ttyUSB1",
        baudrate=115200,
        timeout=0.1
    )
except Exception:
    print("Serial Ports Exception Encountered")
    exit(0)
    
cardx = ''
print("Please Scan The Node To Continue")
while True:
    data = serial.readline().decode().strip()
    if data:
        cardx = data
        print(f"Node Scanned => {cardx}", end="\n\n")
        print("Getting Data Of Node")
        ref = db.collection("Nodes").document(cardx)
        print("Reference Created")
        if ref.get().exists is False:
            print("\nInvalid Node Found! Try Again", end="\n\n")
        else:
            print()
            print("Collecting Node Data")
            mail: str = ref.get().to_dict().get("User Email")
            streams = db.collection("Cards").where(filter=FieldFilter(
                field_path="Owners",
                op_string="array_contains",
                value=mail
            )).stream()
            print()
            i = 0
            for s in streams:
                print(f"Card Number {i+1} =>")
                print(s.to_dict())
                print()
                i += 1
            sleep(1)
            s = input("Clear Terminal [Y/n] => ")
            if s in {"Y", "y", ""}:
                system("clear")
            else:
                print()
            print("Please Scan The Node To Continue")