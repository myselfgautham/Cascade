#!/usr/bin/bash

cd $1 || exit 2

CORES=$(nproc)
PORT=1920
CERT="../Certificates/cert.pem"
KEY="../Certificates/key.pem"
HOST=$(hostname -I | cut -d' ' -f1)
SERVER="Main Server"

clear
python3.12 "Register Server.py" "$SERVER" "$PORT"
sleep 1
clear

gunicorn -w $CORES \
--certfile=$CERT \
--keyfile=$KEY \
-b $HOST:$PORT \
"Server Program":application