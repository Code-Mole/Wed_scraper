import express from "express";
import cors from "cors";
import { db } from "./dbConnection.js";
import { scrapeWebsite } from "./scrape.js";

const Server = express();
const PORT = 8500;

// Middleware
Server.use(cors());
Server.use(express.json());

// methods

// POST route
Server.post("/scrape", async (req, res) => {
  const { url, selectors } = req.body;

  try {
    const scrapedData = await scrapeWebsite(url, selectors);

    // Insert data into database
    const sql = "INSERT INTO scrape_data (name, email, phone) VALUES (?, ?, ?)";
    for (const lead of scrapedData) {
      const values = [lead.name, lead.email, lead.phone];
      db.query(sql, values, (err, result) => {
        if (err) {
          console.error("Error inserting lead:", err);
        }
        console.log(result);
      });
    }

    res.json({ message: "Data scraped and stored successfully!" });
  } catch (error) {
    console.error("Error scraping website:", error);
    res.status(500).json({ error: "Failed to scrape website" });
  }
});

// Get route

Server.get("/leads", (req, res) => {
  const sql = "SELECT * FROM scrape_data";
  db.query(sql, (err, result) => {
    if (err) {
      console.error("Error fetching leads:", err);
      res.status(500).json({ error: "Failed to fetch leads" });
    }
    res.json(result);
  });
})

Server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
