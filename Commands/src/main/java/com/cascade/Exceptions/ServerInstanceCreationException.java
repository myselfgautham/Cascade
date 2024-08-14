package com.cascade.Exceptions;

public class ServerInstanceCreationException extends Exception {
    public ServerInstanceCreationException() {
        super("Failed To Create Server Instance On Local Machine");
    }
}