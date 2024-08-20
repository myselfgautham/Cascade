#!/usr/bin/bash

packages=(
  pip
  flask
  flask_compress
  flask_caching
  firebase_admin
  uuid
)

for package in "${packages[@]}"; do
  python3.12 -m pip install --upgrade "$package"
done