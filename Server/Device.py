# Imports
from secrets import token_bytes
from hashlib import sha384
from time import time_ns

# Custom Exception
class UnableToGenerateUID(Exception):
    message: str = "Unable To Generate UID For Device"
    def __init__(self) -> None:
        super().__init__(self.message)

# Create UID Function
def createUID() -> str:
    """
    Creates A Unique Identifier For Each Device On The Basis Of
    Random Hexadecimal Value - Current Time Since Epoch And
    At Last A SHA384 Checksum To Ensure Safety
    Usage : createUID()
    Parameters : None
    Return : String Of Length 384 Characters (Human Readable)
    Dependencies : Secrets (TokenHEX) | HashLib (SHA384) | Time (TimeNS)
    Special Errors : UnableToGenerateUID(Exception)
    Error Case : "" | Length Not Equal To 384
    """
    try:
        token = token_bytes(32)
        time = int(time_ns())
        combinedData = token + time.to_bytes(8,byteorder="big")
        generatedUID = sha384(combinedData).digest().hex()
        if (generatedUID == "") or (len(generatedUID) != 96):
            raise UnableToGenerateUID()
        else:
            return generatedUID
    except UnableToGenerateUID:
        print(f"\n\033[31;3m{UnableToGenerateUID.message}\033[0m",end="\n\n")
    except Exception as E:
        print(f"\n\033[3m=> Undefined Exception : {"\033[0;31m" + str(E).title() + "\033[0m"}")

# Device Type Definition
def getDeviceTypeAbsolute(userAgentBuffer: str) -> str:
    """
    Returns The Type Of Device Which Is Connected
    On The Basis Of User Agent In Request
    Usage : getDeviceTypeAbsolute(userAgentBuffer: str)
    Return : String
    Special Errors : Nil
    Dependencies : Flask (User-Agent From request.header)
    """
    phoneTypes: list[str] = ['iphone', 'android', 'windows phone']
    userAgentBuffer = userAgentBuffer.lower()
    if "mobile" in userAgentBuffer:
        return "Mobile Device"
    elif "tablet" in userAgentBuffer:
        return "Tablet Device"
    elif any(agent in userAgentBuffer for agent in phoneTypes):
        return "Smart Phone"
    else:
        return "Computer"