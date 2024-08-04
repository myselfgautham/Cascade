package com.cascade.Helpers;

import java.util.Locale;

public class OperatingSystem {
    protected static OperatingSystems detectedOS;
    public static OperatingSystems getOperatingSystemType() {
        if (detectedOS == null) {
            String OS = System.getProperty("os.name", "generic")
                    .toLowerCase(Locale.ENGLISH);
            if ((OS.indexOf("mac") >= 0) || (OS.indexOf("darwin") >= 0)) {
                detectedOS = OperatingSystems.MacOS;
            } else if (OS.indexOf("win") >= 0) {
                detectedOS = OperatingSystems.Windows;
            } else if (OS.indexOf("nux") >= 0) {
                detectedOS = OperatingSystems.Linux;
            } else {
                detectedOS = OperatingSystems.Other;
            }
        }
        return detectedOS;
    }
}