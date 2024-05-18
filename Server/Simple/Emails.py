# SendGrid Imports
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail

# Definitions Import
from Definitions import backend
from Exceptions import FailedToSendEmail

# Firebase Imports
from Firebase import getEmailVerificationLink
from Firebase import getUserRealName
        
# Verification Email On New Account
def sendEmailVerificationEmail(sendgrid: SendGridAPIClient, email: str):
    try:
        message = Mail(
            from_email = backend["Twilio SendGrid"]["Mail"],
            to_emails = email,
            subject = "Simple Account Email Verification"
        )
        message.dynamic_template_data = {
            "name" : getUserRealName(email),
            "url" : getEmailVerificationLink(email)
        }
        message.template_id = backend["Twilio SendGrid"]["Templates"]["Verification"]
        sendgrid.send(message)
    except Exception:
        raise FailedToSendEmail
    
# Send Email One Time Passkey
def sendEmailOTP(sendgrid: SendGridAPIClient, email: str, otp: int):
    try:
        message = Mail(
            from_email=backend["Twilio SendGrid"]["Mail"],
            to_emails=email,
            subject="Simple Account Login Verification"
        )
        message.dynamic_template_data = {
            "name" : getUserRealName(email),
            "OTP" : otp
        }
        message.template_id = backend["Twilio SendGrid"]["Templates"]["Login"]
        sendgrid.send(message)
    except Exception:
        raise FailedToSendEmail