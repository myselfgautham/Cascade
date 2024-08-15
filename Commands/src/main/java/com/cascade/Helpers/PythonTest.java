package com.cascade.Helpers;

public class PythonTest {
    public static String pythonTest = """
            if (__name__ == "__main__"):
                print("\\033[34mCascade Server\\nDependencies Tester\\033[0m\\n")
                try:
                    from flask import *
                    print("\\033[32m:) Flask Dependency Resolved\\033[0m")
                except Exception:
                    print("\\033[31m:( Flask Dependency Error\\033[0m")

                try:
                    from flask_caching import *
                    print("\\033[32m:) Flask Caching Dependency Resolved\\033[0m")
                except Exception:
                    print("\\033[31m:( Flask Caching Dependency Error\\033[0m")

                try:
                    from flask_cors import *
                    print("\\033[32m:) Flask CORS Resolved\\033[0m")
                except Exception:
                    print("\\033[31m:( Flask CORS Dependency Error\\033[0m")
               \s
                try:
                    from flask_compress import *
                    print("\\033[32m:) Flask Compress Dependency Resolved\\033[0m")
                except Exception:
                    print("\\033[31m:( Flask Compress Dependency Error\\033[0m")
               \s
                try:
                    from pyrebase import *
                    print("\\033[32m:) Pyrebase Dependency Resolved\\033[0m")
                except Exception:
                    print("\\033[31m:( Pyrebase Dependency Error\\033[0m")
               \s
                try:
                    from firebase_admin import *
                    print("\\033[32m:) Firebase Admin Dependency Resolved\\033[0m")
                except Exception:
                    print("\\033[31m:( Firebase Admin Dependency Error\\033[0m")
               \s
                try:
                    from psutil import *
                    print("\\033[32m:) Psutil Dependency Resolved\\033[0m")
                except Exception:
                    print("\\033[31m:( Psutil Dependency Error\\033[0m")
               \s
                try:
                    from uuid import *
                    print("\\033[32m:) Python UUID Dependency Resolved\\033[0m")
                except Exception:
                    print("\\033[31m:( Python UUID Dependency Error\\033[0m")
               \s
                try:
                    from setuptools import *
                    print("\\033[32m:) Setup Utilities Dependency Resolved\\033[0m")
                except Exception:
                    print("\\033[31m:( Setup Utilities Dependency Error\\033[0m")
               \s
                try:
                    from json import *
                    print("\\033[32m:) JSON Dependency Resolved\\033[0m")
                except Exception:
                    print("\\033[31m:( JSON Dependency Error\\033[0m")

            else:
                print("\\033[31m:( Invalid Execution Environment\\033[0m")""";
}