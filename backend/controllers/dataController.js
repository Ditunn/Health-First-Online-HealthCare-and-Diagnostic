import Department from '../models/Department.js';
import Doctor from '../models/Doctor.js';

// @desc    Fetch all departments
// @route   GET /api/data/departments
// @access  Public
const getDepartments = async (req, res) => {
  try {
    const departments = await Department.find({});
    res.json(departments);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Fetch doctors by department
// @route   GET /api/data/departments/:id/doctors
// @access  Public
const getDoctorsByDepartment = async (req, res) => {
  try {
    const doctors = await Doctor.find({ department: req.params.id });
    if (doctors) {
      res.json(doctors);
    } else {
      res.status(404).json({ message: 'No doctors found for this department' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Fetch single doctor by ID
// @route   GET /api/data/doctors/:id
// @access  Public
const getDoctorById = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id).populate(
      'department',
      'name'
    );
    if (doctor) {
      res.json(doctor);
    } else {
      res.status(404).json({ message: 'Doctor not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

export { getDepartments, getDoctorsByDepartment, getDoctorById };
