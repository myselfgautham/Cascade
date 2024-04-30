# Imports
from secrets import token_bytes
from time import time_ns
from hashlib import sha384

# Generator Function
def generateUID() -> str:
    token = token_bytes(32)
    time = int(time_ns())
    combinedData = token + time.to_bytes(8,byteorder="big")
    hashCheckSum = sha384(combinedData).digest()
    return str(hashCheckSum.hex())