import { useState, useEffect } from "react";

function QuoteApp() {
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  function fetchQuote() {
    setLoading(true);
    setError(null);

    fetch("https://dummyjson.com/quotes/random")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Something went wrong fetching the quote");
        }
        return res.json();
      })
      .then((data) => {
        setQuote(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }

  useEffect(() => {
    fetchQuote();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center px-4">
      <div className="bg-gray-800 max-w-xl w-full rounded-xl p-8 text-center">
        <h2 className="text-2xl font-bold mb-6">Random Quote</h2>

        {loading && (
          <p className="text-gray-400">Loading quote...</p>
        )}

        {error && (
          <div>
            <p className="text-red-400 mb-4">{error}</p>

            <button
              onClick={fetchQuote}
              className="bg-purple-500 hover:bg-purple-600 px-5 py-2 rounded-lg font-semibold"
            >
              Try Again
            </button>
          </div>
        )}

        {!loading && !error && quote && (
          <>
            <p className="text-xl italic mb-4">
              "{quote.quote}"
            </p>

            <p className="text-purple-400 font-semibold">
              — {quote.author}
            </p>

            <button
              onClick={fetchQuote}
              className="mt-6 bg-purple-500 hover:bg-purple-600 px-5 py-2 rounded-lg font-semibold"
            >
              New Quote
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default QuoteApp;