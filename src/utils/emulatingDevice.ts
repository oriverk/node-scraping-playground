import { Viewport } from 'puppeteer';

export type EmulateDevice = {
  name?: string;
  userAgent: string;
  viewport: Viewport;
};

export const macPC: EmulateDevice = {
  name: 'Chrome Mac',
  userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.132 Safari/537.36',
  viewport: {
    width: 1200,
    height: 800,
    deviceScaleFactor: 1,
    isMobile: false,
    hasTouch: false,
    isLandscape: false,
  },
};

export const winPC: EmulateDevice = {
  name: 'Windows',
  userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3864.0',
  viewport: {
    width: 1024,
    height: 820,
    deviceScaleFactor: 1,
    isMobile: false,
    hasTouch: false,
    isLandscape: false,
  },
};
