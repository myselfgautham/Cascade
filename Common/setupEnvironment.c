// Imports
#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>

// Command Count
#define COUNT 1

// Commands To Run
const char *commands[COUNT] = {"python3 -m pip install flask"};

// Main Function
int main(void)
{
    // Running The Commands
    for (int i = 0; i < COUNT; i++)
    {
        printf("Running Command %s\n",commands[i]);
        system(commands[i]);
        system("clear");
    }
    // Finished Message
    printf("\n\e[0;32mInstallation Finished\e[0m\n\n");
    sleep(1);
    // Clear Terminal
    system("clear");
}