#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <string.h>

#define END '\0'
#define COMMAND_COUNT 1
#define DELAY 1
#define SUFFIXLEN strlen(PYTHON)

const char * PYTHON = "python3.6 -m ";
const char * COMMANDS[COMMAND_COUNT] = {"pip install Flask"};

int main(int argc , char *argv[])
{
    if (argc != 2)
    {
        printf("Usage : ./installer [mode]\n");
        printf("Mode Can Be Either -c (Clear) Or -v (Verbose)\n");
        return 1;
    }
    for (int pointer = 0; pointer < COMMAND_COUNT; pointer++)
    {
        signed int ASSIGN = SUFFIXLEN + strlen(COMMANDS[pointer]) + 1;
        char * FINAL = malloc(ASSIGN * sizeof(char));
        for (int i = 0; i < ASSIGN; i++)
        {
            if ((i >= 0) && (i < SUFFIXLEN))
            {
                FINAL[i] = PYTHON[i];
            }
            else
            {
                FINAL[i] = COMMANDS[pointer][i - SUFFIXLEN];
            }
        }
        FINAL[ASSIGN] = END;
        system("clear");
        printf("\nExecuting Command -> %s\n",FINAL);
        system(FINAL);
        sleep(DELAY);
        if (strcmp(argv[1],"-c") == 0)
        {
            system("clear");
        }
        else if (pointer == (COMMAND_COUNT - 1))
        {
            continue;
        }
        else
        {
            printf("\n");
        }
        free(FINAL);
    }
    if (strcmp(argv[1],"-c") == 0)
    {
        system("clear");
    }
    else
    {
        printf("\n");
    }
    printf("\e[0;32mInstallation Wizard Finished\e[0m\n\n");
    return 0;
}