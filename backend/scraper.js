const { createClient } = require("@supabase/supabase-js");
const path = require("path");
const puppeteer = require("puppeteer");
const { parse } = require("rss-to-json");

require("dotenv").config();
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);
const ScrapeKnoxNews = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({
    width: 1920,
    height: 1080,
    deviceScaleFactor: 1,
  });
  await page.goto("http://rssfeeds.knoxnews.com/knoxville/home/");

  let headlines = await page.$$eval("h3 a", (elements) => {
    results = [];
    elements.forEach((item) => {
      let locked = false;
      results.push({
        headline: item.textContent,
        link: item.getAttribute("href"),
        source: "knoxnews.com",
        date: "none",
        locked: locked,
      });
    });
    return results;
  });
  let dates = await page.$$eval("h3 span", (elements) => {
    results = [];
    let regex = /([0-9]+(-[0-9]+)+)\s/i;
    elements.forEach((item) => {
      let text = item.textContent;
      let date = text.match(regex);
      results.push(date[1]);
    });
    console.log(results);
    return results;
  });
  headlines.map((obj) => {
    let index = headlines.findIndex((x) => x.headline == obj.headline);
    obj.date = dates[index];
  });
  const { data, error } = await supabase.from("headlines").upsert(headlines);
  console.log(error);
  await page.screenshot({ path: "test.png" });
  await browser.close();
};

const ScrapeUTKNews = async () => {
  let rss = await parse("https://news.utk.edu/feed/");
  let json = JSON.stringify(rss, null, 3);
  let parsed = JSON.parse(json);
  let items = parsed.items;
  let result = [];
  items.map((obj) => {
    let date = obj.published;
    let parsed = new Date(date);
    let string = parsed.toISOString();
    let day = string.slice(0, 10);
    result.push({
      headline: obj.title,
      source: "news.utk.edu",
      link: obj.link,
      date: day,
      locked: false,
    });
  });
  const { data, error } = await supabase.from("headlines").upsert(result);
  console.log(error);
};

ScrapeKnoxNews();
ScrapeUTKNews();
module.exports = {
  ScrapeKnoxNews,
  ScrapeUTKNews,
};
