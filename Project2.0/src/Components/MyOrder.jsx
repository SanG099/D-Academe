import React from 'react';

const MyOrder = ({ orders }) => {
  return (
    <div className="flex flex-col items-center py-12 px-6 bg-gray-100 min-h-screen">
      <h2 className="text-4xl font-semibold text-gray-800 mb-6">My Courses</h2>
      {orders.length === 0 ? (
        <p className="text-gray-500">No Enrolled Courses yet.</p>
      ) : (
        <ul className="w-full max-w-lg">
          {orders.map((order, index) => (
            <li
              key={index}
              className="flex flex-col md:flex-row justify-between items-center bg-white text-gray-800 p-4 mb-4 rounded-lg shadow-md"
            >
              <div className="flex flex-col w-full space-y-2">
                <span className="font-bold text-lg">{order.name}</span>
                <span className="text-sm text-gray-600">{order.description}</span>
                <span className="text-sm text-green-500">Quantity: {order.quantity}</span>
                <span className="text-sm text-gray-600">Address: {order.address}</span>
                <span className="text-sm text-gray-600">Contact: {order.contact}</span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyOrder;
