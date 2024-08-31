import React, { useState } from "react";
import { ethers } from "ethers"; // Correctly import ethers
import Loader from './Loader'; // Import your Loader component

const BuyToken = ({ contractAddress, contractABI }) => {
  const [tokensToBuy, setTokensToBuy] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Function to handle minting of tokens
  const handleMintTokens = async () => {
    if (!tokensToBuy || tokensToBuy <= 0) {
      setMessage("Please enter a valid number of tokens to mint.");
      return;
    }

    try {
      if (!window.ethereum) {
        alert("Please install MetaMask to continue.");
        return;
      }

      // Request account access from MetaMask
      await window.ethereum.request({ method: "eth_requestAccounts" });

      // Set up provider and signer
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      // Create contract instance
      const contract = new ethers.Contract(contractAddress, contractABI, signer);

      // Show loader during transaction
      setLoading(true);

      // Convert the token amount to the correct format
      const amount = ethers.utils.parseUnits(tokensToBuy, 18); // Adjust decimals as needed

      // Call the mint function
      const tx = await contract.mint(await signer.getAddress(), amount);
      await tx.wait(); // Wait for transaction to be mined

      setMessage(`Successfully minted ${tokensToBuy} tokens!`);
    } catch (error) {
      console.error("Error minting tokens:", error);
      setMessage("Error minting tokens. Please try again.");
    } finally {
      // Reset states after transaction
      setLoading(false);
      setTokensToBuy("");
    }
  };

  return (
    <div className="flex flex-col items-center p-8 bg-gray-900 rounded-lg shadow-lg mt-12 mx-auto max-w-md">
      {loading && <Loader />}
      <h2 className="text-3xl font-bold text-white mb-6">Mint Tokens</h2>
      {message && <p className={`mb-4 ${message.includes("Error") ? "text-red-500" : "text-green-500"}`}>{message}</p>}
      <input
        type="number"
        value={tokensToBuy}
        onChange={(e) => setTokensToBuy(e.target.value)}
        className="bg-gray-700 text-white py-3 px-5 rounded-lg mb-6 w-full text-center focus:outline-none focus:ring-2 focus:ring-green-500"
        placeholder="Enter the number of tokens"
        min="1"
      />
      <button
        onClick={handleMintTokens}
        disabled={loading}
        className="bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 w-full transition duration-300 ease-in-out transform hover:scale-105 disabled:opacity-50"
      >
        {loading ? "Processing..." : "Mint Tokens"}
      </button>
    </div>
  );
};

export default BuyToken;
