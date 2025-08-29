import Razorpay from 'razorpay';
import shortid from 'shortid';
import Appointment from '../models/Appointment.js';
import Doctor from '../models/Doctor.js';

// @desc    Create Razorpay order and initial appointment
// @route   POST /api/appointments/create-order
// @access  Private
const createRazorpayOrder = async (req, res) => {
  // Initialize Razorpay here, so it only runs when needed
  const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });

  const { doctorId, date, time, consultationFee } = req.body;

  const payment_capture = 1;
  const amount = consultationFee * 100; // amount in the smallest currency unit
  const currency = 'INR';

  const options = {
    amount: amount,
    currency,
    receipt: shortid.generate(),
    payment_capture,
  };

  try {
    const response = await razorpay.orders.create(options);

    // Create a pending appointment
    const appointment = new Appointment({
      user: req.user._id,
      doctor: doctorId,
      date,
      time,
      consultationFee,
      paymentStatus: 'Pending',
      razorpayOrderId: response.id,
    });

    await appointment.save();

    res.json({
      id: response.id,
      currency: response.currency,
      amount: response.amount,
      appointmentId: appointment._id
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Something went wrong!');
  }
};

// @desc    Verify payment and update appointment
// @route   POST /api/appointments/verify-payment
// @access  Private
const verifyPayment = async (req, res) => {
    const crypto = await import('crypto');
    const { order_id, payment_id, razorpay_signature, appointmentId } = req.body;

    const key_secret = process.env.RAZORPAY_KEY_SECRET;
    
    let hmac = crypto.createHmac('sha256', key_secret); 
    hmac.update(order_id + "|" + payment_id);
    const generated_signature = hmac.digest('hex');

    if(generated_signature === razorpay_signature){
        const appointment = await Appointment.findById(appointmentId);
        if (appointment) {
            appointment.paymentStatus = 'Paid';
            appointment.razorpayPaymentId = payment_id;
            
            // Mark the slot as booked
            const doctor = await Doctor.findById(appointment.doctor);
            if(doctor) {
                const dateSlot = doctor.availableSlots.find(s => s.date === appointment.date);
                if(dateSlot) {
                    const timeSlot = dateSlot.slots.find(t => t.time === appointment.time);
                    if(timeSlot) {
                        timeSlot.isBooked = true;
                        await doctor.save();
                    }
                }
            }

            await appointment.save();
            res.status(200).json({ message: 'Payment verified successfully' });
        } else {
            res.status(404).json({ message: 'Appointment not found' });
        }
    } else {
        res.status(400).json({ message: 'Payment verification failed' });
    }
};


// @desc    Get logged in user's appointments
// @route   GET /api/appointments/my-appointments
// @access  Private
const getUserAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({ user: req.user._id })
      .populate('doctor', 'name qualification department')
      .populate({
        path: 'doctor',
        populate: {
          path: 'department',
          model: 'Department',
          select: 'name'
        }
      })
      .sort({ createdAt: -1 });
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

export { createRazorpayOrder, verifyPayment, getUserAppointments };