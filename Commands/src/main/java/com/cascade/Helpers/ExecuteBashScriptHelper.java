package com.cascade.Helpers;

import com.cascade.Exceptions.BashExecutionFailedException;

import java.io.InputStream;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;

public class ExecuteBashScriptHelper {
    public static void Run(String name, String arg) throws BashExecutionFailedException {
        Runtime.getRuntime().addShutdownHook(new Thread(() -> {}));
        try {
            File scriptFile = extractScript(name);
            scriptFile.setExecutable(true);
            runScriptWithInterruptHandling(scriptFile, arg);
        } catch (IOException e) {
            throw new BashExecutionFailedException();
        }
    }

    private static File extractScript(String resourcePath) throws IOException {
        ClassLoader classLoader = ExecuteBashScriptHelper.class.getClassLoader();
        try (InputStream inputStream = classLoader.getResourceAsStream(resourcePath)) {
            if (inputStream == null) {
                throw new IOException("Resource Not Found: " + resourcePath);
            }
            Path tempFilePath = Files.createTempFile("script", ".sh");
            File tempFile = tempFilePath.toFile();
            Files.copy(inputStream, tempFilePath, StandardCopyOption.REPLACE_EXISTING);
            return tempFile;
        }
    }

    private static void runScriptWithInterruptHandling(File scriptFile, String argument) throws IOException {
        ProcessBuilder processBuilder = new ProcessBuilder("/bin/bash", scriptFile.getAbsolutePath(), argument);
        processBuilder.redirectErrorStream(true);
        Process process = processBuilder.start();
        Thread processThread = new Thread(() -> {
            try (InputStream inputStream = process.getInputStream()) {
                int byteRead;
                while ((byteRead = inputStream.read()) != -1) {
                    System.out.print((char) byteRead);
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
        });
        processThread.start();
        try {
            int exitCode = process.waitFor();
            processThread.join();
            System.out.println("Script Exited With Code " + exitCode);
        } catch (InterruptedException e) {
            System.out.println("Process Interrupted");
            process.destroy();
            try {
                process.waitFor();
            } catch (InterruptedException ie) {
                Thread.currentThread().interrupt();
            }
            processThread.interrupt();
        }
    }
}