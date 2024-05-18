from Firebase import createNewDocument
from hashlib import sha256
from Firebase import FIRESTORE
from Firebase import FieldFilter
from Device import UnableToGenerateUID

class FirebaseError(Exception):
    message: str = "Firebase API Failed To Create Document"
    def __init__(self) -> None:
        super().__init__(self.message)
        return None

def createNewCard(data):
    try:
        dataBuffer = str(data["Card Number"] + data["Card Owners"][0]).encode()
        cardUID = sha256(dataBuffer).digest().hex()
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
                                                         
def getLinkedCards(user: str):
    reference = FIRESTORE.collection('Cards')
    buffer: list = []
    fltr: FieldFilter = FieldFilter("`Card Owners`", "array_contains", user)
    query = reference.where(filter=fltr).get()
    for doc in query:
        buffer.append(doc.to_dict())
        buffer[len(buffer) - 1]["Document ID"] = doc.id
    return buffer
    
def deleteCard(carduid: str) -> bool:
    try:
        reference = FIRESTORE.collection("Cards").document(carduid)
        data = reference.get()
        if (data.exists):
            reference.delete()
            return True
        else:
            return False
    except Exception as e:
        print("\n",e,end="\n\n")
        return False