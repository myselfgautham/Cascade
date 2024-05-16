from os import system
from os.path import abspath

class ServerShell():
    def __init__(self, version: str, name: str) -> None:
        self.version: str = version
        self.name = name
        self.alt = "Simple Server"
        self.count = 0
        system("clear")
        return None
    def introPrint(self) -> None:
        print()
        print(f"|\033[1m{self.alt}\033[0m")
        print(f"|=> \033[94mVersion {self.version}\033[0m", end="\n\n")
    def beginShell(self) -> None:
        try:
            while (True):
                command: str = input(f"\033[91mAdministrator@{self.name}\033[0m: ({self.count}) $ ")
                match (command):
                    case ("exit"):
                        print("")
                        break
                    case ("clear"):
                        system("clear")
                        self.introPrint()
                    case ("reset"):
                        self.count = -1
                    case ("test"):
                        system(f"python3.12 \"{abspath("../Common/Test Modules.py")}\"")
                    case _:
                        print("=> Undefined Command", end="\n\n")
                self.count += 1
        except Exception:
            print("\n\033[91m=> Error : Invalid Command\033[0m")
        finally:
            return None
    
SHELL: ServerShell = ServerShell("0.6 Beta", "EURx3")
SHELL.introPrint()
SHELL.beginShell()