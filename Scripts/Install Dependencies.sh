#!/usr/bin/bash
printf "\nInstalling Python Dependencies\n\n"
sleep 1
clear
python3.12 -m pip install -r ./Requirements.txt
python3.12 -m pip install gunicorn
sleep 1
clear