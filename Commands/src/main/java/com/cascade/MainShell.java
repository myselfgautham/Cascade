package com.cascade;

import com.cascade.Exceptions.UnsupportedOperatingSystemException;
import com.cascade.Helpers.OperatingSystem;
import com.cascade.Helpers.ASCIIArt;
import com.cascade.Helpers.OperatingSystems;
import com.cascade.Helpers.ShellCommands;

import java.util.HashMap;
import java.util.Scanner;

public class MainShell {
    public static void main(String[] args) throws Exception {
        HashMap<String, Boolean> flags = new HashMap<>();
        try (Scanner reader = new Scanner(System.in)) {
            if (OperatingSystem.getOperatingSystemType().equals(OperatingSystems.Other)) {
                throw new UnsupportedOperatingSystemException();
            }
            for (String argument : args) {
                switch (argument) {
                    case ("-verbose"):
                        flags.put("Verbose", true);
                    default:
                }
            }
            ShellCommands.ClearTerminal();
            ASCIIArt.PrintASCIIArtOnTerminal();
            while (true) {
                System.out.print("\u001B[32m" + OperatingSystem.getOperatingSystemType() + "\u001B[0m" + " \u001B[34m@\u001B[0m ");
                System.out.print(System.getProperty("user.dir"));
                System.out.print(" \u001B[31m$\u001B[0m ");
                String command = reader.nextLine();
                CommandHandler.HandleCommand(command);
            }
        } catch (Exception e) {
            System.out.println();
            if (flags.get("Verbose") != null)
                e.printStackTrace();
            System.out.println("\u001B[31m" + e.getMessage() + "\u001B[0m");
            System.out.println();
        }
    }
}