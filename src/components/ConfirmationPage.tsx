import React, { useState } from 'react';
import { CheckCircle, Calendar, Clock, MapPin, Video, User, Phone, Mail, FileText, X, ExternalLink, Info } from 'lucide-react';
import { BookingData } from '../types';
import { clinics } from '../data/mockData';

interface ConfirmationPageProps {
  bookingData: BookingData;
  onNewBooking: () => void;
}

export default function ConfirmationPage({ bookingData, onNewBooking }: ConfirmationPageProps) {
  const [showPreparationDialog, setShowPreparationDialog] = useState(false);
  
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

      {/* Reference Materials Section */}
      <div className="mt-12 bg-gray-50 rounded-xl p-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Helpful Resources</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Preparation Guide */}
          <button
            onClick={() => setShowPreparationDialog(true)}
            className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-200 text-left"
          >
            <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
              <FileText className="h-6 w-6 text-blue-600" />
            </div>
            <h4 className="text-lg font-semibold text-gray-900 mb-2">Appointment Preparation</h4>
            <p className="text-gray-600 text-sm">Learn how to prepare for your visit and what to bring</p>
          </button>

          {/* Patient Portal */}
          <a
            href="#"
            className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-200 text-left block"
          >
            <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
              <User className="h-6 w-6 text-green-600" />
            </div>
            <h4 className="text-lg font-semibold text-gray-900 mb-2 flex items-center">
              Patient Portal
              <ExternalLink className="h-4 w-4 ml-2" />
            </h4>
            <p className="text-gray-600 text-sm">Access your medical records, test results, and more</p>
          </a>

          {/* Insurance Information */}
          <a
            href="#"
            className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-200 text-left block"
          >
            <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
              <Info className="h-6 w-6 text-purple-600" />
            </div>
            <h4 className="text-lg font-semibold text-gray-900 mb-2 flex items-center">
              Insurance & Billing
              <ExternalLink className="h-4 w-4 ml-2" />
            </h4>
            <p className="text-gray-600 text-sm">Understand your coverage and payment options</p>
          </a>

          {/* Health Resources */}
          <a
            href="#"
            className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-200 text-left block"
          >
            <div className="bg-red-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
              <FileText className="h-6 w-6 text-red-600" />
            </div>
            <h4 className="text-lg font-semibold text-gray-900 mb-2 flex items-center">
              Health Library
              <ExternalLink className="h-4 w-4 ml-2" />
            </h4>
            <p className="text-gray-600 text-sm">Educational materials about conditions and treatments</p>
          </a>

          {/* Emergency Contact */}
          <a
            href="tel:911"
            className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-200 text-left block border-2 border-red-200"
          >
            <div className="bg-red-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
              <Phone className="h-6 w-6 text-red-600" />
            </div>
            <h4 className="text-lg font-semibold text-red-900 mb-2">Emergency Contact</h4>
            <p className="text-red-700 text-sm font-medium">Call 911 for medical emergencies</p>
          </a>

          {/* Contact Us */}
          <a
            href="tel:555-123-4567"
            className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-200 text-left block"
          >
            <div className="bg-gray-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
              <Phone className="h-6 w-6 text-gray-600" />
            </div>
            <h4 className="text-lg font-semibold text-gray-900 mb-2">Contact Us</h4>
            <p className="text-gray-600 text-sm">(555) 123-4567 for questions or changes</p>
          </a>
        </div>
      </div>

      {/* Preparation Dialog */}
      {showPreparationDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <h3 className="text-xl font-semibold text-gray-900">Appointment Preparation Guide</h3>
              <button
                onClick={() => setShowPreparationDialog(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
              >
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Before Your Visit */}
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                  <Calendar className="h-5 w-5 text-blue-600 mr-2" />
                  Before Your Visit
                </h4>
                <div className="bg-blue-50 rounded-lg p-4">
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start">
                      <span className="bg-blue-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center mr-3 mt-0.5">1</span>
                      <span>Gather your insurance card, photo ID, and payment method</span>
                    </li>
                    <li className="flex items-start">
                      <span className="bg-blue-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center mr-3 mt-0.5">2</span>
                      <span>Prepare a list of current medications, including dosages</span>
                    </li>
                    <li className="flex items-start">
                      <span className="bg-blue-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center mr-3 mt-0.5">3</span>
                      <span>Write down your symptoms, when they started, and their severity</span>
                    </li>
                    <li className="flex items-start">
                      <span className="bg-blue-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center mr-3 mt-0.5">4</span>
                      <span>List any questions you want to ask your doctor</span>
                    </li>
                  </ul>
                </div>
              </div>

              {bookingData.appointmentType === 'video' ? (
                /* Video Appointment Specific */
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                    <Video className="h-5 w-5 text-green-600 mr-2" />
                    Video Consultation Setup
                  </h4>
                  <div className="bg-green-50 rounded-lg p-4">
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-start">
                        <span className="bg-green-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center mr-3 mt-0.5">1</span>
                        <span>Test your camera and microphone beforehand</span>
                      </li>
                      <li className="flex items-start">
                        <span className="bg-green-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center mr-3 mt-0.5">2</span>
                        <span>Ensure you have a stable internet connection</span>
                      </li>
                      <li className="flex items-start">
                        <span className="bg-green-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center mr-3 mt-0.5">3</span>
                        <span>Find a quiet, well-lit space for your appointment</span>
                      </li>
                      <li className="flex items-start">
                        <span className="bg-green-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center mr-3 mt-0.5">4</span>
                        <span>Have your medications and medical records nearby</span>
                      </li>
                    </ul>
                  </div>
                </div>
              ) : (
                /* In-Person Appointment Specific */
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                    <MapPin className="h-5 w-5 text-purple-600 mr-2" />
                    In-Person Visit Guidelines
                  </h4>
                  <div className="bg-purple-50 rounded-lg p-4">
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-start">
                        <span className="bg-purple-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center mr-3 mt-0.5">1</span>
                        <span>Arrive 15 minutes early for check-in and paperwork</span>
                      </li>
                      <li className="flex items-start">
                        <span className="bg-purple-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center mr-3 mt-0.5">2</span>
                        <span>Bring a list of all medications and supplements</span>
                      </li>
                      <li className="flex items-start">
                        <span className="bg-purple-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center mr-3 mt-0.5">3</span>
                        <span>Wear comfortable, easily removable clothing if needed</span>
                      </li>
                      <li className="flex items-start">
                        <span className="bg-purple-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center mr-3 mt-0.5">4</span>
                        <span>Consider bringing a family member or friend for support</span>
                      </li>
                    </ul>
                  </div>
                </div>
              )}

              {/* What to Expect */}
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                  <Info className="h-5 w-5 text-orange-600 mr-2" />
                  What to Expect
                </h4>
                <div className="bg-orange-50 rounded-lg p-4">
                  <ul className="space-y-2 text-gray-700">
                    <li>• Your appointment will last approximately 30-45 minutes</li>
                    <li>• The doctor will review your medical history and current symptoms</li>
                    <li>• You may receive a physical examination if needed</li>
                    <li>• The doctor will discuss treatment options and next steps</li>
                    <li>• You'll receive a summary of your visit and any prescriptions</li>
                  </ul>
                </div>
              </div>

              {/* Important Reminders */}
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                  <Clock className="h-5 w-5 text-red-600 mr-2" />
                  Important Reminders
                </h4>
                <div className="bg-red-50 rounded-lg p-4">
                  <ul className="space-y-2 text-gray-700">
                    <li>• Cancellations must be made at least 24 hours in advance</li>
                    <li>• Late arrivals may need to reschedule their appointment</li>
                    <li>• Bring your insurance card and a valid photo ID</li>
                    <li>• Payment is due at the time of service</li>
                    <li>• Contact us immediately if you develop fever or flu-like symptoms</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-4">
              <button
                onClick={() => setShowPreparationDialog(false)}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition-colors duration-200"
              >
                Got It, Thanks!
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}