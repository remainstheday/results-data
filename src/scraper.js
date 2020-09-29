const puppeteer = require('puppeteer');
const fs = require('fs');
const parse = require('node-html-parser');

//const url = 'http://localhost:8000/';
const url = 'http://dallas.mychiptime.com/searchevent.php?id=11971';

const scrape = async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  await page.goto(url);
  await page.click('input[value="Show All"]');
  await page.waitForSelector('#myTable', { visible: true });

  const result = await page.evaluate(() => {
    const theads = document.querySelectorAll('#myTable th');
    const tableRows = document.querySelectorAll('#myTable tbody tr');
    const columnHeaders = Array.from(theads).map(thead => thead.innerText);
    const rows = Array.from(tableRows);

    const mapRow = headings => {
      return (mapRowToObject = ({ cells }) => {
        return [...cells].reduce(function(result, cell, index) {
          let value = cell.innerText;
          return Object.assign(result, { [headings[index]]: value });
        }, {});
      });
    };

    return rows.map(mapRow(columnHeaders));
  });

  browser.close();
  return result;
};

//module.exports.scrape = scrape;

scrape().then(result => {
  fs.writeFileSync('./data/2018/half-marathon.json', JSON.stringify(result));
});
