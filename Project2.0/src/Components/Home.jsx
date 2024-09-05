import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import tokenImage from '../assets/Token.png';
import cartImg from '../assets/Cart.png';
import buyImg from '../assets/courses.png';
import courseImg from '../assets/images.jpeg';
import CoursePopup from '../Components/CoursePopup';

const Home = ({ contract, account }) => {
  const navigate = useNavigate();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);

  useEffect(() => {
    if (!contract || !account) {
      console.log('Contract or account is not available.');
    } else {
      console.log('Wallet is connected.');
      console.log('Contract:', contract);
      console.log('Account:', account);
    }
  }, [contract, account]);

  const goToBuyToken = () => navigate('/buy-token');
  const goToCart = () => navigate('/Cart');
  const goToBuyCourses = () => navigate('/BuyCourses');

  const courseDetails = {
    id: 1,
    title: 'Solidity',
    description: 'Learn the basics of Solidity and smart contract development.',
    benefits: [
      'Understand the fundamentals of blockchain development',
      'Gain hands-on experience with smart contracts',
      'Get certified in blockchain programming',
    ],
  };

  const openPopup = (course) => {
    setSelectedCourse(course);
    setIsPopupOpen(true);
  };

  const closePopup = () => setIsPopupOpen(false);

  const handleBuy = async ({ id, name, address, contact, quantity }) => {
    if (!contract || !account) {
      alert('Contract or account not found');
      return;
    }

    try {
      await contract.methods.buyCourse(id, name, address, contact, quantity).send({ from: account });
      alert('Course purchased successfully!');
      closePopup();
    } catch (error) {
      console.error('Error buying course:', error.message);
      alert('Error purchasing course. Please try again.');
    }
  };

  const InfoCard = ({ icon, title, description }) => (
    <div className="flex flex-col items-center p-6 bg-gray-100 hover:bg-green-300 rounded-lg shadow-lg">
      <div className="text-green-600 text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );

  const CourseCard = ({ imgSrc, title, instructor, duration, price, onClick }) => (
    <div className="bg-white p-4 rounded-lg shadow-lg">
      <img src={imgSrc} alt="Course Image" className="w-full h-40 object-cover rounded-t-lg" />
      <h3 className="text-lg font-semibold mt-4">{title}</h3>
      <p className="text-sm text-gray-500 mt-2">{instructor}</p>
      <p className="text-sm text-gray-500">{duration}</p>
      <p className={`font-bold mt-2 ${price === 'Free' ? 'text-green-600' : ''}`}>{price}</p>
      <button
        onClick={onClick}
        className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded mt-4"
      >
        View Course
      </button>
    </div>
  );

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

        {/* Informational Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <InfoCard
            icon="🎓"
            title="Earn Certificates"
            description="Validate Your Skills, Open Doors: Earn Industry-Recognized Certificates!"
          />
          <InfoCard
            icon="💸"
            title="Free & Freemium Courses"
            description="Unlock Maximum Benefits: Free and Freemium Courses for Practical Knowledge!"
          />
          <InfoCard
            icon="👨‍🏫"
            title="Industry Experts"
            description="Elevate Your Professional Growth: Learn from Industry Experts and Practitioners!"
          />
        </div>

        {/* Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-100">
          <CourseCard
            imgSrc={tokenImage}
            title="Buy Token"
            description="Purchase tokens to access premium content and courses."
            onClick={goToBuyToken}
          />
          <CourseCard
            imgSrc={cartImg}
            title="Cart"
            description="View the courses and content in your cart."
            onClick={goToCart}
          />
          <CourseCard
            imgSrc={buyImg}
            title="Buy Courses"
            description="Browse and purchase our courses to enhance your skills."
            onClick={goToBuyCourses}
          />
        </div>

        {/* Featured Courses Section */}
        <div className="mt-12">
          <h2 className="text-3xl font-bold text-green-600 mb-4">Featured Courses</h2>
          <p className="text-gray-600 mb-8">Expand Your Skills: Explore our Featured Online Courses!</p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <CourseCard
              imgSrc={courseImg}
              title="Solidity"
              instructor="Suyan Thapa"
              duration="12hrs 30min"
              price="Tkn 65"
              onClick={() => openPopup(courseDetails)}
            />
            {/* Add more cards as needed */}
          </div>
        </div>

        {/* Free Courses Section */}
        <div className="mt-12">
          <h2 className="text-3xl font-bold text-green-600 mb-4">Free Courses</h2>
          <p className="text-gray-600 mb-8">Expand Your Skills: Explore Free Online Courses!</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <CourseCard
              imgSrc="CourseImg.jpeg"
              title="Write HelloWorld"
              instructor="Instructor Name"
              duration="Duration"
              price="Free"
              onClick={() => alert('Viewing HelloWorld Course')}
            />
            {/* Add more cards as needed */}
          </div>
        </div>

        {/* Course Popup */}
        {isPopupOpen && (
          <CoursePopup course={selectedCourse} onClose={closePopup} handleBuyCourse={handleBuy} />
        )}
      </div>
    </section>
  );
};

export default Home;
