#!/usr/bin/env bash

CONTAINER_NAME="swift"
IMAGE_NAME="swiftjs"
IMAGE_TAG="latest"

sudo docker rm -f $CONTAINER_NAME
clear
sudo docker run \
--name $CONTAINER_NAME $IMAGE_NAME:$IMAGE_TAG