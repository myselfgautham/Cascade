# Imports
from os.path import join
from os.path import abspath
from os.path import dirname
from sys import path

# Add To Python Path
current_dir = dirname(abspath(__file__))
main_directory_path = abspath(join(current_dir, '..', '..'))
path.append(main_directory_path)

# Server Modules Install
from Server import Device
from Server import Firebase
from Server import PasswordAnalyser
from Server import PyrebaseSDK
from twilio.rest import Client as Phone

# Twilio Data
class Twilio():
    account_sid = 'ACa3f3f960331922354c614416f1ddf730'
    auth_token = '3582723f252c6d21deddef6ca9c71929'
    number = "+1 (505) 492-0806"