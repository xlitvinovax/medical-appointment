import React from 'react';
import { Video, MapPin, ArrowRight } from 'lucide-react';

interface AppointmentTypeSelectionProps {
  selectedType: 'in-person' | 'video' | null;
  onSelect: (type: 'in-person' | 'video') => void;
  onNext: () => void;
}

export default function AppointmentTypeSelection({ selectedType, onSelect, onNext }: AppointmentTypeSelectionProps) {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Choose Your Appointment Type</h2>
        <p className="text-lg text-gray-600">Select how you'd like to meet with your healthcare provider</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <button
          onClick={() => onSelect('in-person')}
          className={`p-8 rounded-2xl border-2 transition-all duration-200 text-left ${
            selectedType === 'in-person'
              ? 'border-blue-600 bg-blue-50'
              : 'border-gray-200 hover:border-gray-300'
          }`}
        >
          <div className="flex items-center mb-4">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
              selectedType === 'in-person' ? 'bg-blue-600' : 'bg-gray-100'
            }`}>
              <MapPin className={`h-6 w-6 ${
                selectedType === 'in-person' ? 'text-white' : 'text-gray-600'
              }`} />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 ml-4">In-Person Visit</h3>
          </div>
          <p className="text-gray-600 mb-4">
            Visit one of our clinic locations for a comprehensive in-person consultation
          </p>
          <ul className="text-sm text-gray-500 space-y-1">
            <li>• Physical examination</li>
            <li>• Laboratory tests available</li>
            <li>• Full diagnostic capabilities</li>
          </ul>
        </button>

        <button
          onClick={() => onSelect('video')}
          className={`p-8 rounded-2xl border-2 transition-all duration-200 text-left ${
            selectedType === 'video'
              ? 'border-blue-600 bg-blue-50'
              : 'border-gray-200 hover:border-gray-300'
          }`}
        >
          <div className="flex items-center mb-4">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
              selectedType === 'video' ? 'bg-blue-600' : 'bg-gray-100'
            }`}>
              <Video className={`h-6 w-6 ${
                selectedType === 'video' ? 'text-white' : 'text-gray-600'
              }`} />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 ml-4">Video Consultation</h3>
          </div>
          <p className="text-gray-600 mb-4">
            Connect with your doctor from the comfort of your home via secure video call
          </p>
          <ul className="text-sm text-gray-500 space-y-1">
            <li>• Convenient and safe</li>
            <li>• No travel required</li>
            <li>• Same quality care</li>
          </ul>
        </button>
      </div>

      <div className="flex justify-center">
        <button
          onClick={onNext}
          disabled={!selectedType}
          className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold px-8 py-3 rounded-xl flex items-center transition-colors duration-200"
        >
          Continue
          <ArrowRight className="ml-2 h-5 w-5" />
        </button>
      </div>
    </div>
  );
}