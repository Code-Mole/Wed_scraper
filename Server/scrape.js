import axios from "axios";
import puppeteer from "puppeteer";

const scrapeWebsite = async (url, selectors) => {
  const scrapedData = [];

  try {
    // Launch a browser instance
    const browser = await puppeteer.launch({
      headless: true, 
      args: ["--no-sandbox", "--disable-setuid-sandbox"], 
    });
    const page = await browser.newPage();

    // Navigate to the target URL
    await page.goto(url);

    await page.waitForSelector(selectors.leadItem);

    // Extract data from the page
    await page
      .evaluate((selectors) => {
        const leadItems = document.querySelectorAll(selectors.leadItem);
        const scrapedData = [];

        leadItems.forEach((item) => {
          const lead = {
            name: item.querySelector(selectors.name)?.textContent?.trim() || "",
            email:
              item.querySelector(selectors.email)?.textContent?.trim() || "",
            phone:
              item.querySelector(selectors.phone)?.textContent?.trim() || "",
          };
          scrapedData.push(lead);
        });

        // Return the scraped data
        return scrapedData;
      }, selectors)
      .then((data) => {
        scrapedData.push(...data);
      });

    await browser.close();
    return scrapedData;
  } catch (error) {
    console.error("Error scraping website:", url, error);
    throw error;
  }
};

export { scrapeWebsite };
