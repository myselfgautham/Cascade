# Base Exception Class
class SimpleServerError(Exception):
    def __init__(self, MESSAGE: str) -> None:
        self.MESSAGE = f"\n\n\033[91m{MESSAGE}\033[0m\n"
        super().__init__(self.MESSAGE)
    @property
    def message(self):
        return self.MESSAGE

# Safe Exception Class
class SafeException(object):
    TITLE: str = "Server Error"
    def __init__(self, MESSAGE: str) -> None:
        self.MESSAGE = f"\n\n{self.TITLE}\n\033[91m{MESSAGE}\033[0m\n"
    @property
    def message(self):
        return self.MESSAGE

# JSON File Not Initialized Error
class JSONConfigurationNotInitializedError(SimpleServerError):
    def __init__(self) -> None:
        super().__init__("JSON Configurations Not Initialized\nPlease Initialize It")
        
# Flask Cache Implementation Failed
class FlaskCacheBuildFailedError(SimpleServerError):
    def __init__(self) -> None:
        super().__init__("Failed To Build Flask Cache\nPlease Fix And Rerun Script")
        
# Standard Path Error
class StandardPathError(SimpleServerError):
    def __init__(self) -> None:
        super().__init__("Invalid Path Found For Standard Path Class\nPlease Fix And Rerun Script")

# JSON Initialization Failed
class JSONConfigurationInitializationFailed(SimpleServerError):
    def __init__(self) -> None:
        super().__init__("Failed To Parse JSON Configuration Files")
        
# CORS Error Failed
class CORSException(SimpleServerError):
    def __init__(self) -> None:
        super().__init__("Launch Failed At Servers CORS Definitions\nPlease Fix Immediately")
        
# Firebase Initialization Error
class FirebaseInitializationError(SimpleServerError):
    def __init__(self) -> None:
        super().__init__("Firebase Server Initialization Failed\nPlease Fix Immediately")
        
# SQL Injection Characters Error
class SQLInjectionCharactersError(Exception):
    message: str = "Invalid Password"
    def __init__(self):
        super().__init__(self.message)
        
# Weak Password Error
class WeakPasswordError(Exception):
    message: str = "Choose A Stronger Password"
    def __init__(self) -> None:
        super().__init__(self.message)
    
# Failed To Send Email Error
class FailedToSendEmail(SafeException):
    def __init__(self) -> None:
        super().__init__("Failed To Send Twilio SendGrid Email")
        
# SendGrid Failed
class FailedToInitializeSendGrid(SimpleServerError):
    def __init__(self) -> None:
        super().__init__("Failed To Initialise Twilio SendGrid API\nFix Immediately")