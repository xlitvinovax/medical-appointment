import React, { useState } from 'react';
import { ArrowLeft, Stethoscope } from 'lucide-react';
import { BookingData } from './types';
import HomePage from './components/HomePage';
import ProgressBar from './components/ProgressBar';
import AppointmentTypeSelection from './components/AppointmentTypeSelection';
import BookingPathSelection from './components/BookingPathSelection';
import DoctorSelection from './components/DoctorSelection';
import SymptomInput from './components/SymptomInput';
import ClinicMap from './components/ClinicMap';
import DateTimeSelection from './components/DateTimeSelection';
import PersonalInfoForm from './components/PersonalInfoForm';
import ConfirmationPage from './components/ConfirmationPage';

type Step = 'home' | 'appointment-type' | 'booking-path' | 'doctor-selection' | 'symptom-input' | 'clinic-map' | 'date-time' | 'personal-info' | 'confirmation';

export default function App() {
  const [currentStep, setCurrentStep] = useState<Step>('home');
  const [bookingData, setBookingData] = useState<BookingData>({
    appointmentType: null,
    bookingPath: null,
    doctor: null,
    clinic: null,
    date: null,
    time: null,
    symptoms: '',
    personalInfo: {
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
      notes: ''
    }
  });

  const stepLabels = ['Type', 'Path', 'Doctor', 'Location', 'Time', 'Info', 'Confirm'];
  const stepOrder: Step[] = ['appointment-type', 'booking-path', 'doctor-selection', 'clinic-map', 'date-time', 'personal-info', 'confirmation'];
  
  const getCurrentStepNumber = () => {
    if (currentStep === 'home') return 0;
    if (currentStep === 'symptom-input') return 3; // Same as doctor-selection
    return stepOrder.indexOf(currentStep) + 1;
  };

  const resetBooking = () => {
    setBookingData({
      appointmentType: null,
      bookingPath: null,
      doctor: null,
      clinic: null,
      date: null,
      time: null,
      symptoms: '',
      personalInfo: {
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        notes: ''
      }
    });
    setCurrentStep('home');
  };

  const handleBack = () => {
    switch (currentStep) {
      case 'appointment-type':
        setCurrentStep('home');
        break;
      case 'booking-path':
        setCurrentStep('appointment-type');
        break;
      case 'doctor-selection':
      case 'symptom-input':
        setCurrentStep('booking-path');
        break;
      case 'clinic-map':
        setCurrentStep(bookingData.bookingPath === 'doctor' ? 'doctor-selection' : 'symptom-input');
        break;
      case 'date-time':
        if (bookingData.appointmentType === 'video') {
          setCurrentStep(bookingData.bookingPath === 'doctor' ? 'doctor-selection' : 'symptom-input');
        } else {
          setCurrentStep('clinic-map');
        }
        break;
      case 'personal-info':
        setCurrentStep('date-time');
        break;
      case 'confirmation':
        setCurrentStep('personal-info');
        break;
    }
  };

  const showHeader = currentStep !== 'home' && currentStep !== 'confirmation';
  const showProgressBar = currentStep !== 'home' && currentStep !== 'confirmation';

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      {showHeader && (
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <button
                  onClick={handleBack}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200 mr-4"
                >
                  <ArrowLeft className="h-5 w-5 text-gray-600" />
                </button>
                <div className="flex items-center">
                  <Stethoscope className="h-8 w-8 text-blue-600 mr-3" />
                  <h1 className="text-2xl font-bold text-gray-900">MediCare Plus</h1>
                </div>
              </div>
            </div>
          </div>
        </header>
      )}

      {/* Progress Bar */}
      {showProgressBar && (
        <ProgressBar
          currentStep={getCurrentStepNumber()}
          totalSteps={stepLabels.length}
          stepLabels={stepLabels}
        />
      )}

      {/* Main Content */}
      <main className="pb-8">
        {currentStep === 'home' && (
          <HomePage onStartBooking={() => setCurrentStep('appointment-type')} />
        )}

        {currentStep === 'appointment-type' && (
          <AppointmentTypeSelection
            selectedType={bookingData.appointmentType}
            onSelect={(type) => setBookingData({ ...bookingData, appointmentType: type })}
            onNext={() => setCurrentStep('booking-path')}
          />
        )}

        {currentStep === 'booking-path' && (
          <BookingPathSelection
            selectedPath={bookingData.bookingPath}
            onSelect={(path) => setBookingData({ ...bookingData, bookingPath: path })}
            onNext={() => setCurrentStep(bookingData.bookingPath === 'doctor' ? 'doctor-selection' : 'symptom-input')}
          />
        )}

        {currentStep === 'doctor-selection' && (
          <DoctorSelection
            appointmentType={bookingData.appointmentType!}
            selectedDoctor={bookingData.doctor}
            onSelect={(doctor) => setBookingData({ ...bookingData, doctor })}
            onNext={() => {
              if (bookingData.appointmentType === 'video') {
                setCurrentStep('date-time');
              } else {
                setCurrentStep('clinic-map');
              }
            }}
          />
        )}

        {currentStep === 'symptom-input' && (
          <SymptomInput
            symptoms={bookingData.symptoms}
            selectedDoctor={bookingData.doctor}
            onSymptomsChange={(symptoms) => setBookingData({ ...bookingData, symptoms })}
            onDoctorSelect={(doctor) => setBookingData({ ...bookingData, doctor })}
            onNext={() => {
              if (bookingData.appointmentType === 'video') {
                setCurrentStep('date-time');
              } else {
                setCurrentStep('clinic-map');
              }
            }}
          />
        )}

        {currentStep === 'clinic-map' && bookingData.doctor && (
          <ClinicMap
            selectedClinic={bookingData.clinic}
            onSelect={(clinic) => setBookingData({ ...bookingData, clinic })}
            onNext={() => setCurrentStep('date-time')}
            doctorClinics={bookingData.doctor.clinics}
          />
        )}

        {currentStep === 'date-time' && bookingData.doctor && (
          <DateTimeSelection
            doctor={bookingData.doctor}
            clinic={bookingData.clinic}
            selectedDate={bookingData.date}
            selectedTime={bookingData.time}
            onDateSelect={(date) => setBookingData({ ...bookingData, date })}
            onTimeSelect={(time) => setBookingData({ ...bookingData, time })}
            onNext={() => setCurrentStep('personal-info')}
          />
        )}

        {currentStep === 'personal-info' && (
          <PersonalInfoForm
            personalInfo={bookingData.personalInfo}
            onUpdate={(field, value) => 
              setBookingData({
                ...bookingData,
                personalInfo: { ...bookingData.personalInfo, [field]: value }
              })
            }
            onNext={() => setCurrentStep('confirmation')}
          />
        )}

        {currentStep === 'confirmation' && (
          <ConfirmationPage
            bookingData={bookingData}
            onNewBooking={resetBooking}
          />
        )}
      </main>
    </div>
  );
}