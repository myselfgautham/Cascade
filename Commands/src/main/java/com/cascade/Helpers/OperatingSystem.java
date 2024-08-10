package com.cascade.Helpers;

import java.util.Locale;

public class OperatingSystem {
    protected static OperatingSystems detectedOS;
    public static OperatingSystems getOperatingSystemType() {
        if (detectedOS == null) {
            String OS = System.getProperty("os.name", "generic")
                    .toLowerCase(Locale.ENGLISH);
            if ((OS.contains("mac")) || (OS.contains("darwin"))) {
                detectedOS = OperatingSystems.MacOS;
            } else if (OS.contains("win")) {
                detectedOS = OperatingSystems.Windows;
            } else if (OS.contains("nux")) {
                detectedOS = OperatingSystems.Linux;
            } else {
                detectedOS = OperatingSystems.Other;
            }
        }
        return detectedOS;
    }
}