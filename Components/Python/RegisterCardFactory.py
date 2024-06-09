from firebase_admin import initialize_app
from firebase_admin.credentials import Certificate
from firebase_admin import firestore
import serial as pyserial
from os import system
from firebase_admin.auth import get_user_by_email
from firebase_admin._user_mgt import UserRecord
from datetime import datetime
from datetime import UTC

credentials: Certificate = Certificate("../Certificates/Firebase.json")
firebase = initialize_app(credentials)
db = firestore.client(firebase)
serial = pyserial.Serial(
    port="/dev/ttyUSB0",
    baudrate=115200,
    timeout=0.1
)

def issueCardToUser(Email: str, ActivationCode: str, CardUid: str) -> None:
    try:
        user: UserRecord = get_user_by_email(Email)
        reference = db.collection("Nodes").document(CardUid)
        reference.set({
            "Card Identifier": CardUid,
            "User Email": Email,
            "Activation Code": ActivationCode,
            "User Identifier": user.uid,
            "User Phone Number": user.phone_number,
            "User Real Name": user.display_name,
            "Issued On": datetime.now(UTC).strftime("%Y-%m-%d %H:%M:%S UTC")
        })
        print("\033[92mCard Issued Successfully\033[0m\n")
    except Exception:
        print("\033[91mCard Issuance Failed\nTry Again\033[0m\n")

if (__name__ == "__main__"):
    print("")
    EMail: str = input("Enter User Email : ")
    ActivationCode: str = input("Enter Activation Code : ")
    CardUID: str = ""
    print("\n\033[92mScan The Card To Issue ( Fetches Card UID )\033[0m")
    while True:
        data = serial.readline().decode().strip()
        if data:
            CardUID = data
            break
    print(f"Card Scanned => {CardUID}", end="\n\n")
    confirm = input("Are You Sure You Want To Continue : ")
    if (confirm in {"Yes", "yes", "Y", "y"}):
        system("clear")
        print("Issuing Card To User")
        print("\nDetails =>")
        print("---------> EMail :", EMail)
        print("---------> Activation Code :", ActivationCode)
        print("---------> Card Identifier :", CardUID, end="\n\n")
        issueCardToUser(
            Email=EMail,
            ActivationCode=ActivationCode,
            CardUid=CardUID
        )
    else:
        print("Card Issuing Cancelled")