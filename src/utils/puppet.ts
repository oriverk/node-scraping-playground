import puppeteer, { Page } from 'puppeteer';

import type { EmulateDevice } from './emulatingDevice';

/**
 * puppeteer 実行メイン関数
 * @param {function(puppeteer.Page) => void} callback
 * @param {*} opt
 */
export const puppet = async (callback: (page: Page) => void, device: EmulateDevice, opt: any = {}): Promise<void> => {
  const browser = await puppeteer.launch(opt);
  const page = await browser.newPage();
  await page.emulate(device);

  try {
    await callback(page);
  } catch (err) {
    console.log(err);
  }
  if (opt.close !== false) {
    await browser.close();
  }
};
