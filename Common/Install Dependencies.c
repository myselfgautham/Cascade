#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#ifdef _WIN32
#include <Windows.h>
#else
#include <unistd.h>
#endif

#define COMMAND_COUNT 4
#define DELAY_MS 1

char * PYTHON = "python3.12 -m ";
char * COMMANDS[COMMAND_COUNT] = {"pip install Flask","pip install firebase-admin","pip install pyrebase4","pip install twilio"};

int main(void)
{
    for (int x = 0; x < COMMAND_COUNT; x++)
    {
        char * CURRENT;
        int size = strlen(PYTHON) + strlen(COMMANDS[x]) + 1;
        CURRENT = (char*) malloc(size * sizeof(char));
        for (int i = 0; i < size; i++)
        {
            if (i < strlen(PYTHON))
            {
                CURRENT[i] = PYTHON[i];
            }
            else {
                CURRENT[i] = COMMANDS[x][i - strlen(PYTHON)];
            }
        }
        CURRENT[size] = '\0';
        system("clear");
        printf("Executing Command => %s => [%i]\n\n",CURRENT,strlen(CURRENT));
        system(CURRENT);

        #ifdef _WIN32
        Sleep(DELAY_MS);
        #else
        sleep(DELAY_MS);
        #endif
        
        system("clear");
        free(CURRENT);
    }
    printf("\nInstallation Wizard Finished\n\n");
    return 0;
}