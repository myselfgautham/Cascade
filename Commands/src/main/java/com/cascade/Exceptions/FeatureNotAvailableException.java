package com.cascade.Exceptions;

import com.cascade.Helpers.OperatingSystem;

public class FeatureNotAvailableException extends Exception {
    public FeatureNotAvailableException() {
        super("Feature Not Yet Implemented In " + OperatingSystem.getOperatingSystemType());
    }
}