package com.cascade.Exceptions;

public class PackageInstallerException extends Exception {
    public PackageInstallerException() {
        super("Failed To Install Python Packages");
    }
}