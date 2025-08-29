import mongoose from 'mongoose';

const appointmentSchema = mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    doctor: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Doctor' },
    date: { type: String, required: true },
    time: { type: String, required: true },
    consultationFee: { type: Number, required: true },
    paymentStatus: { type: String, required: true, default: 'Pending' },
    razorpayOrderId: { type: String },
    razorpayPaymentId: { type: String },
  },
  { timestamps: true }
);

const Appointment = mongoose.model('Appointment', appointmentSchema);
export default Appointment;