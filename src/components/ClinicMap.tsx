import React from 'react';
import { MapPin, Phone, Clock, ArrowRight } from 'lucide-react';
import { Clinic } from '../types';
import { clinics } from '../data/mockData';

interface ClinicMapProps {
  selectedClinic: Clinic | null;
  onSelect: (clinic: Clinic) => void;
  onNext: () => void;
  doctorClinics: string[];
}

export default function ClinicMap({ selectedClinic, onSelect, onNext, doctorClinics }: ClinicMapProps) {
  const availableClinics = clinics.filter(clinic => doctorClinics.includes(clinic.id));

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Select a Clinic Location</h2>
        <p className="text-lg text-gray-600">Choose the most convenient location for your appointment</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Map Placeholder */}
        <div className="bg-gray-100 rounded-xl h-96 flex items-center justify-center">
          <div className="text-center">
            <MapPin className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">Interactive Map</p>
            <p className="text-sm text-gray-500 mt-2">In a real app, this would show an interactive map with clinic locations</p>
          </div>
        </div>

        {/* Clinic List */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Available Locations</h3>
          {availableClinics.map(clinic => (
            <button
              key={clinic.id}
              onClick={() => onSelect(clinic)}
              className={`w-full p-6 rounded-xl border-2 transition-all duration-200 text-left ${
                selectedClinic?.id === clinic.id
                  ? 'border-blue-600 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300 bg-white'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">{clinic.name}</h4>
                  
                  <div className="flex items-start mb-2">
                    <MapPin className="h-4 w-4 text-gray-500 mt-1 mr-2 flex-shrink-0" />
                    <p className="text-gray-600 text-sm">{clinic.address}</p>
                  </div>
                  
                  <div className="flex items-center mb-2">
                    <Clock className="h-4 w-4 text-gray-500 mr-2" />
                    <p className="text-gray-600 text-sm">{clinic.workingHours}</p>
                  </div>
                  
                  <div className="flex items-center">
                    <Phone className="h-4 w-4 text-gray-500 mr-2" />
                    <p className="text-gray-600 text-sm">{clinic.phone}</p>
                  </div>
                </div>
                
                {selectedClinic?.id === clinic.id && (
                  <div className="bg-blue-600 text-white rounded-full p-2">
                    <MapPin className="h-4 w-4" />
                  </div>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="flex justify-center">
        <button
          onClick={onNext}
          disabled={!selectedClinic}
          className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold px-8 py-3 rounded-xl flex items-center transition-colors duration-200"
        >
          Continue
          <ArrowRight className="ml-2 h-5 w-5" />
        </button>
      </div>
    </div>
  );
}