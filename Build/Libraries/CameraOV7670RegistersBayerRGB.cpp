#include "CameraOV7670Registers.h"

const PROGMEM RegisterData CameraOV7670Registers::regsBayerRGB [] = {
    {REG_COM7, COM7_BAYER},
    {REG_COM13, 0x08},
    {REG_COM16, 0x3d},
    {REG_REG76, 0xe1},
    {0xff, 0xff},
};