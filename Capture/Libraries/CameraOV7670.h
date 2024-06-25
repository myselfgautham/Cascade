#ifndef _CAMERA_OV7670_h_
#define _CAMERA_OV7670_h_

#include "Arduino.h"
#include "CameraOV7670Registers.h"

#if defined(__AVR_ATmega328P__) || defined(__AVR_ATmega168__)
#ifndef OV7670_VSYNC
#define OV7670_VSYNC (PIND & 0b00000100)
#endif
#ifndef OV7670_PIXEL_CLOCK
#define OV7670_PIXEL_CLOCK_PIN 12
#define OV7670_PIXEL_CLOCK (PINB & 0b00010000)
#endif
#ifndef OV7670_READ_PIXEL_BYTE
#define OV7670_READ_PIXEL_BYTE(b) \
                    uint8_t pinc=PINC;\
                    b=((PIND & 0b11110000) | (pinc & 0b00001111))
#endif

#ifndef OV7670_INIT_CLOCK_OUT
#define OV7670_INIT_CLOCK_OUT \
                    pinMode(3, OUTPUT); \
                    TCCR2A = _BV(COM2B1) | _BV(WGM21) | _BV(WGM20); \
                    TCCR2B = _BV(WGM22) | _BV(CS20); \
                    OCR2A = 1; \
                    OCR2B = 0
#endif
#endif

#if defined(__AVR_ATmega1280__) || defined(__AVR_ATmega2560__)

#ifndef OV7670_VSYNC
#define OV7670_VSYNC (PINE & 0b00010000)
#endif

#ifndef OV7670_PIXEL_CLOCK
#define OV7670_PIXEL_CLOCK_PIN 12
#define OV7670_PIXEL_CLOCK (PINB & 0b01000000)
#endif

#ifndef OV7670_READ_PIXEL_BYTE
#define OV7670_READ_PIXEL_BYTE(b) \
                    b=PINA;\
                    asm volatile("nop");\
                    asm volatile("nop");\
                    asm volatile("nop");\
                    asm volatile("nop")
#endif

#ifndef OV7670_INIT_CLOCK_OUT
#define OV7670_INIT_CLOCK_OUT \
                    pinMode(9, OUTPUT); \
                    TCCR2A = _BV(COM2B1) | _BV(WGM21) | _BV(WGM20); \
                    TCCR2B = _BV(WGM22) | _BV(CS20); \
                    OCR2A = 1; \
                    OCR2B = 0
#endif
#endif

#ifdef _VARIANT_ARDUINO_STM32_

#ifndef OV7670_INIT_INPUTS
#define OV7670_INIT_INPUTS \
              const int inputPins[]={PB3,PB4,PB5,PB8,PB9,PB10,PB11,PB12,PB13,PB14,PB15}; \
              for(int i=0;i<8;i++) { \
                pinMode(inputPins[i],INPUT); \
              }
#endif

#ifndef OV7670_VSYNC
#define OV7670_VSYNC ((*GPIOB_BASE).IDR & 0x0020)
#endif

#ifndef OV7670_PIXEL_CLOCK
#define OV7670_PIXEL_CLOCK ((*GPIOB_BASE).IDR & 0x0010)
#endif

#ifndef OV7670_HREF
#define OV7670_HREF ((*GPIOB_BASE).IDR & 0x0008)
#endif

#ifndef OV7670_READ_PIXEL_BYTE
#define OV7670_READ_PIXEL_BYTE(b) b = ((uint8_t*)(&(*GPIOB_BASE).IDR))[1]
#endif

#ifndef OV7670_INIT_CLOCK_OUT
#define OV7670_INIT_CLOCK_OUT \
                    gpio_set_mode(GPIOA, 8, GPIO_AF_OUTPUT_PP); \
                    *(volatile uint8_t *)(0x40021007) = 0x7
#endif
#endif

class CameraOV7670 {
public:
    enum PixelFormat {
        PIXEL_RGB565,
        PIXEL_BAYERRGB,
        PIXEL_YUV422
    };
    enum Resolution {
        RESOLUTION_VGA_640x480 = 640,
        RESOLUTION_QVGA_320x240 = 320,
        RESOLUTION_QQVGA_160x120 = 160
    };
    enum PLLMultiplier {
        PLL_MULTIPLIER_BYPASS = 0,
        PLL_MULTIPLIER_X4 = 1,
        PLL_MULTIPLIER_X6 = 2,
        PLL_MULTIPLIER_X8 = 3
    };
protected:
    static const uint8_t i2cAddress = 0x21;
    const Resolution resolution;
    PixelFormat pixelFormat;
    uint8_t internalClockPreScaler;
    PLLMultiplier pllMultiplier;
    CameraOV7670Registers registers;
    uint8_t verticalPadding = 0;
public:
    CameraOV7670(
        Resolution resolution,
        PixelFormat format,
        uint8_t internalClockPreScaler,
        PLLMultiplier pllMultiplier = PLL_MULTIPLIER_BYPASS
    ) :
        resolution(resolution),
        pixelFormat(format),
        internalClockPreScaler(internalClockPreScaler),
        pllMultiplier(pllMultiplier),
        registers(i2cAddress) {};

    bool init();
    bool setRegister(uint8_t addr, uint8_t val);
    uint8_t readRegister(uint8_t addr);
    void setRegisterBitsOR(uint8_t addr, uint8_t bits);
    void setRegisterBitsAND(uint8_t addr, uint8_t bits);
    void setManualContrastCenter(uint8_t center);
    void setContrast(uint8_t contrast);
    void setBrightness(uint8_t birghtness);
    void reversePixelBits();
    void showColorBars(bool transparent);

    inline void waitForVsync(void) __attribute__((always_inline));
    inline void waitForPixelClockRisingEdge(void) __attribute__((always_inline));
    inline void waitForPixelClockLow(void) __attribute__((always_inline));
    inline void waitForPixelClockHigh(void) __attribute__((always_inline));
    inline void ignoreHorizontalPaddingLeft(void) __attribute__((always_inline));
    inline void ignoreHorizontalPaddingRight(void) __attribute__((always_inline));
    inline void readPixelByte(uint8_t & byte) __attribute__((always_inline));
    virtual void ignoreVerticalPadding();
protected:
    virtual bool setUpCamera();
private:
    void initIO();
};

void CameraOV7670::waitForVsync() {
  while(!OV7670_VSYNC);
}

void CameraOV7670::waitForPixelClockRisingEdge() {
  waitForPixelClockLow();
  waitForPixelClockHigh();
}

void CameraOV7670::waitForPixelClockLow() {
  while(OV7670_PIXEL_CLOCK);
}

void CameraOV7670::waitForPixelClockHigh() {
  while(!OV7670_PIXEL_CLOCK);
}

void CameraOV7670::ignoreHorizontalPaddingLeft() {
  waitForPixelClockRisingEdge();
}

void CameraOV7670::ignoreHorizontalPaddingRight() {
  volatile uint16_t pixelTime = 0;
  waitForPixelClockRisingEdge();
  waitForPixelClockRisingEdge();
  while(OV7670_PIXEL_CLOCK) pixelTime++;
  while(!OV7670_PIXEL_CLOCK) pixelTime++;
  while(pixelTime) pixelTime--;
}

void CameraOV7670::readPixelByte(uint8_t & byte) {
  OV7670_READ_PIXEL_BYTE(byte);
}

#endif