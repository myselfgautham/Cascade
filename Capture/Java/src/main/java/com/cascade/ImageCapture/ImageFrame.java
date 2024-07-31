package com.cascade.ImageCapture;

import java.awt.*;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

public class ImageFrame
{
    private Pixel[][] PixelMatrix;
    private int lineIndex;
    private int columnIndex;
    private Runnable lineCaptured;

    public ImageFrame(int width, int height, Runnable lineCaptured)
    {
        PixelMatrix = new Pixel[height][width];
        lineIndex = 0;
        columnIndex = 0;
        this.lineCaptured = lineCaptured;
    }

    public int getLineCount() { return  PixelMatrix.length; }
    public void startNewLine() {
        lineCaptured.run();
        if (lineIndex < getLineCount()) {
            lineIndex++;
        }
        columnIndex = 0;
    }

    public void addPixel(Pixel pixel) {
        if (lineIndex < PixelMatrix.length) {
            PixelMatrix[lineIndex][columnIndex] = pixel;
            columnIndex++;
        }
        if (columnIndex >= PixelMatrix[lineIndex].length)
        {
            startNewLine();
        }
    }

    public void addPixels(List<Pixel> pixels) {
        for (Pixel pixel : pixels) {
            addPixel(pixel);
        }
    }

    public int getLineLength() { return PixelMatrix.length > 0 ? PixelMatrix[0].length : 0; }
    public int getCurrentLineIndex() { return lineIndex; }
    public int getCurrentColumnIndex() { return columnIndex; }

    private Pixel getPixel(int x, int y) {
        return x >= 0 && x < getLineLength() && y >= 0 && y < getLineCount() ? PixelMatrix[y][x] : null;
    }

    public void fixPixel(Pixel pixel, int x, int y) {
        Collection<Pixel> surroundingPixels = new ArrayList<>();
        Pixel top = getPixel(x, y);
        if (top != null) surroundingPixels.add(top);
        Pixel bottom = getPixel(x, y + 1);
        if (bottom != null) surroundingPixels.add(bottom);
        Pixel leftPixel = getPixel(x-1, y);
        if (leftPixel != null) surroundingPixels.add(leftPixel);
        Pixel rightPixel = getPixel(x+1, y);
        if (rightPixel != null) surroundingPixels.add(rightPixel);
        pixel.fixColors(surroundingPixels);
    }

    public Color getPixelColor(int x, int y)
    {
        Pixel pixel = getPixel(x, y);
        if (pixel != null) {
            if (pixel.hasInvalidColors()) {
                fixPixel(pixel, x, y);
            }
            return pixel.getColor();
        } else {
            return Color.BLACK;
        }
    }
}