# Packages Inclusion
from firebase_admin import initialize_app
from firebase_admin.credentials import Certificate

# Base Firebase Class
class Firebase(object):
    def __init__(self, credentials: Certificate) -> None:
        self.credentials: Certificate = credentials
    def initialiseFirebase(self) -> bool:
        try:
            initialize_app(credential = self.credentials)
            return True
        except Exception:
            return False