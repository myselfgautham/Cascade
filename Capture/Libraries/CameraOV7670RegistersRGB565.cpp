#include "CameraOV7670Registers.h"

const PROGMEM RegisterData CameraOV7670Registers::regsRGB565 [] = {
    {REG_COM7, COM7_RGB},
    {REG_RGB444, 0},	 
    {REG_COM1, 0x0},
    {REG_COM15, COM15_RGB565|COM15_R00FF},
    {REG_COM9, 0x6A},	
    {0x4f, 0xb3},		
    {0x50, 0xb3},		
    {0x51, 0},		
    {0x52, 0x3d},		
    {0x53, 0xa7},		
    {0x54, 0xe4},		
    {REG_COM13,COM13_UVSAT},
    {0xff, 0xff}
};