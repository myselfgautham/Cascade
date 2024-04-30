# Import
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

# Device Type
def getDeviceTypeAbsolute(userAgentBuffer: str) -> str:
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

# Test
if __name__ == "__main__":
    checkSum: str = generateUID()
    print(f"Generated UID : {checkSum}")