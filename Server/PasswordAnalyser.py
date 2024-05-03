class SQLInjectionCharactersError(Exception):
    message: str = "Invalid Password"
    def __init__(self):
        super().__init__(self.message)

class PasswordAnalyser():
    def __init__(self, password: str) -> None:
        self.password = list(password)
        if "\"" in self.password or "\'" in self.password:
            raise SQLInjectionCharactersError()
        return None
    def getStrength(self) -> bool:
        score: int = 100
        criteria: list[bool] = [
            any(char.isupper() for char in self.password),
            any(char.islower() for char in self.password),
            any(char.isdigit() for char in self.password),
            any(char in "!@#$%^&*()-_+=~`[]{}|\\:;\"'<>,.?/" for char in self.password),
            len(self.password) >= 8
        ]
        for x in criteria:
            if (not x):
                score -= 20
            else:
                continue
        return score >= 60