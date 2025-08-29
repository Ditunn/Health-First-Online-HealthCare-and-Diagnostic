import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { userInfo } = useContext(AuthContext);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        };
        const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/api/appointments/my-appointments`, config);
        setAppointments(data);
      } catch (err) {
        setError('Could not fetch your appointments.');
      } finally {
        setLoading(false);
      }
    };

    if (userInfo) {
      fetchAppointments();
    }
  }, [userInfo]);

  if (loading) return <p className="text-center py-10">Loading your appointments...</p>;
  if (error) return <p className="text-center py-10 text-red-500">{error}</p>;

  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">My Appointments</h1>
      {appointments.length === 0 ? (
        <div className="text-center py-10 bg-white rounded-lg shadow-md">
          <p className="text-gray-600">You have no upcoming appointments.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {appointments.map((appt) => (
            <div key={appt._id} className="bg-white rounded-lg shadow-md p-6 flex flex-col md:flex-row justify-between items-start md:items-center">
              <div>
                <h2 className="text-xl font-bold text-secondary">Dr. {appt.doctor.name}</h2>
                <p className="text-gray-600">{appt.doctor.department.name}</p>
                <p className="text-gray-800 font-semibold mt-2">
                  {new Date(appt.date).toDateString()} at {appt.time}
                </p>
              </div>
              <div className="mt-4 md:mt-0 md:text-right">
                <p className={`font-bold text-lg ${appt.paymentStatus === 'Paid' ? 'text-green-600' : 'text-yellow-600'}`}>
                  {appt.paymentStatus}
                </p>
                <p className="text-sm text-gray-500">Booked on: {new Date(appt.createdAt).toLocaleDateString()}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Appointments;