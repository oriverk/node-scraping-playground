import type { Page } from 'puppeteer';

export const inputCredentialForLoginYahoo = async (page: Page, userId: string, password: string): Promise<void> => {
  if (typeof userId === 'undefined' || typeof password === 'undefined') {
    console.error('env "Yahoo UserID", "Yahoo login Password" are required.');
  }

  // // type username for login form for yahoo
  await page.waitForSelector('#loginfs');
  await page.type('input[id="username"]', userId, { delay: 100 });
  await page.waitForSelector('button[id="btnNext"]');
  await page.click('button[id="btnNext"]');
  // // type password
  await page.waitForSelector('#loginfs');
  await page.type('input[id="passwd"]', password, { delay: 100 });
  await page.waitForSelector('button[id="btnSubmit"]');
  await page.click('button[id="btnSubmit"]');
};
