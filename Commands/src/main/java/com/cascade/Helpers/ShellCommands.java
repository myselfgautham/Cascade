package com.cascade.Helpers;

public class ShellCommands {
    public static void ClearTerminal() throws Exception {
        if (OperatingSystem.getOperatingSystemType().equals(OperatingSystems.Windows)) {
            new ProcessBuilder("cmd", "/c", "cls")
                    .inheritIO()
                    .start()
                    .waitFor();
        } else {
            new ProcessBuilder("clear")
                    .inheritIO()
                    .start()
                    .waitFor();
        }
    }
}