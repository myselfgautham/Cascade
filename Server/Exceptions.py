class SQLInjectionCharactersError(Exception):
    message: str = "Invalid Password"
    def __init__(self):
        super().__init__(self.message)
        

class WeakPasswordError(Exception):
    message: str = "Choose A Stronger Password"
    def __init__(self):
        super().__init__(self.message)