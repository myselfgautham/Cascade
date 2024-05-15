def customPrint(text: str) -> None:
    print(text, end="\n\n")
    return None

def Main() -> None:
    print()
    print("\033[1m|Simple Server\033[0m", "|=> \033[94mDependencies Testing Utility\033[0m", sep="\n", end="\n\n")
    try:
        import flask
        import flask_caching
        import flask_cors
        import firebase_admin
        import twilio
        import sendgrid
        import pyrebase
        import psutil
        print("\033[92mAll Dependencies Are Satisfied\033[0m")
    except Exception:
        print("=> \033[91mDependencies Are Corrupted\033[0m")
    finally:
        customPrint("Exiting Wizard Process")
        return None
    
if __name__ == "__main__":
    Main()