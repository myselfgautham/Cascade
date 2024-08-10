package com.cascade;

import com.cascade.Exceptions.InvalidCommandException;
import com.cascade.Exceptions.PythonTestsFailedException;
import com.cascade.Exceptions.ShellExitException;
import com.cascade.Helpers.ASCIIArt;
import com.cascade.Helpers.HelperCommand;
import com.cascade.Helpers.PythonTest;
import com.cascade.Helpers.ShellCommands;

import java.io.*;

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
                ASCIIArt.PrintASCIIArtOnTerminal();
            }
            case "test dependencies" -> {
                try {
                    System.out.println();
                    File tempFile = File.createTempFile("Tests", ".py");
                    tempFile.deleteOnExit();
                    try (PrintWriter writer = new PrintWriter(new FileWriter(tempFile))) {
                        writer.println(PythonTest.pythonTest);
                    }
                    ProcessBuilder processBuilder = new ProcessBuilder("python", tempFile.getAbsolutePath());
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
            default -> throw new InvalidCommandException();
        }
    }
}