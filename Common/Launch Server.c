#include <stdio.h>
#include <stdlib.h>
#include <string.h>

const char * INTERPRETER = "/usr/local/bin/python3.12";
const char * PATH = "/home/megkvc/Documents/GitHub Projects/Little Kites State Camp/Client/Python/";
const char * SCRIPT = "Server.py";

int main(void)
{
    char * COMMAND;
    unsigned short int SIZE = strlen(INTERPRETER) + strlen(PATH) + strlen(SCRIPT);
    SIZE += 4;
    COMMAND = (char*) malloc(SIZE * sizeof(char));
    strcat(COMMAND,INTERPRETER);
    strcat(COMMAND," \"");
    strcat(COMMAND,PATH);
    strcat(COMMAND,SCRIPT);
    strcat(COMMAND,"\"");
    system(COMMAND);
    free(COMMAND);
    return 0;
}