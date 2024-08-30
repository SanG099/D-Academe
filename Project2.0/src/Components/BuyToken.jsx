import React, { useState } from "react";
import Loader from './Loader';

const BuyToken = ({ tokensToBuy, setTokensToBuy, buyTokens }) => {
  const [loading, setLoading] = useState(false);

  const handleBuyTokens = async () => {
    if (!tokensToBuy || tokensToBuy <= 0) {
      console.error("Invalid number of tokens");
      return;
    }
    setLoading(true);
    try {
      await buyTokens(tokensToBuy);
    } catch (error) {
      console.error("Error buying tokens:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center p-8 bg-gray-900 rounded-lg shadow-lg mt-12 mx-auto max-w-md">
      {loading && <Loader />}
      <h2 className="text-3xl font-bold text-white mb-6">Buy Tokens</h2>
      <input
        type="number"
        value={tokensToBuy}
        onChange={(e) => setTokensToBuy(e.target.value)}
        className="bg-gray-700 text-white py-3 px-5 rounded-lg mb-6 w-full text-center focus:outline-none focus:ring-2 focus:ring-green-500"
        placeholder="Enter the number of tokens"
      />
      <button
        onClick={handleBuyTokens}
        className="bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 w-full transition duration-300 ease-in-out transform hover:scale-105"
      >
        Buy Tokens
      </button>
    </div>
  );
};

export default BuyToken;
