#!/usr/bin/env bash

IMAGE_NAME="swiftjs"
VERSION_CODE="latest"

sudo docker rmi -f $IMAGE_NAME:$VERSION_CODE
cd .. || exit 1
clear
sudo docker build \
-t $IMAGE_NAME:$VERSION_CODE .
sleep 1
clear
sudo docker images -a