const puppeteer = require('puppeteer');

(async () => {

const browser = await puppeteer.launch({headless: false});
const page = await browser.newPage();
await page.goto('http://www.amazon.in/s?k=bags&crid=2M096C61O4MLT&qid=1653308124&sprefix=ba%2Caps%2C283&ref=sr_pg_1');
 await page.screenshot({path: 'sc.png'});



}) ();