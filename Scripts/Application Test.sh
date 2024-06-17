#!/usr/bin/env bash

ANDROID_SDK_PATH="/home/megkvc/Android/SDK/"
TYPE="test"

clear
cd ../Android/ || exit 1
export ANDROID_HOME=$ANDROID_SDK_PATH
./gradlew $TYPE
printf "\n"