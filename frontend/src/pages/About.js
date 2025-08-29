import React from 'react';
// Step 1: Import your local image
import aboutImage from '../assets/about-us-image.jpg';

const About = () => {
    return (
        <div className="container mx-auto px-6 py-12">
            <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">About Health First</h1>
            <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg flex flex-col md:flex-row items-center gap-8">
                {/* Image Column */}
                <div className="md:w-1/3">
                    <img 
                        // Step 2: Use the imported image variable here
                        src={aboutImage} 
                        alt="Our Mission" 
                        className="rounded-lg shadow-md w-full h-full object-cover"
                    />
                </div>
                {/* Text Column */}
                <div className="md:w-2/3">
                    <p className="text-gray-700 text-lg leading-relaxed">
                        Health First is a revolutionary platform dedicated to simplifying healthcare access for everyone. Our mission is to connect patients with the best doctors and specialists without the usual hassle of traditional appointment booking. We believe that managing your health should be straightforward and stress-free.
                    </p>
                    <p className="text-gray-700 text-lg leading-relaxed mt-4">
                        Address: Khalisani, Rajapur, Howrah, 711000, West Bengal, India. 9177648999, 9898234511
                    </p>
                </div>
            </div>
        </div>
    );
};

export default About;