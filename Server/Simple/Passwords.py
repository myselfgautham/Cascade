from Exceptions import SQLInjectionCharactersError

class PasswordAnalyzer(object):
    def __init__(self, PASSWORD: str) -> None:
        self.password = list(PASSWORD)
        if ("\"" in self.password) or ("\'" in self.password):
            raise SQLInjectionCharactersError
    @property
    def isSecurePassword(self) -> bool:
        score: int = 100
        criterias: list[bool] = [
            any(char.isupper() for char in self.password),
            any(char.islower() for char in self.password),
            any(char.isdigit() for char in self.password),
            any(char in "!@#$%^&*()-_+=~`[]{}|\\:;\"'<>,.?/" for char in self.password),
            len(self.password) >= 8
        ]
        for criteria in criterias:
            if (not criteria):
                score -= 20
            else:
                continue
        return score >= 60