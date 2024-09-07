#!/usr/bin/bash

cd $1 || exit 2
clear

HOST=$(hostname -I | cut -d' ' -f1)
CORES=$(nproc)
PORT=8080

gunicorn -w $CORES \
-b $HOST:$PORT \
"Server Program":application