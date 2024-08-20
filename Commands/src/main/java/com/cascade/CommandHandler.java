package com.cascade;

import com.cascade.Exceptions.*;
import com.cascade.Helpers.*;

import java.io.*;
import java.util.Scanner;

public class CommandHandler {
    public static void HandleCommand(String command) throws Exception {
        switch (command) {
            case "help" -> {
                HelperCommand.RegisterCommands();
                HelperCommand.PrintHelpCommandsData();
            }
            case "exit" -> throw new ShellExitException("Exit Command");
            case "clear" -> {
                ShellCommands.ClearTerminal();
                if (MainShell.flags.get("ASCIIART") == null) {
                    ASCIIArt.PrintASCIIArtOnTerminal();
                }
            }
            case "test dependencies" -> {
                try {
                    String interpreter = "";
                    if (OperatingSystem.getOperatingSystemType() == OperatingSystems.Linux) {
                        Scanner reader = new Scanner(System.in);
                        System.out.println();
                        System.out.print("\u001B[34mEnter Python Version : \u001B[0m");
                        interpreter = "python" + reader.nextLine();
                    } else {
                        interpreter = "python";
                    }
                    if (OperatingSystem.getOperatingSystemType() != OperatingSystems.Linux) {
                        System.out.println();
                    }
                    File tempFile = File.createTempFile("Tests", ".py");
                    tempFile.deleteOnExit();
                    try (PrintWriter writer = new PrintWriter(new FileWriter(tempFile))) {
                        writer.println(PythonTest.pythonTest);
                    }
                    ProcessBuilder processBuilder = new ProcessBuilder(interpreter, tempFile.getAbsolutePath());
                    processBuilder.redirectErrorStream(true);
                    Process process = processBuilder.start();
                    try (BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()))) {
                        String line;
                        while ((line = reader.readLine()) != null) {
                            System.out.println(line);
                        }
                    }
                    process.waitFor();
                } catch (IOException | InterruptedException e) {
                    throw new PythonTestsFailedException("Dependencies");
                } finally {
                    System.out.println();
                }
            }
            case "version" -> {
                PrintVersionStyled.PrintVersion();
                System.out.println();
            }
            case "run server" -> {
                Scanner reader = new Scanner(System.in);
                System.out.print("Enter Server Program Path : ");
                String path = reader.nextLine();
                switch (OperatingSystem.getOperatingSystemType()) {
                    case Linux -> {
                        ExecuteBashScriptHelper.Run("Linux/Run Server.sh", path);
                    }
                    case Windows, MacOS -> {
                        throw new FeatureNotAvailableException();
                    }
                    default -> throw new UnsupportedOperatingSystemException();
                }
            }
            case "install dependencies --client" -> {
                System.out.println();
                switch (OperatingSystem.getOperatingSystemType()) {
                    case Linux -> {
                        ExecuteBashScriptHelper.Run("Linux/Install Dependencies Client.sh", "");
                    }
                    case Windows, MacOS -> {
                        throw new FeatureNotAvailableException();
                    }
                    default -> throw new UnsupportedOperatingSystemException();
                }
                System.out.println();
                Thread.sleep(1000);
                ShellCommands.ClearTerminal();
                if (MainShell.flags.get("ASCIIART") == null) {
                    ASCIIArt.PrintASCIIArtOnTerminal();
                }
            }
            case "install dependencies --enterprise" -> {
                System.out.println();
                switch (OperatingSystem.getOperatingSystemType()) {
                    case Linux -> {
                        ExecuteBashScriptHelper.Run("Linux/Install Dependencies Enterprise.sh", "");
                    }
                    case Windows, MacOS -> {
                        throw new FeatureNotAvailableException();
                    }
                    default -> throw new UnsupportedOperatingSystemException();
                }
                System.out.println();
                Thread.sleep(1000);
                ShellCommands.ClearTerminal();
                if (MainShell.flags.get("ASCIIART") == null) {
                    ASCIIArt.PrintASCIIArtOnTerminal();
                }
            }
            default -> {
                if (MainShell.flags.get("Safe Mode") == null) {
                    throw new InvalidCommandException();
                } else {
                    System.out.println();
                    System.out.println("\u001B[31m" + "Invalid Command Entered" + "\u001B[0m");
                    System.out.println();
                }
            }
        }
    }
}