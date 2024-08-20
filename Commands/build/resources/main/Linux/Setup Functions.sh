#!/usr/bin/bash

packages=(
  pip
  firebase_admin
  pyserial
)

for package in "${packages[@]}"; do
  python3.12 -m pip install --upgrade "$package"
done