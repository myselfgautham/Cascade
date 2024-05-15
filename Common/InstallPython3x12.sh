#!/bin/bash
clear
sudo apt update
clear
sudo apt upgrade -y
clear
sudo apt install -y build-essential libssl-dev zlib1g-dev libncurses5-dev libncursesw5-dev libreadline-dev libsqlite3-dev libgdbm-dev libdb5.3-dev libbz2-dev libexpat1-dev liblzma-dev libffi-dev wget
clear
wget https://www.python.org/ftp/python/3.12.1/Python-3.12.1.tgz
tar -xzf Python-3.12.1.tgz
clear
./configure --enable-optimizations 
make -j$(nproc) 
sudo make altinstall
clear
python3.12 --version