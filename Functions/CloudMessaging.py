from firebase_admin import initialize_app
from firebase_admin.credentials import Certificate
from firebase_admin import messaging

credentials: Certificate = Certificate("../Certificates/Firebase.json")
initialize_app(credentials)

TITLE: str = input("Enter Notification Title : ")
BODY: str = input("Enter Notification Body : ")

message: messaging.Message = messaging.Message(
    notification=messaging.Notification(
        title=TITLE,
        body=BODY,
        image="https://img.icons8.com/fluency/48/cardano.png"
    ),
    topic="Messaging"
)

try:
    response = messaging.send(message)
    print("Message Send Successfully :", response)
except Exception as e:
    print("Error Sending Message : ", e)