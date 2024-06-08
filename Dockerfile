FROM python:latest

WORKDIR /usr/app/src
COPY . .

WORKDIR /usr/app/src/Scripts
RUN pip install -r ./Requirements.txt

WORKDIR /usr/app/src/Server
EXPOSE 1920
CMD [ "bash", "Run Server.sh" ]