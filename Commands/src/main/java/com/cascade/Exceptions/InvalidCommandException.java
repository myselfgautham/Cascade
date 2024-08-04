package com.cascade.Exceptions;

public class InvalidCommandException extends Exception {
    public InvalidCommandException() {
        super("Invalid Command Entered");
    }
}