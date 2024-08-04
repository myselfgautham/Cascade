package com.cascade;

import com.cascade.Exceptions.UnsupportedOperatingSystemException;
import com.cascade.Helpers.OperatingSystem;
import com.cascade.Helpers.ASCIIArt;
import com.cascade.Helpers.OperatingSystems;
import com.cascade.Helpers.ShellCommands;

import java.util.Scanner;

public class MainShell {
    public static void main(String[] args) throws Exception {
        Scanner reader = new Scanner(System.in);
        ShellCommands.ClearTerminal();
        try {
            if (OperatingSystem.getOperatingSystemType().equals(OperatingSystems.Other)) {
                throw new UnsupportedOperatingSystemException();
            }
            ASCIIArt.PrintASCIIArtOnTerminal();
            while (true) {
                System.out.print("\u001B[32m" + OperatingSystem.getOperatingSystemType() +"\u001B[0m" + " \u001B[34m@\u001B[0m ");
                System.out.print(System.getProperty("user.dir"));
                System.out.print(" \u001B[31m$\u001B[0m ");
                String command = reader.nextLine();
                CommandHandler.HandleCommand(command);
            }
        } catch (Exception e) {
            System.out.println();
            for (String arg : args) {
                if (arg.equals("-verbose")) {
                    e.printStackTrace();
                    break;
                }
            }
            System.out.println("\u001B[31m"+e.getMessage()+"\u001B[0m");
            System.out.println();
        }
        reader.close();
    }
}