package com.cascade.Exceptions;
public class ShellExitException extends Exception {
    public ShellExitException(String Message) {
        super("Shell Exited Due To " + Message);
    }
}