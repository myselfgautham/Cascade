# Libraries Imports
from secrets import token_bytes
from hashlib import sha384
from time import time_ns

class UnableToGenerateUID(Exception):
    message: str = "Unable To Generate UID For Device"
    def __init__(self) -> None:
        super().__init__(self.message)

def createUID() -> str:
    """
    Creates A Unique Identifier For Each Device On The Basis Of
    Random Hexadecimal Value - Current Time Since Epoch And
    At Last A SHA384 Checksum To Ensure Safety
    Usage : createUID()
    Parameters : None
    Return : String Of Length 96 Characters (Human Readable)
    Dependencies : Secrets (TokenHEX) | HashLib (SHA384) | Time (TimeNS)
    Special Errors : UnableToGenerateUID(Exception)
    Error Case : "" | Length Not Equal To 96
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