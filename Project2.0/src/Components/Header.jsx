import React from 'react';
import { Link } from 'react-router-dom';
import Web3 from 'web3';

const getTokenBalance = async (contract, account) => {
  if (contract && account) {
    try {
      const balance = await contract.methods.balanceOf(account).call();
      console.log("Raw Token Balance: ", balance);
      const formattedBalance = Web3.utils.fromWei(balance, 'ether');
      console.log("Formatted Token Balance: ", formattedBalance);
      dispatch({ type: 'SET_TOKEN_BALANCE', payload: formattedBalance });
    } catch (error) {
      console.error('Error fetching token balance:', error);
    }
  }
};

const Header = ({ connectWallet, disconnectWallet, account, balance, tokenBalance }) => {
  return (
    <header className="w-full flex items-center justify-between bg-green-400 text-white py-4 px-6 shadow-lg">
      {/* Logo or Site Title */}
      <div className="flex items-center gap-6">
        <h1 className="text-3xl font-bold tracking-wide">D-Academe</h1>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 flex justify-center">
        <ul className="flex gap-8">
          <li><Link to="/" className="text-white text-lg font-medium hover:text-gray-300">Home</Link></li>
          <li><Link to="/buy-token" className="text-white text-lg font-medium hover:text-gray-300">Buy Token</Link></li>
          <li><Link to="/buy-items" className="text-white text-lg font-medium hover:text-gray-300">Buy Course</Link></li>
          <li><Link to="/my-order" className="text-white text-lg font-medium hover:text-gray-300">Enrolled Course</Link></li>
          <li><Link to="/transactions" className="text-white text-lg font-medium hover:text-gray-300">Transaction</Link></li>
          <li><Link to="/about" className="text-white text-lg font-medium hover:text-gray-300">About</Link></li>
          <li><Link to="/help" className="text-white text-lg font-medium hover:text-gray-300">Help</Link></li>
        </ul>
      </nav>

      {/* Wallet Connection */}
      <div className="flex items-center gap-6">
        {account ? (
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-medium">Tokens: <span className="font-bold">{tokenBalance || '0'}</span></p>
              <p className="text-sm font-medium">Address: <span className="font-mono">{`${account.slice(0, 6)}....${account.slice(-4)}`}</span></p>
              <p className="text-sm font-medium">Balance: <span className="font-bold">{`${parseFloat(balance).toFixed(4)} ETH`}</span></p>
            </div>
            <button
              onClick={disconnectWallet}
              className="bg-red-500 text-white py-2 px-4 rounded-full hover:bg-red-600 transition-colors duration-300"
              aria-label="Disconnect Wallet"
            >
              Disconnect
            </button>
          </div>
        ) : (
          <button
            onClick={connectWallet}
            className="bg-green-600 text-white py-2 px-4 rounded-full hover:bg-blue-600 transition-colors duration-300"
            aria-label="Connect Wallet"
          >
            Connect Wallet
          </button>
        )}
      </div>
    </header>
  );
};


export default Header;
