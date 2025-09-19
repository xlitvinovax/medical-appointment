import React from 'react';
import { User, Phone, Mail, FileText, ArrowRight } from 'lucide-react';

interface PersonalInfoFormProps {
  personalInfo: {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    notes: string;
  };
  onUpdate: (field: string, value: string) => void;
  onNext: () => void;
}

export default function PersonalInfoForm({ personalInfo, onUpdate, onNext }: PersonalInfoFormProps) {
  const isFormValid = () => {
    return personalInfo.firstName.trim() && 
           personalInfo.lastName.trim() && 
           personalInfo.phone.trim();
  };

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Personal Information</h2>
        <p className="text-lg text-gray-600">Please provide your contact details to complete the booking</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                First Name *
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  id="firstName"
                  value={personalInfo.firstName}
                  onChange={(e) => onUpdate('firstName', e.target.value)}
                  className="pl-10 w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your first name"
                />
              </div>
            </div>

            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                Last Name *
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  id="lastName"
                  value={personalInfo.lastName}
                  onChange={(e) => onUpdate('lastName', e.target.value)}
                  className="pl-10 w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your last name"
                />
              </div>
            </div>
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number *
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="tel"
                id="phone"
                value={personalInfo.phone}
                onChange={(e) => onUpdate('phone', e.target.value)}
                className="pl-10 w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="(555) 123-4567"
              />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email Address (Optional)
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="email"
                id="email"
                value={personalInfo.email}
                onChange={(e) => onUpdate('email', e.target.value)}
                className="pl-10 w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="john@example.com"
              />
            </div>
          </div>

          <div>
            <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-2">
              Notes for Doctor (Optional)
            </label>
            <div className="relative">
              <FileText className="absolute left-3 top-4 h-5 w-5 text-gray-400" />
              <textarea
                id="notes"
                value={personalInfo.notes}
                onChange={(e) => onUpdate('notes', e.target.value)}
                rows={4}
                className="pl-10 w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                placeholder="Any additional information you'd like to share with the doctor..."
              />
            </div>
          </div>

          <div className="bg-blue-50 rounded-lg p-4">
            <div className="flex items-start">
              <input
                type="checkbox"
                id="consent"
                className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 mt-1"
                required
              />
              <label htmlFor="consent" className="ml-3 text-sm text-gray-700">
                I consent to the processing of my personal data for healthcare purposes and agree to the 
                <a href="#" className="text-blue-600 hover:text-blue-700 ml-1">Terms of Service</a> and 
                <a href="#" className="text-blue-600 hover:text-blue-700 ml-1">Privacy Policy</a>.
              </label>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center mt-8">
        <button
          onClick={onNext}
          disabled={!isFormValid()}
          className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold px-8 py-3 rounded-xl flex items-center transition-colors duration-200"
        >
          Confirm Appointment
          <ArrowRight className="ml-2 h-5 w-5" />
        </button>
      </div>
    </div>
  );
}