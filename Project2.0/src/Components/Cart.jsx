import React from "react";

const Cart = ({ cartItems, removeFromCart, buyItem }) => {
  return (
    <div className="flex flex-col items-center p-6 bg-blue-50 rounded-lg shadow-lg mt-8 mx-auto max-w-4xl">
      <h2 className="text-3xl font-bold text-blue-900 mb-6">Cart</h2>
      {cartItems.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div className="p-4 flex flex-col items-center">
                <span className="text-lg font-semibold text-blue-800 mb-2">{item.name}</span>
                <div className="flex space-x-2">
                  <button
                    onClick={() => removeFromCart(item)}
                    className="bg-red-500 text-white py-2 px-4 rounded-full hover:bg-red-600 transition-colors duration-300"
                  >
                    Remove
                  </button>
                  <button
                    onClick={() => buyItem(item)}
                    className="bg-green-500 text-white py-2 px-4 rounded-full hover:bg-green-600 transition-colors duration-300"
                  >
                    Buy
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center">Your cart is empty.</p>
      )}
    </div>
  );
};

export default Cart;
