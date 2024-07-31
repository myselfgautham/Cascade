#include "CameraOV7670Registers.h"

const PROGMEM RegisterData CameraOV7670Registers::regsYUV422 [] = {
    {REG_COM7, 0x0},
    {REG_RGB444, 0},
    {REG_COM1, 0},
    {REG_COM15, COM15_R00FF},
    {REG_COM9, 0x6A},
    {0x4f, 0x80},	
    {0x50, 0x80},	
    {0x51, 0},	
    {0x52, 0x22},	
    {0x53, 0x5e},	
    {0x54, 0x80},	
    {REG_COM13,COM13_UVSAT},
    {0xff, 0xff},
};