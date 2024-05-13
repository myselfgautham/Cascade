from twilio.rest import Client
from Firebase import data

TwilioClient = Client(
    data["Twilio Communications"]["SID"],
    data["Twilio Communications"]["AUTH"]
)

def sendOTPMessage(phone: str, OTP:int) -> bool:
    try:
        TwilioClient.messages.create(
            body = f"Your OTP For Your Simple Account Phone Verification Is {OTP}",
            from_=data["Twilio Communications"]["PHONE"],
            to=phone
        )
        return True
    except Exception:
        return False