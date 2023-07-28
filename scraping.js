const puppeteer = require('puppeteer');
const xlsx = require("xlsx")


async function f() {

const browser = await puppeteer.launch({headless: false});
const page = await browser.newPage();
await page.goto('http://www.amazon.in/s?k=bags&crid=2M096C61O4MLT&qid=1653308124&sprefix=ba%2Caps%2C283&ref=sr_pg_1');
// await page.screenshot({path: 'sc.png'});


const links = await page.$$eval('.a-section a', allAs => allAs.map(a => a.href));

console.log(links);
const aoaLinks = links.map(l => [l]);


const wb = xlsx.utils.book_new();
const ws = xlsx.utils.aoa_to_sheet(aoaLinks);
xlsx.utils.book_append_sheet(wb,ws);
xlsx.writeFile(wb, "links.xlsx");

await browser.close();

}
f();