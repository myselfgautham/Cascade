#!/usr/bin/bash

CORES=$(nproc)
PORT=1920
CERT="../Certificates/cert.pem"
KEY="../Certificates/key.pem"
HOST=$(hostname -I | cut -d' ' -f1)
SERVER="IND1 Server"

python3.12 "Register Server.py" "$SERVER" "$PORT"

gunicorn -w $CORES \
--certfile=$CERT \
--keyfile=$KEY \
-b $HOST:$PORT \
"Server Program":application
