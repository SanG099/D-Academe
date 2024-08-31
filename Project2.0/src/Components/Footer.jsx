import React from "react";

const Footer = () => {
  return (
    <div className="w-full flex items-center justify-center bg-green-400 text-white rounded-full shadow-lg py-4 px-4 mb-1">
      <p>&copy; {new Date().getFullYear()} D-Academe. All rights reserved.</p>
    </div>
  );
}

export default Footer;