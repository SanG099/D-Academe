import React, { useState } from 'react';

const Courses = () => {
  const [courses] = useState([
    { id: 1, name: "Web Development", description: "Learn to build websites", image: "/images/web-dev.jpg", price: "0.01 ETH" },
    { id: 2, name: "Blockchain Basics", description: "Understand the fundamentals of blockchain", image: "/images/blockchain.jpg", price: "0.05 ETH" },
    { id: 3, name: "Data Science", description: "Analyze data with Python", image: "/images/data-science.jpg", price: "0.02 ETH" },
    { id: 4, name: "Digital Marketing", description: "Grow your business online", image: "/images/digital-marketing.jpg", price: "0.01 ETH" },
  ]);

  return (
    <section className="bg-gray-100 min-h-screen py-12 px-6 flex flex-col items-center">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">Available Courses</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl">
        {courses.map(course => (
          <div key={course.id} className="bg-white shadow-lg rounded-lg overflow-hidden flex flex-col">
            <img src={course.image} alt={course.name} className="w-full h-48 object-cover" />
            <div className="p-4 flex-1 flex flex-col justify-between">
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-2">{course.name}</h2>
                <p className="text-gray-600 mb-4">{course.description}</p>
                <p className="text-green-600 font-bold">{course.price}</p>
              </div>
              <button
                className="mt-4 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 transition-colors"
              >
                Enroll Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Courses;
