from Firebase import createNewDocument
from hashlib import sha256
from secrets import token_bytes
from time import time_ns
from Device import UnableToGenerateUID

class FirebaseError(Exception):
    message: str = "Firebase API Failed To Create Document"
    def __init__(self) -> None:
        super().__init__(self.message)
        return None

def createNewCard(data):
    try:
        token = token_bytes(32)
        time = int(time_ns())
        combinedData = token + time.to_bytes(8,byteorder="big")
        cardUID = sha256(combinedData).digest().hex()
        if (cardUID == "") or (len(cardUID) != 64):
            raise UnableToGenerateUID
        else:
            final = cardUID
        buffer = createNewDocument(
            collection = "Cards",
            document = final,
            data = data
        )
        if not buffer:
            raise FirebaseError
    except UnableToGenerateUID:
        print(f"\n\033[31;3m{UnableToGenerateUID.message}\033[0m",end="\n\n")
    except FirebaseError:
        print(f"\n\033[31;3m{FirebaseError.message}\033[0m",end="\n\n")
    except Exception as E:
        print(f"\n\033[3m=> Undefined Exception : {"\033[0;31m" + str(E).title() + "\033[0m"}")