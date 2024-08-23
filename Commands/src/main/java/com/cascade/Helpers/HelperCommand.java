package com.cascade.Helpers;

import java.util.HashMap;

public class HelperCommand {
    protected static HashMap<String, String> CommandsDocumentation = new HashMap<>();
    protected static HashMap<String, String> FlagsDocumentation = new HashMap<>();

    public static void RegisterCommands() {
        CommandsDocumentation.put("clear", "Clears The Screen / Terminal");
        CommandsDocumentation.put("exit", "Exits The Shell Session");
        CommandsDocumentation.put("help", "Prints The Documentation Of Available Commands");
        CommandsDocumentation.put("test dependencies", "Tests The Required Python Dependencies");
        CommandsDocumentation.put("version", "Print Version Information");
        CommandsDocumentation.put("run server", "Executes The Server Program");
        CommandsDocumentation.put("install dependencies --client", "Install Dependencies For Client Server Program");
        CommandsDocumentation.put("install dependencies --enterprise", "Install Dependencies For Enterprise Server Program");
        CommandsDocumentation.put("install docker", "Installs Docker On Local Machine");
        RegisterFlags();
    }

    private static void RegisterFlags() {
        FlagsDocumentation.put("-verbose", "Added Stack Trace Logging");
        FlagsDocumentation.put("-noAsciiArt", "Disables ASCII Art Printing");
        FlagsDocumentation.put("--version", "Prints The Version And Exits");
        FlagsDocumentation.put("-safe", "Toggle Safe Mode For The Shell");
        FlagsDocumentation.put("--installDependenciesClient", "Installs Client Server Dependencies And Exits");
        FlagsDocumentation.put("--installDependenciesEnterprise", "Installs Enterprise Server Dependencies And Exits");
        FlagsDocumentation.put("--setupFunctions", "Installs Dependencies For The Python Functions");
    }

    public static void PrintHelpCommandsData() {
        System.out.println();
        System.out.println("\u001B[34mCommands\u001B[0m :=");
        System.out.println();
        for (String key : CommandsDocumentation.keySet()) {
            System.out.print("    ");
            System.out.println(key + " => " + CommandsDocumentation.get(key));
        }
        System.out.println();
        System.out.println("\u001B[31mFlags\u001B[0m :=");
        System.out.println();
        for(String key : FlagsDocumentation.keySet()) {
            System.out.print("    ");
            System.out.println(key + " => " + FlagsDocumentation.get(key));
        }
        System.out.println();
    }
}
