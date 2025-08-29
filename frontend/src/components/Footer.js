import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white mt-auto">
      <div className="container mx-auto px-6 py-8 text-center">
        <p>&copy; {new Date().getFullYear()} Health First. All Rights Reserved.</p>
        <p className="text-sm text-gray-400 mt-2">Your health is our top priority.</p>
      </div>
    </footer>
  );
};

export default Footer;