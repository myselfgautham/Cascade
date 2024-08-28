package com.cascade.Exceptions;

public class FunctionExecutionFailed extends Exception {
    public FunctionExecutionFailed(String lang) {
        super(lang + " Function Failed To Complete");
    }
}