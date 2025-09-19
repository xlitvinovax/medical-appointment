import React from 'react';
import { CheckCircle, Calendar, Clock, MapPin, Video, User, Phone, Mail } from 'lucide-react';
import { BookingData } from '../types';
import { clinics } from '../data/mockData';

interface ConfirmationPageProps {
  bookingData: BookingData;
  onNewBooking: () => void;
}

export default function ConfirmationPage({ bookingData, onNewBooking }: ConfirmationPageProps) {
  const clinic = bookingData.clinic ? clinics.find(c => c.id === bookingData.clinic!.id) : null;
  
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-8">
        <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="h-12 w-12 text-green-600" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Appointment Confirmed!</h2>
        <p className="text-lg text-gray-600">
          Your appointment has been successfully booked. You'll receive a confirmation via SMS and email.
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="bg-blue-600 text-white px-6 py-4">
          <h3 className="text-xl font-semibold">Appointment Details</h3>
        </div>
        
        <div className="p-6 space-y-6">
          {/* Doctor Information */}
          <div className="flex items-center">
            <img
              src={bookingData.doctor!.image}
              alt={bookingData.doctor!.name}
              className="w-16 h-16 rounded-full object-cover mr-4"
            />
            <div>
              <h4 className="text-xl font-semibold text-gray-900">{bookingData.doctor!.name}</h4>
              <p className="text-blue-600">{bookingData.doctor!.specialization}</p>
              <p className="text-gray-500">{bookingData.doctor!.title}</p>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Date & Time */}
              <div className="flex items-start">
                <Calendar className="h-6 w-6 text-blue-600 mr-3 mt-1" />
                <div>
                  <h5 className="font-semibold text-gray-900">Date & Time</h5>
                  <p className="text-gray-600">{formatDate(bookingData.date!)}</p>
                  <p className="text-gray-600">{bookingData.time}</p>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-start">
                {bookingData.appointmentType === 'video' ? (
                  <Video className="h-6 w-6 text-blue-600 mr-3 mt-1" />
                ) : (
                  <MapPin className="h-6 w-6 text-blue-600 mr-3 mt-1" />
                )}
                <div>
                  <h5 className="font-semibold text-gray-900">
                    {bookingData.appointmentType === 'video' ? 'Video Consultation' : 'Location'}
                  </h5>
                  {bookingData.appointmentType === 'video' ? (
                    <p className="text-gray-600">Online video call</p>
                  ) : (
                    <>
                      <p className="text-gray-600">{clinic?.name}</p>
                      <p className="text-gray-600 text-sm">{clinic?.address}</p>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Patient Information */}
          <div className="border-t border-gray-200 pt-6">
            <h5 className="font-semibold text-gray-900 mb-4">Patient Information</h5>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center">
                <User className="h-5 w-5 text-gray-400 mr-3" />
                <span className="text-gray-600">
                  {bookingData.personalInfo.firstName} {bookingData.personalInfo.lastName}
                </span>
              </div>
              <div className="flex items-center">
                <Phone className="h-5 w-5 text-gray-400 mr-3" />
                <span className="text-gray-600">{bookingData.personalInfo.phone}</span>
              </div>
              {bookingData.personalInfo.email && (
                <div className="flex items-center">
                  <Mail className="h-5 w-5 text-gray-400 mr-3" />
                  <span className="text-gray-600">{bookingData.personalInfo.email}</span>
                </div>
              )}
            </div>
            
            {bookingData.personalInfo.notes && (
              <div className="mt-4">
                <h6 className="font-medium text-gray-900 mb-2">Notes</h6>
                <p className="text-gray-600 bg-gray-50 rounded-lg p-3">{bookingData.personalInfo.notes}</p>
              </div>
            )}
          </div>

          {bookingData.symptoms && (
            <div className="border-t border-gray-200 pt-6">
              <h5 className="font-semibold text-gray-900 mb-2">Symptoms</h5>
              <p className="text-gray-600 bg-gray-50 rounded-lg p-3">{bookingData.symptoms}</p>
            </div>
          )}
        </div>
      </div>

      {/* Next Steps */}
      <div className="bg-blue-50 rounded-xl p-6 mt-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">What's Next?</h3>
        <div className="space-y-3 text-gray-600">
          <div className="flex items-start">
            <span className="bg-blue-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center mr-3 mt-0.5">1</span>
            <p>You'll receive a confirmation SMS and email with appointment details</p>
          </div>
          <div className="flex items-start">
            <span className="bg-blue-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center mr-3 mt-0.5">2</span>
            <p>
              {bookingData.appointmentType === 'video' 
                ? 'A video call link will be sent to you before the appointment'
                : 'Please arrive 15 minutes early for check-in'
              }
            </p>
          </div>
          <div className="flex items-start">
            <span className="bg-blue-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center mr-3 mt-0.5">3</span>
            <p>If you need to reschedule or cancel, please call us at least 24 hours in advance</p>
          </div>
        </div>
      </div>

      <div className="flex justify-center mt-8">
        <button
          onClick={onNewBooking}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-xl transition-colors duration-200"
        >
          Book Another Appointment
        </button>
      </div>
    </div>
  );
}