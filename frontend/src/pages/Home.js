import React from 'react';
import { Link } from 'react-router-dom';
// Step 1: Import the image from your assets folder
import heroBackground from '../assets/hero-background.jpg';

const Home = () => {
  return (
    <div className="text-center">
      {/* Hero Section */}
      <section
        className="text-white py-20 bg-cover bg-center relative"
        // Step 2: Use the imported image variable in the style
        style={{ backgroundImage: `url(${heroBackground})` }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-blue-800 opacity-60"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <h1 className="text-5xl font-bold mb-4">Your Health, Our Priority</h1>
          <p className="text-lg mb-8">Book appointments with top doctors seamlessly and securely.</p>
          <Link to="/departments" className="bg-white text-primary font-bold py-3 px-6 rounded-full hover:bg-gray-200 transition-transform transform hover:scale-105">
            Book an Appointment
          </Link>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 bg-white rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-2 text-secondary">1. Find a Doctor</h3>
              <p className="text-gray-600">Browse through our list of specialized departments and expert doctors.</p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-2 text-secondary">2. Book an Appointment</h3>
              <p className="text-gray-600">Select a convenient date and time slot and confirm your booking.</p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-2 text-secondary">3. Secure Payment</h3>
              <p className="text-gray-600">Complete your booking with our secure online payment gateway.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;