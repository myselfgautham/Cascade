#ifndef _OV7670REGISERDEFINITIONS_H
#define _OV7670REGISERDEFINITIONS_H

struct RegisterData {
  uint8_t addr;
  uint8_t val;
};

#define REG_GAIN	0x00
#define REG_BLUE	0x01
#define REG_RED		0x02
#define REG_VREF	0x03
#define REG_COM1	0x04
#define COM1_CCIR656	0x40
#define REG_BAVE	0x05
#define REG_GbAVE	0x06
#define REG_AECHH	0x07
#define REG_RAVE	0x08
#define REG_COM2	0x09
#define COM2_SSLEEP	0x10
#define REG_PID		0x0a
#define REG_VER		0x0b
#define REG_COM3	0x0c
#define COM3_SWAP	0x40
#define COM3_SCALEEN	0x08
#define COM3_DCWEN	0x04
#define REG_COM4	0x0d
#define REG_COM5	0x0e
#define REG_COM6	0x0f
#define COM6_HREF_HB 0x80
#define REG_AECH	0x10
#define REG_CLKRC	0x11
#define CLK_EXT		0x40
#define CLK_SCALE	0x3f
#define REG_COM7	0x12
#define COM7_RESET	0x80
#define COM7_FMT_MASK	0x38
#define COM7_FMT_VGA	0x00
#define	COM7_FMT_CIF	0x20
#define COM7_FMT_QVGA	0x10
#define COM7_FMT_QCIF	0x08
#define	COM7_RGB	0x04
#define	COM7_YUV	0x00
#define	COM7_BAYER	0x01
#define	COM7_COLOR_BAR	0x02
#define	COM7_PBAYER	0x05
#define REG_COM8	0x13
#define COM8_FASTAEC	0x80
#define COM8_AECSTEP	0x40
#define COM8_BFILT	0x20
#define COM8_AGC	0x04
#define COM8_AWB	0x02
#define COM8_AEC	0x01
#define REG_COM9	0x14
#define REG_COM10	0x15
#define COM10_HSYNC	0x40
#define COM10_PCLK_HB	0x20
#define COM10_PCLK_REV	0x10
#define COM10_HREF_REV	0x08
#define COM10_VS_LEAD	0x04
#define COM10_VS_NEG	0x02
#define COM10_HS_NEG	0x01
#define REG_HSTART	0x17
#define REG_HSTOP	0x18
#define REG_VSTART	0x19
#define REG_VSTOP	0x1a
#define REG_PSHFT	0x1b
#define REG_MIDH	0x1c
#define REG_MIDL	0x1d
#define REG_MVFP	0x1e
#define MVFP_MIRROR	0x20
#define MVFP_FLIP	0x10

#define REG_AEW		0x24
#define REG_AEB		0x25
#define REG_VPT		0x26
#define REG_HSYST	0x30
#define REG_HSYEN	0x31
#define REG_HREF	0x32
#define REG_TSLB	0x3a
#define TSLB_YLAST	0x04
#define REG_COM11	0x3b
#define COM11_NIGHT	0x80
#define COM11_NMFR	0x60
#define COM11_HZAUTO	0x10
#define	COM11_50HZ	0x08
#define COM11_EXP	0x02
#define REG_COM12	0x3c
#define COM12_HREF	0x80
#define REG_COM13	0x3d
#define COM13_GAMMA	0x80
#define	COM13_UVSAT	0x40
#define COM13_UVSWAP	0x01
#define REG_COM14	0x3e
#define SCALING_DCWCTR	0x72
#define SCALING_PCLK_DIV 0x73
#define COM14_DCWEN	0x10
#define REG_EDGE	0x3f
#define REG_COM15	0x40
#define COM15_R10F0	0x00
#define	COM15_R01FE	0x80
#define COM15_R00FF	0xc0
#define COM15_RGB565	0x10
#define COM15_RGB555	0x30
#define REG_COM16	0x41
#define COM16_AWBGAIN	0x08
#define REG_COM17	0x42
#define COM17_AECWIN	0xc0
#define COM17_CBAR	0x08

#define	REG_CMATRIX_BASE0x4f
#define CMATRIX_LEN 6
#define REG_CMATRIX_SIGN0x58
#define REG_BRIGHT	0x55
#define REG_CONTRAS	0x56
#define REG_CONTRAST_CENTER	0x57
#define REG_GFIX	0x69
#define REG_REG76	0x76
#define R76_BLKPCOR	0x80
#define R76_WHTPCOR	0x40
#define REG_RGB444	0x8c
#define R444_ENABLE	0x02
#define R444_RGBX	0x01
#define REG_HAECC1	0x9f
#define REG_HAECC2	0xa0
#define REG_BD50MAX	0xa5
#define REG_HAECC3	0xa6
#define REG_HAECC4	0xa7
#define REG_HAECC5	0xa8
#define REG_HAECC6	0xa9
#define REG_HAECC7	0xaa
#define REG_BD60MAX	0xab
#define COM7_FMT_CIF	0x20
#define COM7_RGB	0x04
#define COM7_YUV	0x00
#define COM7_BAYER	0x01
#define COM7_PBAYER	0x05
#define COM10_VS_LEAD 	0x04
#define COM11_50HZ	0x08
#define COM13_UVSAT	0x40
#define COM15_R01FE	0x80
#define MTX1		0x4f
#define MTX2		0x50
#define MTX3		0x51
#define MTX4		0x52
#define MTX5		0x53
#define MTX6		0x54
#define MTXS		0x58
#define AWBC7		0x59
#define AWBC8		0x5a
#define AWBC9		0x5b
#define AWBC10		0x5c
#define AWBC11		0x5d
#define AWBC12		0x5e
#define REG_GFI		0x69
#define GGAIN		0x6a
#define DBLV		0x6b
#define AWBCTR3		0x6c
#define AWBCTR2		0x6d
#define AWBCTR1		0x6e
#define AWBCTR0		0x6f

#endif