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