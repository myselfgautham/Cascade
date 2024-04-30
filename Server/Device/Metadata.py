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