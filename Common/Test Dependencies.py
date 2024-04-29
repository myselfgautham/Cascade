from os import system

def testDependencies() -> int:
    system("clear")
    try:
        import flask
        import firebase_admin
        return 200
    except ImportError:
        print("\n\033[0;31m=> One Or More Dependencies Are Missing\033[0m")
        return 101
    except Exception as e:
        print(f"\n\033[3m=> Undefined Exception : {"\033[0;31m" + str(e).title() + "\033[0m"}")
        return 301
    finally:
        print("\n\033[0;34mDependencies Test Finished\033[0m")

if __name__ == "__main__":
    result: int = testDependencies()
    if result == 200:
        print("\033[0;32m","All Dependencies Are Satisfied","\033[0m",sep="",end="\n\n")
    elif result == 101:
        print("\033[0;31m","Please Install Necessary Dependencies","\033[0m",sep="",end="\n\n")
    elif result == 301:
        print("\033[0;31m","Undefined Error Encountered While Execution","\033[0m",sep="",end="\n\n")
    else:
        print("\033[0;31m","Invalid Response Code From Test","\033[0m",sep="",end="\n\n")