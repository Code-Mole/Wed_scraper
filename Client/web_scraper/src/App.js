import react, { useState,useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [url, setUrl] = useState('');
  const [selectors, setSelectors] = useState({
    leadItem: '.profile-card', // Default selectors (adjust these for your specific sites)
    name: '.name',
    email: '.email',
    phone: '.phone',
    company: '.company',
    website: '.website'
  });
  const [scrapedData, setScrapedData] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // Track loading state

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage(null);
    setIsLoading(true); // Set loading state to true

    try {
      const response = await axios.post('http://localhost:3000/scrape', { url, selectors });
      setScrapedData(response.data);
      console.log('Data scraped and stored successfully!');
    } catch (error) {
      console.error('Error scraping:', error);
      setErrorMessage('Failed to scrape data. Please check your URL and selectors.');
    } finally {
      setIsLoading(false); // Set loading state to false after scraping
    }
  };

  return (
    <div className="App">
      <div className="container">
      <h1 className="mb-4">Web Scraping Tool</h1>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="url">Website URL:</label>
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
          <input
            type="text"
            id="leadItem"
            className="form-control"
            value={selectors.leadItem}
            onChange={(e) => setSelectors({ ...selectors, leadItem: e.target.value })}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="name">Name Selector:</label>
          <input
            type="text"
            id="name"
            className="form-control"
            value={selectors.name}
            onChange={(e) => setSelectors({ ...selectors, name: e.target.value })}
            required
          />
        </div>

        <div className="form-group">
        <label htmlFor="email">Email Selector:</label>
          <input
            type="text"
            id="email"
            className="form-control"
            value={selectors.email}
            onChange={(e) => setSelectors({ ...selectors, email: e.target.value })}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="phone">Phone Selector:</label>
          <input
            type="text"
            id="phone"
            className="form-control"
            value={selectors.phone}
            onChange={(e) => setSelectors({ ...selectors, phone: e.target.value })}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="company">Company Selector:</label>
          <input
            type="text"
            id="company"
            className="form-control"
            value={selectors.company}
            onChange={(e) => setSelectors({ ...selectors, company: e.target.value })}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="website">Website Selector:</label>
          <input
            type="text"
            id="website"
            className="form-control"
            value={selectors.website}
            onChange={(e) => setSelectors({ ...selectors, website: e.target.value })}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary" disabled={isLoading}>
          {isLoading ? 'Scraping...' : 'Scrape'}
        </button>
      </form>

      {errorMessage && (
        <div className="alert alert-danger mt-3" role="alert">
          {errorMessage}
        </div>
      )}

      {scrapedData.message && (
        <div className="alert alert-success mt-3" role="alert">
          {scrapedData.message}
        </div>
      )}

      <h2 className="mt-4">Scraped Leads:</h2>

      <table className="table table-striped mt-3">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Company</th>
            <th>Website</th>
          </tr>
        </thead>
        <tbody>
          {scrapedData.length > 0 && scrapedData.map((lead, index) => (
            <tr key={index}>
              <td>{lead.name}</td>
              <td>{lead.email}</td>
              <td>{lead.phone}</td>
              <td>{lead.company}</td>
              <td>{lead.website}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  );
}

export default App;
