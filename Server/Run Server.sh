#!/usr/bin/bash

CORES=$(nproc)
PORT=1920
CERT="../Certificates/cert.pem"
KEY="../Certificates/key.pem"
HOST=$(hostname -I | cut -d' ' -f1)

gunicorn -w $CORES \
--certfile=$CERT \
--keyfile=$KEY \
-b $HOST:$PORT \
"Server Program":application