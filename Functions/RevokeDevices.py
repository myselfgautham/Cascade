from firebase_admin import initialize_app
from firebase_admin.credentials import Certificate
from firebase_admin import firestore
from json import loads
from os import environ
from datetime import datetime, timedelta, timezone


credentials: Certificate = Certificate(loads(environ.get("FIREBASE")))
firebase = initialize_app(credentials)
db = firestore.client(firebase)

def is30DaysBefore(date: str) -> bool:
    inputDate = datetime.strptime(date, "%Y-%m-%d %H:%M:%S %Z").date()
    currentDate = datetime.now(timezone.utc).date()
    date30DaysBefore = currentDate - timedelta(days=30)
    return inputDate <= date30DaysBefore

if (__name__ == "__main__"):
    stream = db.collection("Devices").stream()
    counter: int = 0
    for device in stream:
        deviceData: dict[str, str] = device.to_dict()
        if is30DaysBefore(deviceData.get("Authorization Time")):
            db.collection("Devices").document(deviceData.get("Device UID")).delete()
            counter += 1
    print(f"\n\033[{"92" if counter == 0 else "91"}m{counter} {"Documents" if counter > 1 else "Document"} Affected\033[0m", end="\n\n")