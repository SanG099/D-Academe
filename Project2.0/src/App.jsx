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
import Transactions from './Components/Transactions';
import CoursePopup  from './Components/CoursePopup';
import Courses from './Components/Courses';
import ABI from './Constant/ABI.json'; // ABI for tokens
import CABI from './Constant/course-ABI.json'; // ABI for courses

const contractAddress = '0xaA82d1F7A5c907270AFA2Bb079BB0A8027bEC2Cd';
const courseAddress = '0x16Eb6B9aDc28301fb6559dEF18A5199E8a0eBA02';


  
  // Make sure to set tokenPriceInEth in the state if needed
  const tokenPriceInEth = 0.000001; // Example token price

const initialState = {
  account: '',
  balance: '',
  tokenContract: null,
  courseContract: null,
  tokenBalance: 50,
  tokensToBuy: 0,
  cartItems: [],
  orders: [],
  transaction: [],
  loading: false,
  youtubeLink: '', // Added youtubeLink state
};

function reducer(state, action) {
  switch (action.type) {
    case 'SET_ACCOUNT':
      return { ...state, account: action.payload };
    case 'SET_BALANCE':
      return { ...state, balance: action.payload };
    case 'SET_TOKEN_CONTRACT':
      return { ...state, tokenContract: action.payload };
    case 'SET_COURSE_CONTRACT':
      return { ...state, courseContract: action.payload };
    case 'SET_TOKEN_BALANCE':
      return { ...state, tokenBalance: action.payload };
    case 'SET_TOKENS_TO_BUY':
      return { ...state, tokensToBuy: action.payload };
    case 'ADD_TO_CART':
      return { ...state, cartItems: [...state.cartItems, action.payload] };
    case 'REMOVE_FROM_CART':
      return { ...state, cartItems: state.cartItems.filter((course) => course.id !== action.payload) };
    case 'ADD_ORDER':
      return { ...state, orders: [...state.orders, action.payload] };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_YOUTUBE_LINK':
      return { ...state, youtubeLink: action.payload }; // Added case for youtubeLink
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
        
        // Initialize Token Contract
        const tokenContractInstance = new web3.eth.Contract(ABI, contractAddress);
        dispatch({ type: 'SET_TOKEN_CONTRACT', payload: tokenContractInstance });
        await getTokenBalance(tokenContractInstance, accounts[0]);
        
        // Initialize Sale Contract
        const saleContractInstance = new web3.eth.Contract(saleABI, saleAddress);
        dispatch({ type: 'SET_SALE_CONTRACT', payload: saleContractInstance });
        
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
        console.log("Updated Token Balance: ", balance);
        const formattedBalance = Web3.utils.fromWei(balance, 'ether');
        console.log("Formatted Token Balance: ", formattedBalance); // Add this line
        dispatch({ type: 'SET_TOKEN_BALANCE', payload: formattedBalance });
      } catch (error) {
        console.error('Error fetching token balance:', error);
      }
    }
  };
  
  const saveTransaction = (transaction) => {
    if (Array.isArray(state.transactions)) {
      dispatch({ type: 'SET_TRANSACTIONS', payload: [...state.transactions, transaction] });
    } else {
      console.error('State.transactions is not an array');
      // Optionally initialize transactions as an array
      dispatch({ type: 'SET_TRANSACTIONS', payload: [transaction] });
    }
  };



  const disconnectWallet = () => {
    dispatch({ type: 'SET_ACCOUNT', payload: '' });
    dispatch({ type: 'SET_BALANCE', payload: '' });
    dispatch({ type: 'SET_TOKEN_CONTRACT', payload: null });
    dispatch({ type: 'SET_COURSE_CONTRACT', payload: null });
    dispatch({ type: 'SET_TOKEN_BALANCE', payload: 50 });
    dispatch({ type: 'SET_YOUTUBE_LINK', payload: '' }); // Clear youtubeLink
  };

  useEffect(() => {
    if (state.account && state.tokenContract) {
      getBalance(state.account);
      getTokenBalance(state.tokenContract, state.account);
    }
  }, [state.account, state.tokenContract]);

  const buyTokens = async () => {
    if (state.tokenContract && state.account) {
      try {
        const valueInWei = Web3.utils.toWei(
          (BigInt(state.tokensToBuy) * BigInt(Web3.utils.toWei(tokenPriceInEth.toString(), 'ether'))).toString(),
          'wei'
        );
  
        const receipt = await state.tokenContract.methods.buyTokens().send({
          from: state.account,
          value: valueInWei,
        });
  
        return receipt; // Return the transaction receipt
      } catch (error) {
        console.error('Error buying tokens:', error);
        throw error; // Re-throw error to be handled in the component
      }
    } else {
      console.log('Contract or account not available');
    }
  };

 
  

  const addToCart = (course) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    dispatch({ type: 'ADD_TO_CART', payload: course });
    dispatch({ type: 'SET_LOADING', payload: false });
  };

  const buyCourse = async (course, quantity, name, address, contact) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    if (state.courseContract && state.account) {
      try {
        // Call your contract's buyCourse method with additional parameters
        await state.courseContract.methods.buyCourse(course.id, quantity, name, address, contact).send({ from: state.account });
        dispatch({ type: 'ADD_ORDER', payload: { ...course, quantity, name, address, contact } });
        dispatch({ type: 'REMOVE_FROM_CART', payload: course.id });

        // Fetch the YouTube link after purchase
        const courseDetails = await state.courseContract.methods.courses(course.id).call();
        dispatch({ type: 'SET_YOUTUBE_LINK', payload: courseDetails.youtubeLink });

      } catch (error) {
        console.error(`Error buying ${course.name}:`, error);
      } finally {
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    } else {
      console.log("Course contract or account not available");
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };
  
  const removeFromCart = (course) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: course.id });
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
            <Route path="/" element={<Home contract={state.tokenContract} account={state.account} />} />
            <Route
              path="/buy-token"
              element={
                <BuyToken
                  tokensToBuy={state.tokensToBuy}
                  setTokensToBuy={(value) => dispatch({ type: 'SET_TOKENS_TO_BUY', payload: value })}
                  buyTokens={buyTokens}
                  setLoading={(value) => dispatch({ type: 'SET_LOADING', payload: value })}
                  saveTransaction={saveTransaction} // Pass it here
                />
              }
            />
           <Route
                path="/buy-items"
                element={
                  <BuyCourses
                    contract={state.courseContract}
                    account={state.account}
                    addToCart={addToCart}
                    buyCourse={buyCourse}
                    youtubeLink={state.youtubeLink} // Pass youtubeLink to BuyCourses
                  />
                }
              />
            <Route
              path="/cart"
              element={<Cart items={state.cartItems} removeFromCart={removeFromCart} buyCourse={buyCourse} />}
            />
            <Route
              path="/my-orders"
              element={<MyOrder orders={state.orders} />}
            />
            <Route path="/about" element={<About />} />
            <Route
              path="/Transactions"
              element={
                <Transactions
                  contract={state.tokenContract}
                  account={state.account}
                />
              }
            />  
            <Route path="/help" element={<Help />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
