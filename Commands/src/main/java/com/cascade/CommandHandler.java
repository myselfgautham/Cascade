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
                String path;
                if (System.getenv("CASCADE_SERVER") ==  null) {
                    Scanner reader = new Scanner(System.in);
                    System.out.print("Enter Server Program Path : ");
                    path = reader.nextLine();
                } else {
                    path = System.getenv("CASCADE_SERVER");
                }
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
            case "install docker" -> {
                System.out.println();
                switch (OperatingSystem.getOperatingSystemType()) {
                    case Linux -> {
                        ExecuteBashScriptHelper.Run("Linux/Install Docker.sh", "");
                    }
                    case Windows, MacOS -> {
                        throw new FeatureNotAvailableException();
                    }
                    default -> {
                        throw new UnsupportedOperatingSystemException();
                    }
                }
                System.out.println();
                Thread.sleep(1000);
                ShellCommands.ClearTerminal();
                if (MainShell.flags.get("ASCIIART") == null) {
                    ASCIIArt.PrintASCIIArtOnTerminal();
                }
            }
            case "install python3.12" -> {
                System.out.println();
                switch (OperatingSystem.getOperatingSystemType()) {
                    case Linux -> {
                        ExecuteBashScriptHelper.Run("Linux/Install Python.sh", "");
                    }
                    case MacOS, Windows -> {
                        throw new FeatureNotAvailableException();
                    }
                    default -> {
                        throw new UnsupportedOperatingSystemException();
                    }
                }
                System.out.println();
                Thread.sleep(1000);
                if (MainShell.flags.get("ASCIIART") == null) {
                    ASCIIArt.PrintASCIIArtOnTerminal();
                }
            }
            case "functions" -> {
                ShellCommands.ClearTerminal();
                System.out.println("\u001B[33mWelcome To Cascade Functions Wizard\u001B[0m");
                System.out.println();
                Scanner reader = new Scanner(System.in);
                System.out.print("\u001B[34mEnter Python Interpreter : \u001B[0m");
                String interpreter = reader.nextLine();
                if (!interpreter.contains("python")) {
                    interpreter = "python" + interpreter;
                }
                System.out.println("\n\u001B[33mType In @help For Help\u001B[0m");
                System.out.print("\u001B[31mEnter Function Name : \u001B[0m");
                String file = reader.nextLine();
                if (file.equals("@help")) {
                    ShellCommands.ClearTerminal();
                    FunctionWizardPython.PrintHelp();
                    System.out.println("\u001B[32mPress Enter To Continue\u001B[0m");
                    reader.nextLine();
                    ShellCommands.ClearTerminal();
                    if (MainShell.flags.get("ASCIIART") == null) {
                        ASCIIArt.PrintASCIIArtOnTerminal();
                    }
                    break;
                }
                switch (file) {
                    case "revokeDevices" -> {
                        file = "RevokeDevices.py";
                    }
                    case "cardMaintenance" -> {
                        file = "CardMaintenance.py";
                    }
                    case "fcmAndroid" -> {
                        file = "CloudMessaging.py";
                    }
                    case "readNodes" -> {
                        file = "ReadNodes.py";
                    }
                    case "registerNode" -> {
                        file = "RegisterNodeFactory.py";
                    }
                    default -> {}
                }
                ShellCommands.ClearTerminal();
                FunctionWizardPython.ExecutePythonFunction(file, interpreter);
                System.out.println("\u001B[32mPress Enter To Continue\u001B[0m");
                reader.nextLine();
                ShellCommands.ClearTerminal();
                if (MainShell.flags.get("ASCIIART") == null) {
                    ASCIIArt.PrintASCIIArtOnTerminal();
                }
            }
            case "run server -enterprise" -> {
                String path;
                if (System.getenv("CASCADE_SERVER_ENTERPRISE") ==  null) {
                    Scanner reader = new Scanner(System.in);
                    System.out.print("Enter Server Program Path : ");
                    path = reader.nextLine();
                } else {
                    path = System.getenv("CASCADE_SERVER_ENTERPRISE");
                }
                switch (OperatingSystem.getOperatingSystemType()) {
                    case Linux -> {
                        ExecuteBashScriptHelper.Run("Linux/Enterprise Server.sh", path);
                    }
                    case Windows, MacOS -> {
                        throw new FeatureNotAvailableException();
                    }
                    default -> throw new UnsupportedOperatingSystemException();
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