export interface Doctor {
  id: string;
  name: string;
  title: string;
  specialization: string;
  rating: number;
  reviews: number;
  image: string;
  clinics: string[];
  onlineOnly: boolean;
  availability: Availability[];
}

export interface Clinic {
  id: string;
  name: string;
  address: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  workingHours: string;
  phone: string;
  doctors: string[];
}

export interface Availability {
  date: string;
  slots: TimeSlot[];
}

export interface TimeSlot {
  time: string;
  available: boolean;
  clinicId?: string;
}

export interface BookingData {
  appointmentType: 'in-person' | 'video' | null;
  bookingPath: 'doctor' | 'symptoms' | null;
  doctor: Doctor | null;
  clinic: Clinic | null;
  date: string | null;
  time: string | null;
  symptoms: string;
  personalInfo: {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    notes: string;
  };
}