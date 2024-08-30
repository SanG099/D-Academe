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

const contractAddress = '0x4F0DAE5208130D83661825544798d82155Ef97Fe';
const tokenPriceInEth = '0.0000000001';

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
      return { ...state, cartCourses: [...state.cartCourses, action.payload] };
    case 'REMOVE_FROM_CART':
      return { ...state, cartCourses: state.cartCourses.filter(course => course.id !== action.payload) };
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
        console.error(error);
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
    console.log('Attempting to buy tokens:', numberOfTokens);
    dispatch({ type: 'SET_LOADING', payload: true });
    if (state.contract && state.account) {
      try {
        const web3 = new Web3(window.ethereum);
        const rateInEth = tokenPriceInEth;
        const totalCostInWei = web3.utils.toWei((numberOfTokens * rateInEth).toString(), 'ether');

        console.log(`Total Cost (ETH): ${web3.utils.fromWei(totalCostInWei, 'ether')}`);

        const transaction = await state.contract.methods.buyTokens().send({
          from: state.account,
          value: totalCostInWei,
        });

        console.log('Transaction successful:', transaction);
        await getTokenBalance(state.contract, state.account);
        console.log('Tokens successfully purchased');
      } catch (error) {
        console.error('Error buying tokens:', error);
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
        await state.contract.methods.purchaseItem(course.id, quantity, name, address, contact).send({ from: state.account });

        dispatch({ type: 'ADD_ORDER', payload: { ...course, quantity, name, address, contact } });
        dispatch({ type: 'REMOVE_FROM_CART', payload: course });

      } catch (error) {
        console.error(`Error buying ${course.name}:`, error);
      } finally {
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    } else {
      console.log("Contract or account not available");
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const removeFromCart = (course) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: course });
  };

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
            <Route
              path="/cart"
              element={<Cart cartItems={state.cartItems} removeFromCart={removeFromCart} />}
            />
            <Route path="/my-order" element={<MyOrder orders={state.orders} />} />
            <Route path="/about" element={<About />} />
            <Route path="/help" element={<Help />} />
            
            <Route path="/courses" element={<Courses />} /> {/* Add route for Courses */}
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
