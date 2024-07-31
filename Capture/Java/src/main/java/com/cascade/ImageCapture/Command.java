package com.cascade.ImageCapture;

import java.io.ByteArrayOutputStream;

public class Command {
    private static final int SUPPORTED_COMMAND_VERSION = 0x10;
    private static final int COMMAND_MASK = 0b00001111;

    private static final byte COMMAND_NEW_FRAME = (byte) 0x01;
    private static final byte COMMAND_DEBUG_DATA = (byte) 0x03;

    private int commandDataLength = -1;
    protected ByteArrayOutputStream commandBytes = new ByteArrayOutputStream();

    private ImageCapture imageCapture;

    public Command(ImageCapture imageCapture) {
        this.imageCapture = imageCapture;
    }

    public void addByte(byte receivedByte) {
        if (commandDataLength < 0) {
            commandDataLength = (receivedByte & 0xFF);
        } else {
            commandBytes.write(receivedByte);
        }
    }

    public boolean process() {
        if (commandDataLength < 0) {
            return false;
        }
        if (commandBytes.size() < (commandDataLength + 1)) {
            return false;
        }
        byte[] receivedCommandData = commandBytes.toByteArray();
        if (!isChecksumValid(receivedCommandData)) {
            imageCapture.printDebugData("" +
                    "Command Checksum Failed!\n" +
                    "1. Check Device Baud Rate\n" +
                    "2. Use Latest Versions Of The Code");
            return true;
        }
        if (commandDataLength == 0) {
            imageCapture.printDebugData("Received Empty Command");
            return true;
        }
        int commandByte = receivedCommandData[0];
        int commandCode = commandByte & COMMAND_MASK;
        int commandVersion = commandByte & ~COMMAND_MASK;
        if (commandVersion != SUPPORTED_COMMAND_VERSION) {
            imageCapture.printDebugData("" +
                    "Received Command Version 0x" + Integer.toHexString(commandVersion) + ". Supported Command Version 0x" + Integer.toHexString(SUPPORTED_COMMAND_VERSION) + ".\n" +
                    "Please Download Latest Version Of Programs");
        }
        processReceivedCommand(commandCode, receivedCommandData);
        return true;
    }

    private boolean isChecksumValid(byte[] receivedCommandData) {
        int checksum = 0;
        for (int i = 0; i < commandDataLength; i++) {
            checksum ^= receivedCommandData[i];
        }
        return checksum == receivedCommandData[commandDataLength];
    }

    private void processReceivedCommand(int commandCode, byte[] receivedCommandData) {
        switch (commandCode) {
            case COMMAND_NEW_FRAME:
                new CommandNewFrameAction(imageCapture, receivedCommandData, commandDataLength).process();
                return;
            case COMMAND_DEBUG_DATA:
                new DebugDataAction(imageCapture, receivedCommandData, commandDataLength).process();
                return;
            default:
                imageCapture.printDebugData("Unknown Command Code : " + commandCode);
                return;
        }
    }
}