#!/usr/bin/bash

packages=(
  pip
  setuptools
  Flask
  Flask-Caching
  Flask-Compress
  pyrebase4
  firebase-admin
  uuid
  psutil
  flask_cors
  sendgrid
)

for package in "${packages[@]}"; do
  python3.12 -m pip install --upgrade "$package"
done