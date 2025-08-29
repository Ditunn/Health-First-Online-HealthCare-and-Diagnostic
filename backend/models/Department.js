import mongoose from 'mongoose';

const departmentSchema = mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
});

const Department = mongoose.model('Department', departmentSchema);
export default Department;