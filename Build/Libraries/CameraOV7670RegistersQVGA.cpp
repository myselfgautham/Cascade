#include "CameraOV7670Registers.h"

const uint8_t CameraOV7670Registers::QVGA_VERTICAL_PADDING = 5;
const uint16_t vstart = 0;
const uint16_t vstop = 240 + CameraOV7670Registers::QVGA_VERTICAL_PADDING;

const uint16_t hstart = 174;
const uint16_t hstop = 34;

const PROGMEM RegisterData CameraOV7670Registers::regsQVGA [] = {
    {REG_VSTART,vstart >> 1},
    {REG_VSTOP,vstop >> 1},
    {REG_VREF,((vstart & 0b1) << 1) | ((vstop & 0b1) << 3)},
    {REG_HSTART,hstart >> 3},
    {REG_HSTOP,hstop >> 3},
    {REG_HREF,0b00000000 | (hstart & 0b111) | ((hstop & 0b111) << 3)},

    {REG_COM3, COM3_DCWEN}, 
    {REG_COM14, 0x19},        
    {SCALING_DCWCTR, 0x11},   
    {SCALING_PCLK_DIV, 0xf1}, 

    {0xff, 0xff},
};