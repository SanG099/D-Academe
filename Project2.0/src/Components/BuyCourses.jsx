import React, { useState } from "react";
import Loader from './Loader'; // Import Loader component

const BuyCourses = ({ contract, account, addToCart, buyCourse, setLoading }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [cartMessage, setCartMessage] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [contact, setContact] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [selectedCourse, setSelectedCourse] = useState(null);

  const courses = [
    { id: 1, name: "Web Development", description: "Learn to build websites", image: "/images/web-dev.jpg", price: "0.01 ETH" },
    { id: 2, name: "Blockchain Basics", description: "Understand the fundamentals of blockchain", image: "/images/blockchain.jpg", price: "0.05 ETH" },
    { id: 3, name: "Data Science", description: "Analyze data with Python", image: "/images/data-science.jpg", price: "0.02 ETH" },
    { id: 4, name: "Digital Marketing", description: "Grow your business online", image: "/images/digital-marketing.jpg", price: "0.01 ETH" },
  ];

  const filteredCourses = courses.filter(course =>
    course.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleBuyClick = (course) => {
    setSelectedCourse(course);
    setName('');
    setAddress('');
    setContact('');
    setQuantity(1);
  };

  const handleBuyCourse = async (e) => {
    e.preventDefault();
    if (!account) {
      alert("Please connect your wallet to proceed.");
      return;
    }

    setLoading(true); // Show loader
    try {
      await buyCourse(selectedCourse, quantity, name, address, contact);
      setCartMessage(`${selectedCourse.name} purchased successfully!`);
      setSelectedCourse(null);
    } catch (error) {
      console.error("Error buying course:", error.message);
      setCartMessage(`Error buying ${selectedCourse.name}.`);
    } finally {
      setLoading(false); // Hide loader
      setTimeout(() => setCartMessage(""), 3000);
    }
  };

  const handleAddToCart = (course) => {
    setLoading(true); // Show loader
    setCartMessage(`Adding ${course.name} to cart...`);
    addToCart(course)
      .then(() => {
        setCartMessage(`${course.name} added to cart!`);
        setTimeout(() => setCartMessage(""), 3000);
      })
      .catch((error) => {
        console.error("Error adding course to cart:", error.message);
        setCartMessage(`Failed to add ${course.name} to cart.`);
        setTimeout(() => setCartMessage(""), 3000);
      })
      .finally(() => {
        setLoading(false); // Hide loader
      });
  };

  return (
    <div className="container mx-auto py-12 px-6 flex flex-col items-center">
      <Loader />
      {cartMessage && <div className="text-yellow-500 mb-4">{cartMessage}</div>}
      <h2 className="text-3xl font-semibold text-gray-800 mb-6">Buy Courses</h2>

      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search courses"
        className="mb-4 w-full max-w-lg px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
      />

      {selectedCourse && (
        <form onSubmit={handleBuyCourse} className="space-y-4 w-full max-w-lg">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Address"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
          <input
            type="text"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            placeholder="Contact"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-green-800 focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value, 10) || 1)}
            placeholder="Quantity"
            min="1"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
          <div className="flex space-x-4">
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-600"
            >
              Confirm Purchase
            </button>
            <button
              type="button"
              onClick={() => setSelectedCourse(null)}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-600"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      <div className="w-full max-w-3xl grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredCourses.map(course => (
          <div
            key={course.id}
            className="bg-white shadow-lg rounded-lg p-6 flex flex-col md:flex-row items-center"
          >
            <img src={course.image} alt={course.name} className="w-32 h-32 object-cover rounded-lg" />
            <div className="flex flex-col justify-between items-start md:ml-6 mt-4 md:mt-0">
              <h3 className="text-xl font-semibold text-gray-800">{course.name}</h3>
              <p className="text-sm text-gray-500 mb-2">{course.description}</p>
              <p className="text-green-600 font-bold">{course.price}</p>
              <div className="mt-4 flex space-x-2">
                <button
                  onClick={() => handleBuyClick(course)}
                  className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-600"
                >
                  Buy
                </button>
                <button
                  onClick={() => handleAddToCart(course)}
                  className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BuyCourses;
