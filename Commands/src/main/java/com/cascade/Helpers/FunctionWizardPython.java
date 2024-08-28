package com.cascade.Helpers;

import com.cascade.Exceptions.FunctionExecutionFailed;

import java.nio.file.Files;
import java.nio.file.Path;
import java.util.HashMap;
import java.util.Scanner;

public class FunctionWizardPython {
    protected static String path;
    protected static HashMap<String, String> helper = null;
    public static void ExecutePythonFunction(String file, String interpreter) throws FunctionExecutionFailed {
        System.out.println();
        if (path == null) {
            if (System.getenv("CASCADE_FUNCTIONS") != null)
                path = System.getenv("CASCADE_FUNCTIONS");
            else {
                Scanner reader = new Scanner(System.in);
                System.out.print("Enter Function Path : ");
                path = reader.nextLine();
                System.out.println();
            }
        }
        try {
            Path tempFile = Files.createTempFile("PythonFunction", ".sh");
            Files.writeString(tempFile, "#!/usr/bin/bash\n" + "cd " + path + " || exit 1\n" + interpreter + " " + file);
            new ProcessBuilder("bash", tempFile.toAbsolutePath().toString())
                    .inheritIO().start().waitFor();
            Files.deleteIfExists(tempFile);
        } catch (Exception e) {
            throw new FunctionExecutionFailed("Python");
        }
    }
    public static void PrintHelp() {
        if (helper == null) {
            RegisterHelper();
        }
        System.out.println("\u001B[34mAvailable Functions\u001B[0m :=");
        System.out.println();
        for(String key : helper.keySet()) {
            System.out.print("    ");
            System.out.println(key + " => " + helper.get(key));
        }
        System.out.println();
    }
    private static void RegisterHelper() {
        helper = new HashMap<>();
        helper.put("revokeDevices", "Device Revocation Function");
        helper.put("cardMaintenance", "Card Maintenance Function");
        helper.put("fcmAndroid", "Firebase Cloud Messaging Function");
        helper.put("readNodes", "Nodes Reader Function");
        helper.put("registerNode", "Register Node Wizard");
    }
}