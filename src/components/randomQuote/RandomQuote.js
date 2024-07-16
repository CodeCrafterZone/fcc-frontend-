import "./RandomQuote.css";
import React, { useState, useEffect } from "react";

const RandomQuoteBox = () => {
  const [currentQuote, setCurrentQuote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchQuote = async () => {
    try {
      const response = await fetch("https://type.fit/api/quotes");
      if (!response.ok) {
        throw new Error("Failed to fetch quotes");
      }
      const data = await response.json();
      const randomIndex = Math.floor(Math.random() * data.length);
      setCurrentQuote(data[randomIndex]);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  const handleNewQuote = () => {
    setLoading(true);
    setError(null);
    fetchQuote();
  };

  const generateTweetURL = () => {
    if (currentQuote) {
      const tweetText = encodeURIComponent(
        `"${currentQuote.text}" - ${currentQuote.author}`
      );
      return `https://twitter.com/intent/tweet?text=${tweetText}`;
    }
    return "https://twitter.com/intent/tweet";
  };

  return (
    <div className="container">
      <div id="quote-box">
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div>Error: {error}</div>
        ) : (
          <>
            <div id="text">{currentQuote && currentQuote.text}</div>
            <div id="author">
              {currentQuote && `- ${currentQuote.author.split(",")[0]}`}
            </div>
          </>
        )}
        <button id="new-quote" onClick={handleNewQuote} disabled={loading}>
          {loading ? "Loading..." : "New Quote"}
        </button>
        <a
          id="tweet-quote"
          href={generateTweetURL()}
          target="_blank"
          rel="noopener noreferrer"
          disabled={!currentQuote}
        >
          Tweet Quote
        </a>
        <footer>
          <div id="made-by">by David</div>
        </footer>
      </div>
    </div>
  );
};

export default RandomQuoteBox;
