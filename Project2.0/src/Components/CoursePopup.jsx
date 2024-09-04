// components/CoursePopup.js
import React from 'react';

const CoursePopup = ({ course, onClose, onBuy }) => {
  if (!course) return null; // Do not render if there's no course selected

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">{course.title}</h2>
        <p className="text-gray-600 mb-4">{course.description}</p>
        <ul className="list-disc pl-5 mb-4">
          {course.benefits.map((benefit, index) => (
            <li key={index} className="text-gray-700">{benefit}</li>
          ))}
        </ul>
        <div className="flex justify-end space-x-2">
          <button 
            onClick={onBuy} 
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
          >
            Buy
          </button>
          <button 
            onClick={onClose} 
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default CoursePopup;
