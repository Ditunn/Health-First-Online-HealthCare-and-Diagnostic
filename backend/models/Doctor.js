import mongoose from 'mongoose';

const doctorSchema = mongoose.Schema({
  name: { type: String, required: true },
  qualification: { type: String, required: true },
  experience: { type: String, required: true }, // e.g., "5 years"
  department: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Department',
  },
  profilePicture: { type: String, required: true },
  bio: { type: String, required: true },
  consultationFee: { type: Number, required: true },
  availableSlots: [
    {
      date: { type: String }, // "YYYY-MM-DD"
      slots: [{ time: String, isBooked: {type: Boolean, default: false} }], // "10:00 AM"
    },
  ],
});

const Doctor = mongoose.model('Doctor', doctorSchema);
export default Doctor;