package com.cascade.ImageCapture;

import java.awt.*;
import java.util.ArrayList;
import java.util.Collection;

public class Pixel
{
    private int red = -1;
    private int green = -1;
    private int blue = -1;

    public Pixel() {}
    public Pixel(int red, int green, int blue) {
        this.red = red;
        this.green = green;
        this.blue = blue;
    }

    public void invalidateR() {
        this.red = -1;
    }
    public void invalidateG() {
        this.green = -1;
    }
    public void invalidateB() {
        this.blue = -1;
    }

    public Color getColor() {
        return new Color(Math.max(red, 0), Math.max(green, 0), Math.max(blue, 0));
    }
    public boolean hasInvalidColors() {
        return (red < 0) || (green < 0) || (blue < 0);
    }

    private int averageColor(Collection<Integer> surroundingColors) {
        if (surroundingColors.isEmpty()) {
            return 0;
        }
        Integer counter = 0;
        for (Integer colorValue : surroundingColors) {
            counter += colorValue;
        }
        return (counter /  surroundingColors.size());
    }

    public void fixColors(Collection<Pixel> surroundingPixelUnits) {
        Collection<Integer> surroundingR = new ArrayList<>();
        Collection<Integer> surroundingG = new ArrayList<>();
        Collection<Integer> surroundingB = new ArrayList<>();

        for (Pixel surroundingPixel : surroundingPixelUnits) {
            surroundingR.add(surroundingPixel.red);
            surroundingG.add(surroundingPixel.green);
            surroundingB.add(surroundingPixel.blue);
        }

        red = averageColor(surroundingR);
        green = averageColor(surroundingG);
        blue = averageColor(surroundingB);
    }
}