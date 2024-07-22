@ECHO OFF
CLS
python -m flask --app "Server Program.py" run --host=0.0.0.0 --port=3000 --with-threads
PAUSE