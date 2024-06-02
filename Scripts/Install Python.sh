#!/usr/bin/bash
sudo apt update
sudo apt upgrade -y
sudo apt install -y build-essential libssl-dev zlib1g-dev libncurses5-dev libncursesw5-dev libreadline-dev libsqlite3-dev libgdbm-dev libdb5.3-dev libbz2-dev libexpat1-dev liblzma-dev libffi-dev wget
cd ~ || exit 1
wget https://www.python.org/ftp/python/3.12.1/Python-3.12.1.tgz
tar -xzf Python-3.12.1.tgz
cd Python-3.12.1 || exit 1
./configure --enable-optimizations
make -j$(nproc)
sudo make altinstall
python3.12 --version