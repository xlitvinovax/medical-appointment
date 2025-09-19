import { Doctor, Clinic } from '../types';

// Generate availability for the next 30 days
const generateAvailability = (doctorId: string, clinicIds: string[], isOnlineOnly: boolean = false) => {
  const availability = [];
  const today = new Date();
  
  for (let i = 0; i < 30; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    const dateStr = date.toISOString().split('T')[0];
    
    // Skip Sundays
    if (date.getDay() === 0) continue;
    
    const slots = [];
    
    if (isOnlineOnly) {
      // Online doctors have more flexible hours
      const times = ['09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30'];
      times.forEach(time => {
        // Randomly make some slots unavailable for realism
        const available = Math.random() > 0.3;
        slots.push({ time, available });
      });
    } else {
      // In-person doctors have clinic-specific availability
      clinicIds.forEach(clinicId => {
        let times = [];
        
        // Different time slots based on clinic
        if (clinicId === '1') { // Central Medical Center
          times = ['08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30'];
        } else if (clinicId === '2') { // Riverside Health Clinic
          times = ['07:00', '07:30', '08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30', '18:00', '18:30', '19:00', '19:30'];
        } else if (clinicId === '3') { // Eastside Medical Plaza
          times = ['09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30'];
        }
        
        times.forEach(time => {
          // Randomly make some slots unavailable for realism
          const available = Math.random() > 0.25;
          slots.push({ time, available, clinicId });
        });
      });
    }
    
    if (slots.length > 0) {
      availability.push({ date: dateStr, slots });
    }
  }
  
  return availability;
};

export const doctors: Doctor[] = [
  {
    id: '1',
    name: 'Dr. Sarah Johnson',
    title: 'MD',
    specialization: 'Cardiology',
    rating: 4.9,
    reviews: 127,
    image: 'https://images.pexels.com/photos/19218034/pexels-photo-19218034/free-photo-of-smiling-doctor-in-a-lab-coat-and-with-a-stethoscope.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    clinics: ['1', '2'],
    onlineOnly: false,
    availability: generateAvailability('1', ['1', '2'])
  },
  {
    id: '2',
    name: 'Dr. Michael Chen',
    title: 'MD, PhD',
    specialization: 'Neurology',
    rating: 4.8,
    reviews: 89,
    image: 'https://images.ctfassets.net/pdf29us7flmy/1osb6w6u1E2kCJn1voYZOa/777dcded6a415c6a727f5c178db4ef2e/Healthcare_close-up_shot_of_medical_doctor_smiling_-IO27_ADESKO-.jpeg',
    clinics: ['1', '3'],
    onlineOnly: false,
    availability: generateAvailability('2', ['1', '3'])
  },
  {
    id: '3',
    name: 'Dr. Emily Rodriguez',
    title: 'MD',
    specialization: 'Dermatology',
    rating: 4.9,
    reviews: 156,
    image: 'https://images.pexels.com/photos/5327580/pexels-photo-5327580.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
    clinics: ['2', '3'],
    onlineOnly: false,
    availability: generateAvailability('3', ['2', '3'])
  },
  {
    id: '5',
    name: 'Dr. Lisa Thompson',
    title: 'MD',
    specialization: 'Orthopedics',
    rating: 4.8,
    reviews: 94,
    image: 'https://i.pinimg.com/736x/b9/97/a5/b997a530822d0f2c03259070d4590d45.jpg',
    clinics: ['1', '2', '3'],
    onlineOnly: false,
    availability: generateAvailability('5', ['1', '2', '3'])
  },
  {
    id: '6',
    name: 'Dr. Robert Kim',
    title: 'MD',
    specialization: 'Pediatrics',
    rating: 4.9,
    reviews: 178,
    image: 'https://images.pexels.com/photos/5452293/pexels-photo-5452293.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
    clinics: ['1', '3'],
    onlineOnly: false,
    availability: generateAvailability('6', ['1', '3'])
  },
  {
    id: '7',
    name: 'Dr. Amanda Foster',
    title: 'MD, PhD',
    specialization: 'Psychiatry',
    rating: 4.7,
    reviews: 112,
    image: 'https://images.pexels.com/photos/5452201/pexels-photo-5452201.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
    clinics: [],
    onlineOnly: true,
    availability: generateAvailability('7', [], true)
  },
  {
    id: '8',
    name: 'Dr. David Martinez',
    title: 'MD',
    specialization: 'General Practice',
    rating: 4.6,
    reviews: 145,
    image: 'https://images.pexels.com/photos/5327656/pexels-photo-5327656.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
    clinics: ['2', '3'],
    onlineOnly: false,
    availability: generateAvailability('8', ['2', '3'])
  }
];

export const clinics: Clinic[] = [
  {
    id: '1',
    name: 'Central Medical Center',
    address: '123 Main Street, Downtown, NY 10001',
    coordinates: { lat: 40.7589, lng: -73.9851 },
    workingHours: 'Mon-Fri: 8:00 AM - 6:00 PM, Sat: 9:00 AM - 4:00 PM',
    phone: '(555) 123-4567',
    doctors: ['1', '2', '5', '6']
  },
  {
    id: '2',
    name: 'Riverside Health Clinic',
    address: '456 River Road, Riverside, NY 10002',
    coordinates: { lat: 40.7505, lng: -73.9934 },
    workingHours: 'Mon-Sat: 7:00 AM - 8:00 PM, Sun: 9:00 AM - 5:00 PM',
    phone: '(555) 234-5678',
    doctors: ['1', '3', '5', '8']
  },
  {
    id: '3',
    name: 'Eastside Medical Plaza',
    address: '789 East Avenue, Eastside, NY 10003',
    coordinates: { lat: 40.7614, lng: -73.9776 },
    workingHours: 'Mon-Fri: 9:00 AM - 5:00 PM, Sat: 10:00 AM - 3:00 PM',
    phone: '(555) 345-6789',
    doctors: ['2', '3', '5', '6', '8']
  }
];

export const specializations = [
  'General Practice',
  'Cardiology',
  'Dermatology',
  'Neurology',
  'Orthopedics',
  'Pediatrics',
  'Psychiatry',
  'Radiology'
];

export const commonSymptoms = [
  'Headache',
  'Fever',
  'Cough',
  'Chest pain',
  'Shortness of breath',
  'Abdominal pain',
  'Back pain',
  'Joint pain',
  'Skin rash',
  'Fatigue',
  'Dizziness',
  'Nausea',
  'Sore throat',
  'Muscle pain',
  'Sleep problems',
  'Anxiety',
  'Depression',
  'Weight loss',
  'Weight gain',
  'Vision problems'
];