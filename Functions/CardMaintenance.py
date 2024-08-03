from firebase_admin import initialize_app
from firebase_admin.credentials import Certificate
from firebase_admin import firestore
from google.cloud.firestore_v1 import FieldFilter
from sys import argv

credentials: Certificate = Certificate("../Certificates/Firebase.json")
firebase = initialize_app(credentials)
db = firestore.client(firebase)

def CardMaintenanceFunction(DATE: str):
    try:
        count: int = 0
        reference = db.collection("Cards").where(filter=FieldFilter(
            field_path="Till",
            op_string="==",
            value=DATE
        )).stream()
        for document in reference:
            count += 1
            db.collection("Cards").document(document.id).delete()
        print(f"\n\033[{"92" if count == 0 else "91"}m{count} {"Documents" if count > 1 else "Document"} Affected\033[0m", end="\n\n")
    except Exception:
        print("\nCard Maintenance Function Failed", end="\n\n")
        
if (__name__ == "__main__"):
    if (len(argv) <= 1):
        print("\n\033[92mUsage :\033[0m python* CardMaintenance.py \"Month/Year\"", end="\n\n")
    else:    
        CardMaintenanceFunction(argv[1])