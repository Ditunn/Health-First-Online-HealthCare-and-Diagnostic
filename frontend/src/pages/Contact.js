import React from 'react';
import Chatboat from '../components/Chatboat'

const Contact = () => {
    return (
        <div className="container mx-auto px-6 py-12">
            <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Contact Us</h1>
            <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg">
                <p className="text-center text-gray-700 mb-6">Have questions? We'd love to hear from you. Reach out to us through the form below.</p>
                <form>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">Name</label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" placeholder="Your Name" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email</label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" placeholder="Your Email" />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="message">Message</label>
                        <textarea className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="message" rows="5" placeholder="Your Message"></textarea>
                    </div>
                    <div className="flex items-center justify-center">
                        <button className="bg-primary hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg focus:outline-none focus:shadow-outline" type="button">
                            Send Message
                        </button>
                    </div>
                </form>
            </div>
        <div className='absolute bottom-5 left-290 w-1/4 rounded-xl'>
            <Chatboat/>
        </div>
        </div>
    );
};

export default Contact;
