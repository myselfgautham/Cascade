package com.cascade.Exceptions;

public class PythonTestsFailedException extends Exception {
    public PythonTestsFailedException(String message) {
        super("Python Tests For " + message + " Failed");
    }
}
