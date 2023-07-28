const puppeteer = require("puppeteer");
const xlsx = require("xlsx");

async function getPageData(url, page) {
  await page.goto(url);

  const title = await page.$eval("#titleSection", (title) => title.textContent);
  const price = await page.$eval(".a-offscreen  price", price => price.textContent);
  const ratings = await page.$eval(".a-color-base ratings", ratings => ratings.textContent);

  return {
    maintitle: title,
     price: price,
     ratings: ratings
  }
};
// getPageData();



async function getLinks() {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto("http://www.amazon.in/s?k=bags&crid=2M096C61O4MLT&qid=1653308124&sprefix=ba%2Caps%2C283&ref=sr_pg_1");
 
  const links = await page.$$eval('.a-section a', allAs => allAs.map(a => a.href));

  await browser.close();
  return links;
}



async function main() {

  const allLinks = await getLinks();
  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();
  const scrapedData = [];


for(let link of allLinks){
    const data = await getPageData(link,page);
    const secondToWait = (Math.floor(Math.random()*4)+1)*1000
    await page.waitFor(secondToWait);
    scrapedData.push(data);
}

const wb = xlsx.utils.book_new();
const ws = xlsx.utils.json_to_sheet(scrapedData);
xlsx.utils.book_append_sheet(wb,ws);
xlsx.writeFile(wb, "books.xlsx");

await browser.close();
console.log("Done!")

}

main();
