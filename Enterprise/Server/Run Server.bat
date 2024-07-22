@ECHO OFF
CLS
python -m flask --app "Enterprise Server.py" run --host=0.0.0.0 --port=3000 --with-threads
PAUSE