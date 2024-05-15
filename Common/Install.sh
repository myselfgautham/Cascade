#!/bin/bash
clear
printf "\nExecuting Setup Wizard\n"
printf "Simple Server Version 1.0\n\n"
printf "Fetching Python Versions\n\n"
sleep 1
function NEW ()
{
    printf "\n";
}
compgen -c python | sort -u | grep -v -- '-config$' | while read -r p; do
    printf "%-14s  " "$p"
    "$p" --version
done
NEW
echo "Running With Python3.12"
NEW
sudo apt update
clear
sudo apt upgrade -y
clear
printf "Executing Python Modules Installations\n\n"
python3.12 -m pip install -r Packages.txt
sleep 1
clear
printf "\n\e[0;32mInstallation Finished\e[0m\n"
printf "Proceeding To Test\n"
python3.12 "Test Modules.py"