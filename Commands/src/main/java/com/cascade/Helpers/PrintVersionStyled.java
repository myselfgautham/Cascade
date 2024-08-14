package com.cascade.Helpers;

import java.util.Locale;

public class PrintVersionStyled {
    private static final String VERSION = "v1.0 \u001B[33mBeta\u001B[0m";
    private static final String DEVELOPER = "Cascade Systems";
    public static void PrintVersion() {
        System.out.println();
        System.out.println("\u001B[34mCascade Server Shell Program \u001B[0m");
        System.out.println("Version : " + VERSION);
        System.out.println("Developed By : " + DEVELOPER);
        System.out.println("Running On : " + OperatingSystem.getOperatingSystemType());
        System.out.println("Region : " + Locale.getDefault().getCountry());
    }
}