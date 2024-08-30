import React, { useState, useEffect } from 'react';

const Loader = () => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Set a timer to hide the loader after 10 seconds
    const timer = setTimeout(() => {
      setVisible(false);
    }, 100); // 10000 milliseconds = 10 seconds

    // Clean up the timer if the component is unmounted
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null; // If not visible, return nothing

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-12 h-12 border-4 border-t-4 border-gray-300 border-solid rounded-full animate-spin border-t-cyan-600"></div>
    </div>
  );
};

export default Loader;