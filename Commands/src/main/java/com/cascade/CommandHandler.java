package com.cascade;

import com.cascade.Exceptions.InvalidCommandException;
import com.cascade.Exceptions.ShellExitException;
import com.cascade.Helpers.ASCIIArt;
import com.cascade.Helpers.HelperCommand;
import com.cascade.Helpers.ShellCommands;

public class CommandHandler {
    public static void HandleCommand(String command) throws Exception {
        if (command.equals("help")) {
            HelperCommand.RegisterCommands();
            HelperCommand.PrintHelpCommandsData();
        } else if (command.equals("exit")) {
            throw new ShellExitException("Exit Command");
        } else if (command.equals("clear")) {
            ShellCommands.ClearTerminal();
            ASCIIArt.PrintASCIIArtOnTerminal();
        } else {
            throw new InvalidCommandException();
        }
    }
}