import react, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  // useStates 
  const [url, setUrl] = useState("");
  const [selectors, setSelectors] = useState({});
  const [scrapedData, setScrapedData] = useState([]);
  const [fetchData, setFetchData] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false); 
// function for form submittion
  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage(null);
    setIsLoading(true); 

    try {
      const response = await axios.post("http://localhost:8500/scrape", {
        url,
        selectors,
      });
      setScrapedData(response.data);
      console.log("Data scraped and stored successfully!");
    } catch (error) {
      console.error("Error scraping:", error);
      setErrorMessage(
        "Failed to scrape data. Please check your URL and selectors."
      );
    } finally {
      setIsLoading(false); 
    }
  };

  // fech data from the backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8500/leads");
        setFetchData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="App">
      <div className="container">
        <h1 className="title">Web Scraping Tool</h1>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="url">Website URL:</label>
            <br></br>
            <input
              type="text"
              id="url"
              className="form-control"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="leadItem">Lead Item Selector (CSS selector):</label>
            <br></br>
            <input
              type="text"
              id="leadItem"
              className="form-control"
              value={selectors.leadItem}
              onChange={(e) =>
                setSelectors({ ...selectors, leadItem: e.target.value })
              }
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="name">Name Selector:</label>
            <br></br>
            <input
              type="text"
              id="name"
              className="form-control"
              value={selectors.name}
              onChange={(e) =>
                setSelectors({ ...selectors, name: e.target.value })
              }
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Selector:</label>
            <br></br>
            <input
              type="text"
              id="email"
              className="form-control"
              value={selectors.email}
              onChange={(e) =>
                setSelectors({ ...selectors, email: e.target.value })
              }
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone Selector:</label>
            <br></br>
            <input
              type="text"
              id="phone"
              className="form-control"
              value={selectors.phone}
              onChange={(e) =>
                setSelectors({ ...selectors, phone: e.target.value })
              }
              required
            />
          </div>

          <button type="submit" className="btn " disabled={isLoading}>
            {isLoading ? "Scraping..." : "Scrape"}
          </button>
        </form>

        {errorMessage && (
          <div className="alert" role="alert">
            {errorMessage}
          </div>
        )}

        {scrapedData.message && (
          <div className="alert" role="alert">
            {scrapedData.message}
          </div>
        )}

        <h2 className="table-title ">Scraped Leads:</h2>

        <table className="table">
          <thead>
            <tr>
              <th>IDs</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
            </tr>
          </thead>
          <tbody>
            {fetchData.length > 0 &&
              fetchData.map((lead, index) => (
                <tr key={index}>
                  <td>{lead.ID}</td>
                  <td>{lead.name}</td>
                  <td>{lead.email}</td>
                  <td>{lead.phone}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
