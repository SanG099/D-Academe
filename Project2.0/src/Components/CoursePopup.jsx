import React, { useState } from 'react';

const CoursePopup = ({ course, onClose, handleBuyCourse }) => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [contact, setContact] = useState("");
  const [quantity, setQuantity] = useState(1);

  if (!course) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (typeof handleBuyCourse === 'function') {
      try {
        await handleBuyCourse({
          id: course.id,
          name,
          address,
          contact,
          quantity
        });
      } catch (error) {
        console.error('Error buying course:', error.message);
      }
    } else {
      console.error('handleBuyCourse is not a function');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">{course.title}</h2>
        <p className="text-gray-600 mb-4">{course.description}</p>
        {course.benefits && (
          <ul className="list-disc pl-5 mb-4">
            {course.benefits.map((benefit, index) => (
              <li key={index} className="text-gray-700">{benefit}</li>
            ))}
          </ul>
        )}
        <form onSubmit={handleSubmit} className="space-y-4 mb-4">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            className="w-full px-4 py-2 border border-gray-400 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Address"
            className="w-full px-4 py-2 border border-gray-400 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="text"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            placeholder="Contact"
            className="w-full px-4 py-2 border border-gray-400 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value, 10) || 1)}
            placeholder="Quantity"
            min="1"
            className="w-full px-4 py-2 border border-gray-400 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <div className="flex justify-end space-x-2">
            <button 
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
            >
              Buy
            </button>
            <button 
              type="button"
              onClick={onClose} 
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CoursePopup;
