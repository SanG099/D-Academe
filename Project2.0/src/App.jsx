import React, { useState, useReducer, useEffect } from 'react';
import Web3 from 'web3';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './index.css';
import Header from './Components/Header';
import Home from './Components/Home';
import Footer from './Components/Footer';
import BuyToken from './Components/BuyToken';
import BuyCourses from './Components/BuyCourses';
import Cart from './Components/Cart';
import MyOrder from './Components/MyOrder';
import About from './Components/About';
import Help from './Components/Help';
import Loader from './Components/Loader';
import Courses from './Components/Courses';
import ABI from './Constant/ABI.json'; // Ensure ABI.json is correctly imported
import Livepeer from "livepeer";

// const livepeer = new Livepeer({
//   apiKey: process.env.YOUR_PRIVATE_API_KEY,
// });


const contractAddress = '0x4c0A093D46771A7A37F8aE37962989907070609e';

const initialState = {
  account: '',
  balance: '',
  contract: null,
  tokenBalance: 50,
  tokensToBuy: 0,
  cartItems: [],
  orders: [],
  loading: false,
};

function reducer(state, action) {
  switch (action.type) {
    case 'SET_ACCOUNT':
      return { ...state, account: action.payload };
    case 'SET_BALANCE':
      return { ...state, balance: action.payload };
    case 'SET_CONTRACT':
      return { ...state, contract: action.payload };
    case 'SET_TOKEN_BALANCE':
      return { ...state, tokenBalance: action.payload };
    case 'SET_TOKENS_TO_BUY':
      return { ...state, tokensToBuy: action.payload };
    case 'ADD_TO_CART':
      return { ...state, cartItems: [...state.cartItems, action.payload] };
    case 'REMOVE_FROM_CART':
      // Filter out the course with the matching id
      return { ...state, cartItems: state.cartItems.filter((course) => course.id !== action.payload) };
    case 'ADD_ORDER':
      return { ...state, orders: [...state.orders, action.payload] };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    default:
      return state;
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const connectWallet = async () => {
    dispatch({ type: 'SET_LOADING', payload: true });
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        dispatch({ type: 'SET_ACCOUNT', payload: accounts[0] });
        await getBalance(accounts[0]);
        const web3 = new Web3(window.ethereum);
        const contractInstance = new web3.eth.Contract(ABI, contractAddress);
        dispatch({ type: 'SET_CONTRACT', payload: contractInstance });
        await getTokenBalance(contractInstance, accounts[0]);
      } catch (error) {
        console.error('Error connecting wallet:', error);
      } finally {
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    } else {
      console.log('MetaMask is not installed');
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const getBalance = async (account) => {
    if (window.ethereum && account) {
      try {
        const web3 = new Web3(window.ethereum);
        const balance = await web3.eth.getBalance(account);
        dispatch({ type: 'SET_BALANCE', payload: web3.utils.fromWei(balance, 'ether') });
      } catch (error) {
        console.error('Error fetching balance:', error);
      }
    }
  };

  const getTokenBalance = async (contract, account) => {
    if (contract && account) {
      try {
        const balance = await contract.methods.balanceOf(account).call();
        dispatch({ type: 'SET_TOKEN_BALANCE', payload: balance });
      } catch (error) {
        console.error('Error fetching token balance:', error);
      }
    }
  };

  const disconnectWallet = () => {
    dispatch({ type: 'SET_ACCOUNT', payload: '' });
    dispatch({ type: 'SET_BALANCE', payload: '' });
    dispatch({ type: 'SET_CONTRACT', payload: null });
    dispatch({ type: 'SET_TOKEN_BALANCE', payload: 50 });
  };

  useEffect(() => {
    if (state.account && state.contract) {
      getBalance(state.account);
      getTokenBalance(state.contract, state.account);
    }
  }, [state.account, state.contract]);

  const buyTokens = async (numberOfTokens) => {
    dispatch({ type: 'SET_LOADING', payload: true });
  
    if (state.contract && state.account) {
      try {
        const web3 = new Web3(window.ethereum);
        // Assuming token has 18 decimals
        const amount = web3.utils.toWei(numberOfTokens.toString(), 'D-Academe'); 
  
        const transaction = await state.contract.methods
          .mint(state.account, amount)
          .send({
            from: state.account,
            value: 0, // Adjust if your minting function requires Ether
          });
  
        console.log('Transaction successful:', transaction);
        await getTokenBalance(state.contract, state.account); // Update token balance
      } catch (error) {
        console.error('Error minting tokens:', error);
      } finally {
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    } else {
      console.log("Contract or account not available");
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const addToCart = (course) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    dispatch({ type: 'ADD_TO_CART', payload: course });
    dispatch({ type: 'SET_LOADING', payload: false });
  };

  const buyItem = async (item, quantity, name, address, contact) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    if (state.contract && state.account) {
      try {
        await state.contract.methods.purchaseItem(item.id, quantity, name, address, contact).send({ from: state.account });
        dispatch({ type: 'ADD_ORDER', payload: { ...item, quantity, name, address, contact } });
        dispatch({ type: 'REMOVE_FROM_CART', payload: item });
      } catch (error) {
        console.error(`Error buying ${item.name}:`, error);
      } finally {
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    } else {
      console.log("Contract or account not available");
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  // Ensure this function is only declared once in your file
const removeFromCart = (course) => {
  // Dispatch an action to remove the course from the cart
  dispatch({ type: 'REMOVE_FROM_CART', payload: course.id }); // Pass course.id to uniquely identify the course
};

// Ensure this is the only declaration for removeFromCart
// If you find another declaration, remove it or update to this unified function

  

  return (
    <Router>
      <div className="min-h-screen bg-gray-100 text-gray-900 flex flex-col justify-between">
        <Header
          connectWallet={connectWallet}
          disconnectWallet={disconnectWallet}
          account={state.account}
          balance={state.balance}
          tokenBalance={state.tokenBalance}
        />
        <div className="max-w-7xl mx-auto px-4 py-6">
          {state.loading && <Loader />}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/buy-token"
              element={
                <BuyToken
                  tokensToBuy={state.tokensToBuy}
                  setTokensToBuy={(value) => dispatch({ type: 'SET_TOKENS_TO_BUY', payload: value })}
                  buyTokens={buyTokens}
                  setLoading={(value) => dispatch({ type: 'SET_LOADING', payload: value })}
                />
              }
            />
            <Route
              path="/buy-items"
              element={
                <BuyCourses
                  contract={state.contract}
                  account={state.account}
                  addToCart={addToCart}
                  buyItem={buyItem}
                  setLoading={(value) => dispatch({ type: 'SET_LOADING', payload: value })}
                />
              }
            />
            {/* <Route
              path="/cart"
              element={<Cart cartItems={state.cartItems} removeFromCart={removeFromCart} />}
            /> */}
                <Route
                     path="/cart"
                        element={
                            <Cart
                                cartItems={state.cartItems}
                                removeFromCart={removeFromCart} />}
/>

            <Route path="/my-order" element={<MyOrder orders={state.orders} />} />
            <Route path="/about" element={<About />} />
            <Route path="/help" element={<Help />} />
            <Route path="/courses" element={<Courses />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
