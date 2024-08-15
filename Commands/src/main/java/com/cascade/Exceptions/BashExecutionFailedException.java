package com.cascade.Exceptions;

public class BashExecutionFailedException extends Exception {
    public BashExecutionFailedException() {
        super("Bash Script Execution Failed");
    }
}