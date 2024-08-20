from firebase_admin import initialize_app
from firebase_admin.credentials import Certificate
from firebase_admin import firestore
import serial as pyserial
from os import system
from firebase_admin.auth import get_user_by_email
from firebase_admin._user_mgt import UserRecord
from datetime import datetime
from datetime import UTC
from sys import exit
from json import loads
from os import environ

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

def issueCardToUser(Email: str, ActivationCode: str, CardUid: str) -> None:
    try:
        user: UserRecord = get_user_by_email(Email)
        reference = db.collection("Nodes").document(CardUid)
        if (reference.get().exists):
            print("\033[91mNode Already Issued\nTry Again\033[0m\n")
            return None
        reference.set({
            "Card Identifier": CardUid,
            "User Email": Email,
            "Activation Code": ActivationCode,
            "User Identifier": user.uid,
            "User Phone Number": user.phone_number,
            "User Real Name": user.display_name,
            "Issued On": datetime.now(UTC).strftime("%Y-%m-%d %H:%M:%S UTC"),
            "Activated": False
        })
        print("\033[92mNode Issued Successfully\033[0m\n")
    except Exception:
        print("\033[91mNode Issuance Failed\nTry Again\033[0m\n")

if (__name__ == "__main__"):
    print("")
    EMail: str = input("Enter User Email : ")
    ActivationCode: str = input("Enter Activation Code : ")
    CardUID: str = ""
    print("\n\033[92mScan The Node To Issue ( Fetches Node UID )\033[0m")
    while True:
        data = serial.readline().decode().strip()
        if data:
            CardUID = data
            break
    print(f"Node Scanned => {CardUID}", end="\n\n")
    confirm = input("Are You Sure You Want To Continue : ")
    if (confirm in {"Yes", "yes", "Y", "y"}):
        system("clear")
        print("Issuing Node To User")
        print("\nDetails =>")
        print("---------> EMail :", EMail)
        print("---------> Activation Code :", ActivationCode)
        print("---------> Node Identifier :", CardUID, end="\n\n")
        issueCardToUser(
            Email=EMail,
            ActivationCode=ActivationCode,
            CardUid=CardUID
        )
    else:
        print("Node Issuing Cancelled")