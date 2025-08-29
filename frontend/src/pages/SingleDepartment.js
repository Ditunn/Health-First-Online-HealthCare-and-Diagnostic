import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const SingleDepartment = () => {
  const { id } = useParams();
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/api/data/departments/${id}/doctors`);
        setDoctors(data);
      } catch (err) {
        setError('Could not fetch doctors for this department.');
      } finally {
        setLoading(false);
      }
    };
    fetchDoctors();
  }, [id]);

  if (loading) return <p className="text-center py-10">Loading doctors...</p>;
  if (error) return <p className="text-center py-10 text-red-500">{error}</p>;

  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-10">Doctors</h1>
      {doctors.length === 0 ? (
        <p className="text-center text-gray-600">No doctors found in this department.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {doctors.map((doctor) => (
            <div key={doctor._id} className="bg-white rounded-lg shadow-lg text-center p-6 transform hover:scale-105 transition-transform duration-300">
              <img 
                src={`${process.env.REACT_APP_API_URL}${doctor.profilePicture}`} 
                alt={doctor.name} 
                className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-primary object-cover"
              />
              <h2 className="text-xl font-bold text-gray-800">{doctor.name}</h2>
              <p className="text-secondary font-medium">{doctor.qualification}</p>
              <p className="text-gray-600 mt-2">{doctor.experience} of experience</p>
              <Link to={`/doctors/${doctor._id}`} className="mt-4 inline-block bg-primary text-white font-semibold px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                View Profile
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SingleDepartment;
