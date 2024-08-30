import React from 'react';
import { useNavigate } from 'react-router-dom';
import tokenImage from '../assets/Token.png';
import cartImg from '../assets/Cart.png';
import buyImg from '../assets/courses.png';

const Home = ({ contract, account }) => {
  const navigate = useNavigate();

  const goToBuyToken = () => {
    navigate('/buy-token');
  };

  const goToCart = () => {
    navigate('/Cart');
  };

  const goToBuyCourses = () => {
    navigate('/courses');
  };

  return (
    <section className="bg-white min-h-screen flex flex-col items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-green-600 mb-4">Learn Blockchain Development in Nepal</h1>
        <p className="text-xl text-gray-600 mb-8">
          Dive into the World of Blockchain Development with the best Training in Nepal
        </p>
        <button
          onClick={goToBuyCourses}
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-full mb-8 transition-colors duration-300"
        >
          Book Your Seat
        </button>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div className="flex flex-col items-center p-6 bg-gray-100  hover:bg-green-300 rounded-lg shadow-lg">
            <div className="text-green-600 text-4xl mb-4">🎓</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Earn Certificates</h3>
            <p className="text-gray-600">Validate Your Skills, Open Doors: Earn Industry-Recognized Certificates!</p>
          </div>
          <div className="flex flex-col items-center p-6 bg-gray-100 hover:bg-green-300 rounded-lg shadow-lg">
            <div className="text-green-600 text-4xl mb-4">💸</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Free & Freemium Courses</h3>
            <p className="text-gray-600">Unlock Maximum Benefits: Free and Freemium Courses for Practical Knowledge!</p>
          </div>
          <div className="flex flex-col items-center p-6 bg-gray-100  hover:bg-green-300 rounded-lg shadow-lg">
            <div className="text-green-600 text-4xl mb-4">👨‍🏫</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Industry Experts</h3>
            <p className="text-gray-600">Elevate Your Professional Growth: Learn from Industry Experts and Practitioners!</p>
          </div>
        </div>

        {/* Existing Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center p-6 bg-gray-100 rounded-lg shadow-lg">
            <img src={tokenImage} alt="Buy Token" className="w-32 h-32 mb-4" />
            <h2 className="text-xl font-semibold text-gray-700 mb-2">Buy Token</h2>
            <p className="text-gray-600 mb-4">
              Purchase tokens to access premium content and courses.
            </p>
            <button
              onClick={goToBuyToken}
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded transition-colors duration-300"
            >
              Buy Token
            </button>
          </div>
          <div className="flex flex-col items-center p-6 bg-gray-100 rounded-lg shadow-lg">
            <img src={cartImg} alt="Cart" className="w-32 h-32 mb-4" />
            <h2 className="text-xl font-semibold text-gray-700 mb-2">Cart</h2>
            <p className="text-gray-600 mb-4">View the courses and content in your cart.</p>
            <button
              onClick={goToCart}
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded transition-colors duration-300"
            >
              View Cart
            </button>
          </div>
          <div className="flex flex-col items-center p-6 bg-gray-100 rounded-lg shadow-lg">
            <img src={buyImg} alt="Buy Courses" className="w-32 h-32 mb-4" />
            <h2 className="text-xl font-semibold text-gray-700 mb-2">Buy Courses</h2>
            <p className="text-gray-600 mb-4">Browse and purchase our courses to enhance your skills.</p>
            <button
              onClick={goToBuyCourses}
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded transition-colors duration-300"
            >
              Buy Courses
            </button>
          </div>
        </div>

        {/* Featured Courses Section */}
        <div className="mt-12">
          <h2 className="text-3xl font-bold text-green-600 mb-4">Featured Courses</h2>
          <p className="text-gray-600 mb-8">Expand Your Skills: Explore our Featured Online Courses!</p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Add course cards here similar to the example provided */}
            <div className="bg-white p-4 rounded-lg shadow-lg">
              <img
                src="path-to-course-image.jpg"
                alt="Course Image"
                className="w-full h-40 object-cover rounded-t-lg"
              />
              <h3 className="text-lg font-semibold mt-4">Solidity</h3>
              <p className="text-sm text-gray-500 mt-2">Instructor Name</p>
              <p className="text-sm text-gray-500">Duration</p>
              <p className="text-green-600 font-bold mt-2">Tkn 65</p>
              <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded mt-4">
                View Course
              </button>
            </div>
            {/* Repeat the above card for each featured course */}
          </div>
        </div>

        {/* Free Courses Section */}
        <div className="mt-12">
          <h2 className="text-3xl font-bold text-green-600 mb-4">Free Courses</h2>
          <p className="text-gray-600 mb-8">Expand Your Skills: Explore Free Online Courses!</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Add course cards here similar to the example provided */}
            <div className="bg-white p-4 rounded-lg shadow-lg">
              <img
                src="path-to-course-image.jpg"
                alt="Course Image"
                className="w-full h-40 object-cover rounded-t-lg"
              />
              <h3 className="text-lg font-semibold mt-4">Write HelloWorld</h3>
              <p className="text-sm text-gray-500 mt-2">Instructor Name</p>
              <p className="text-sm text-gray-500">Duration</p>
              <p className="text-green-600 font-bold mt-2">Free</p>
              <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded mt-4">
                View Course
              </button>
            </div>
            {/* Repeat the above card for each free course */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
