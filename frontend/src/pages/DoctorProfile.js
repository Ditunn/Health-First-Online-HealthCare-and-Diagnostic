import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const DoctorProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { userInfo } = useContext(AuthContext);

  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/api/data/doctors/${id}`);
        setDoctor(data);
      } catch (err) {
        setError('Could not fetch doctor profile.');
      } finally {
        setLoading(false);
      }
    };
    fetchDoctor();
  }, [id]);

  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  const handleBooking = async () => {
    if (!userInfo) {
      navigate('/login');
      return;
    }

    if (!selectedDate || !selectedTime) {
      alert('Please select a date and time.');
      return;
    }

    const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js');
    if (!res) {
      alert('Razorpay SDK failed to load. Are you online?');
      return;
    }

    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      
      const { data: order } = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/appointments/create-order`,
        {
          doctorId: doctor._id,
          date: selectedDate,
          time: selectedTime,
          consultationFee: doctor.consultationFee,
        },
        config
      );

      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY_ID,
        amount: order.amount.toString(),
        currency: order.currency,
        name: 'Health First',
        description: `Appointment with ${doctor.name}`,
        order_id: order.id,
        handler: async function (response) {
          const verificationData = {
            order_id: response.razorpay_order_id,
            payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            appointmentId: order.appointmentId,
          };

          await axios.post(
            `${process.env.REACT_APP_API_URL}/api/appointments/verify-payment`,
            verificationData,
            config
          );
          
          alert('Appointment booked successfully!');
          navigate('/my-appointments');
        },
        prefill: {
          name: userInfo.name,
          email: userInfo.email,
        },
        theme: {
          color: '#2563eb',
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (err) {
      console.error(err);
      alert('An error occurred during booking.');
    }
  };

  if (loading) return <p className="text-center py-10">Loading profile...</p>;
  if (error) return <p className="text-center py-10 text-red-500">{error}</p>;
  if (!doctor) return <p className="text-center py-10">Doctor not found.</p>;

  const availableDates = doctor.availableSlots.map(slot => slot.date);
  const timesForSelectedDate = doctor.availableSlots.find(s => s.date === selectedDate)?.slots || [];

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="bg-white rounded-lg shadow-xl p-8 md:flex">
        <div className="md:w-1/3 text-center">
          <img 
            src={`${process.env.REACT_APP_API_URL}${doctor.profilePicture}`} 
            alt={doctor.name} 
            className="w-48 h-48 rounded-full mx-auto mb-4 border-4 border-primary object-cover"
          />
          <h1 className="text-3xl font-bold text-gray-800">{doctor.name}</h1>
          <p className="text-secondary font-semibold text-lg">{doctor.qualification}</p>
          <p className="text-gray-600 mt-2">{doctor.department.name}</p>
        </div>
        <div className="md:w-2/3 md:pl-8 mt-8 md:mt-0">
          <h2 className="text-2xl font-bold text-gray-700 border-b pb-2">About</h2>
          <p className="text-gray-600 mt-4">{doctor.bio}</p>
          <div className="mt-6">
            <p><span className="font-semibold">Experience:</span> {doctor.experience}</p>
            <p><span className="font-semibold">Consultation Fee:</span> ₹{doctor.consultationFee}</p>
          </div>

          <div className="mt-8">
            <h3 className="text-xl font-bold text-gray-700">Book an Appointment</h3>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Select Date</label>
                <select onChange={(e) => { setSelectedDate(e.target.value); setSelectedTime(''); }} value={selectedDate} className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary">
                  <option value="">-- Choose a date --</option>
                  {availableDates.map(date => <option key={date} value={date}>{date}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Select Time</label>
                <select onChange={(e) => setSelectedTime(e.target.value)} value={selectedTime} disabled={!selectedDate} className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary disabled:bg-gray-200">
                  <option value="">-- Choose a time --</option>
                  {timesForSelectedDate.map(slot => (
                    <option key={slot.time} value={slot.time} disabled={slot.isBooked}>
                      {slot.time} {slot.isBooked ? '(Booked)' : ''}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <button onClick={handleBooking} disabled={!selectedDate || !selectedTime} className="mt-6 w-full py-3 px-4 text-white bg-accent rounded-md hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent disabled:bg-gray-400">
              Book Now & Pay ₹{doctor.consultationFee}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;