#!/usr/bin/env bash

PGM_NAME="Image_Capture_Program_jar"
JAR_NAME="Image Capture Program.jar"

cd "../Java/Output/artifacts/$PGM_NAME" ||exit 1
java -jar "$JAR_NAME"