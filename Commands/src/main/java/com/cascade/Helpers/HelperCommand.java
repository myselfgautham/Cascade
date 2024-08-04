package com.cascade.Helpers;

import java.util.HashMap;

public class HelperCommand {
    protected static HashMap<String, String> CommandsDocumentation = new HashMap<>();

    public static void RegisterCommands() {
        CommandsDocumentation.put("clear", "Clears The Screen / Terminal");
        CommandsDocumentation.put("exit", "Exits The Shell Session");
        CommandsDocumentation.put("help", "Prints The Documentation Of Available Commands");
    }

    public static void PrintHelpCommandsData() {
        System.out.println();
        for (String key : CommandsDocumentation.keySet()) {
            System.out.println(key + " => " + CommandsDocumentation.get(key));
        }
        System.out.println();
    }
}
