from firebase_admin import initialize_app
from firebase_admin.credentials import Certificate
from firebase_admin import firestore
from sys import argv
from json import loads
from os import environ
from datetime import datetime

credentials: Certificate = Certificate(loads(environ.get("FIREBASE")))
firebase = initialize_app(credentials)
db = firestore.client(firebase)

def DateComparing(date1: str, date2: str) -> bool:
    if (date1 is None) or (date2 is None):
        return False
    date_format = "%m/%Y"
    parsed_date1 = datetime.strptime(date1, date_format)
    parsed_date2 = datetime.strptime(date2, date_format)
    return parsed_date1 < parsed_date2

def CardMaintenanceFunction(DATE: str):
    try:
        count: int = 0
        reference = db.collection("Cards").stream()
        for document in reference:
            if DateComparing(
                date1=document.to_dict().get("Till"),
                date2=DATE
            ):
                db.collection("Cards").document(document.id).delete()
                count += 1
        print(f"\n\033[{"92" if count == 0 else "91"}m{count} {"Documents" if count > 1 else "Document"} Affected\033[0m", end="\n\n")
    except Exception:
        print("\nCard Maintenance Function Failed", end="\n\n")
        
if (__name__ == "__main__"):
    if (len(argv) <= 1):
        print("\n\033[92mUsage :\033[0m python* CardMaintenance.py \"Month/Year\"", end="\n\n")
    else:    
        CardMaintenanceFunction(argv[1])