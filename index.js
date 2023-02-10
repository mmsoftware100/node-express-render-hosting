const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 8081;

const puppeteer = require('puppeteer');



app.get('/', async (req, res) => {
  const username = req.query.username || 'myogeshchavan97';
  try {
    const result = await axios.get(
      `https://api.github.com/users/${username}/repos`
    );
    const repos = result.data
      .map((repo) => ({
        name: repo.name,
        url: repo.html_url,
        description: repo.description,
        stars: repo.stargazers_count
      }))
      .sort((a, b) => b.stars - a.stars);

    res.send(repos);
  } catch (error) {
    res.status(400).send('Error while getting list of repositories');
  }
});



function delay(time) {
  return new Promise(function(resolve) { 
      setTimeout(resolve, time)
  });
}

app.get('/scrap', async (req, res) => {
  const url = req.query.url || 'https://tradingeconomics.com/china/stock-market'; //'http://books.toscrape.com'; // 'https://aungkoman.github.io';
  let browser;
	try {
	    console.log("Opening the browser......");
	    browser = await puppeteer.launch({
	        headless: false,
	        args: ["--disable-setuid-sandbox"],
	        'ignoreHTTPSErrors': true
	    });
	    console.log("Opening new page......");
      let page = await browser.newPage();
      console.log(`Navigating to ${url}`);
      await page.goto(url);
      console.log('before waiting');
      //await delay(4000);
      console.log('after waiting');
      // $("#iChart-bodyLabels-cnt > div.iChart-bodylabels-ohlc > span:nth-child(2) > span.closeLabel").text();

      console.log("waiting for selector");
      // const mainValue = await page.evaluate('$("#iChart-bodyLabels-cnt > div.iChart-bodylabels-ohlc > span:nth-child(2) > span.closeLabel").text()');
      const rateValue = await page.evaluate('$("#iChart-bodyLabels-cnt > div.iChart-bodylabels-ohlc > span:nth-child(2)").text();');
      let mainData = rateValue.trim().split(" "); // .map((num) => num.trim());
      for(let i=0; i < mainData.length; i++){
        mainData[i] = mainData[i].trim();
      }
      let firstDigit = mainData[0][mainData[0].length - 1];
      let secondDigit = mainData[1][mainData[1].length - 1];
      let digit = firstDigit+""+secondDigit; // mainData[0].at(-1)+""+mainData[1].at(-1);
      let data = {mainData, firstDigit, secondDigit, digit};
      // $("#iChart-bodyLabels-cnt > div.iChart-bodylabels-ohlc > span:nth-child(2) > span.red.nChange.nc6").text();
      // await page.waitForSelector('#iChart-bodyLabels-cnt > div.iChart-bodylabels-ohlc > span:nth-child(2) > span.closeLabel');
      
      /*
      let mainValue = await page.$$eval('#iChart-bodyLabels-cnt > div.iChart-bodylabels-ohlc > span:nth-child(2) > span.closeLabel', element => {
        console.log("element.textContent");
        console.log(element.textContent);
        return element.textContent;
      });


      /*
      await page.waitForSelector('.page_inner');
      // Get the link to all the required books
      let urls = await page.$$eval('section ol > li', links => {
        // Make sure the book to be scraped is in stock
        links = links.filter(link => link.querySelector('.instock.availability > i').textContent !== "In stock")
        // Extract the links from the data
        links = links.map(el => el.querySelector('h3 > a').href)
        return links;
      });
      console.log(urls);


      res.send(urls);
      */
     console.log("res.send ");
     console.log(data);
     res.send(data);
	} catch (err) {
	    console.log("Could not create a browser instance => : ", err);
      res.status(502).send("Could not create a browser instance => : " + err);
	}
});


app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
