#include "CameraOV7670Registers.h"

const uint8_t CameraOV7670Registers::QQVGA_VERTICAL_PADDING = 2;
const uint16_t vstart = 0;
const uint16_t vstop = 120 + CameraOV7670Registers::QQVGA_VERTICAL_PADDING;

const uint16_t hstart = 182;
const uint16_t hstop = 46;

const PROGMEM RegisterData CameraOV7670Registers::regsQQVGA [] = {
    {REG_VSTART,vstart},
    {REG_VSTOP,vstop},
    {REG_VREF,0},
    {REG_HSTART,hstart >> 3},
    {REG_HSTOP,hstop >> 3},
    {REG_HREF,0b00000000 | (hstart & 0b111) | ((hstop & 0b111) << 3)},

    {REG_COM3, COM3_DCWEN}, 
    {REG_COM14, 0x1a},        
    {SCALING_DCWCTR, 0x22},   
    {SCALING_PCLK_DIV, 0xf2}, 

    {0xff, 0xff},
};