import puppeteer, { Page } from 'puppeteer'

const main = async () => {
  console.log('start')

  const browser = await puppeteer.launch()
  const page: Page = await browser.newPage()
  await page.emulate(puppeteer.devices['iPhone X'])

  const url = 'https://google.com/'
  await page.goto(url, { waitUntil: 'networkidle0' })

  await page.screenshot({ path: './src/pptr/screenshot/google.png' })

  page.title

  await browser.close()

}

main()