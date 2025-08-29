import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Department from '../models/Department.js';
import Doctor from '../models/Doctor.js';
import connectDB from '../config/db.js';

dotenv.config();

connectDB();

const importData = async () => {
  try {
    await Department.deleteMany();
    await Doctor.deleteMany();

    const departments = await Department.insertMany([
      {
        name: 'Cardiology',
        description: 'Specializing in heart and blood vessel disorders.',
        imageUrl: '/images/cardiology.jpg',
      },
      {
        name: 'Neurology',
        description: 'Treatment of nervous system disorders.',
        imageUrl: '/images/neurology.jpg',
      },
      {
        name: 'Orthopedics',
        description: 'Focused on the musculoskeletal system.',
        imageUrl: '/images/orthopedics.jpg',
      },
    ]);

    const cardiologyId = departments[0]._id;
    const neurologyId = departments[1]._id;
    const orthopedicsId = departments[2]._id;

    const doctors = [
      // Cardiology
      {
        name: 'Dr. Anjali Sharma', // New Name
        qualification: 'MD, FACC',
        experience: '15 years',
        department: cardiologyId,
        profilePicture: '/images/dr-anjali-sharma.jpg',
        bio: 'Dr. Sharma is a leading expert in interventional cardiology with over a decade of experience in treating complex heart conditions.',
        consultationFee: 1500,
        availableSlots: [
            { date: '2025-09-10', slots: [{ time: '10:00 AM' }, { time: '11:00 AM' }] },
            { date: '2025-09-11', slots: [{ time: '02:00 PM' }, { time: '03:00 PM' }] }
        ]
      },
      {
        name: 'Dr. Vikram Singh', // New Name
        qualification: 'MBBS, DNB (Cardiology)',
        experience: '12 years',
        department: cardiologyId,
        profilePicture: '/images/dr-vikram-singh.jpg',
        bio: 'Dr. Singh specializes in non-invasive cardiology and is renowned for his patient-centric approach to cardiac care.',
        consultationFee: 1200,
        availableSlots: [
            { date: '2025-09-10', slots: [{ time: '09:00 AM' }, { time: '10:30 AM' }] },
            { date: '2025-09-12', slots: [{ time: '01:00 PM' }, { time: '02:30 PM' }] }
        ]
      },
      // Neurology
      {
        name: 'Dr. Shubham Das', // New Name
        qualification: 'MD, PhD (Neurology)',
        experience: '18 years',
        department: neurologyId,
        profilePicture: '/images/dr-shubham-das.jpg',
        bio: 'A pioneer in stroke research and treatment, Dr. Patel has published numerous papers and is a respected figure in her field.',
        consultationFee: 2000,
        availableSlots: [
            { date: '2025-09-10', slots: [{ time: '11:00 AM' }, { time: '12:00 PM' }] },
        ]
      },
      {
        name: 'Dr. Rohan Gupta', // New Name
        qualification: 'MBBS, DM (Neurology)',
        experience: '10 years',
        department: neurologyId,
        profilePicture: '/images/dr-rohan-gupta.jpg',
        bio: 'Dr. Gupta focuses on movement disorders and has extensive experience with deep brain stimulation techniques.',
        consultationFee: 1800,
        availableSlots: [
            { date: '2025-09-11', slots: [{ time: '03:00 PM' }, { time: '04:00 PM' }] }
        ]
      },
      // Orthopedics
      {
        name: 'Dr. Aisha Khan', // New Name
        qualification: 'MS (Orthopedics)',
        experience: '14 years',
        department: orthopedicsId,
        profilePicture: '/images/dr-aisha-khan.jpg',
        bio: 'Specializing in sports injuries and joint replacement surgery, Dr. Khan is dedicated to helping patients regain mobility.',
        consultationFee: 1300,
        availableSlots: [
            { date: '2025-09-12', slots: [{ time: '10:00 AM' }, { time: '11:30 AM' }] }
        ]
      },
      {
        name: 'Dr. Sameer Verma', // New Name
        qualification: 'D.Ortho, DNB',
        experience: '9 years',
        department: orthopedicsId,
        profilePicture: '/images/dr-sameer-verma.jpg',
        bio: 'Dr. Verma is an expert in pediatric orthopedics and complex trauma care, known for his compassionate treatment of young patients.',
        consultationFee: 1100,
        availableSlots: [
            { date: '2025-09-10', slots: [{ time: '04:00 PM' }] },
            { date: '2025-09-12', slots: [{ time: '09:30 AM' }] }
        ]
      },
    ];

    await Doctor.insertMany(doctors);

    console.log('Data Imported!');
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

importData();