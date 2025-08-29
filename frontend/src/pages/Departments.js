import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Departments = () => {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/api/data/departments`);
        setDepartments(data);
      } catch (err) {
        setError('Could not fetch departments.');
      } finally {
        setLoading(false);
      }
    };
    fetchDepartments();
  }, []);

  if (loading) return <p className="text-center py-10">Loading...</p>;
  if (error) return <p className="text-center py-10 text-red-500">{error}</p>;

  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-10">Our Departments</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {departments.map((dept) => (
          <div key={dept._id} className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300">
            <img 
              src={`${process.env.REACT_APP_API_URL}${dept.imageUrl}`} 
              alt={dept.name} 
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h2 className="text-xl font-bold text-secondary mb-2">{dept.name}</h2>
              <p className="text-gray-600 mb-4">{dept.description}</p>
              <Link to={`/departments/${dept._id}`} className="inline-block bg-primary text-white font-semibold px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                View Doctors
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Departments;