import React, { useState } from 'react';
import { Search, Star, MapPin, Video, ArrowRight } from 'lucide-react';
import { Doctor } from '../types';
import { doctors, specializations } from '../data/mockData';

interface DoctorSelectionProps {
  appointmentType: 'in-person' | 'video';
  selectedDoctor: Doctor | null;
  onSelect: (doctor: Doctor) => void;
  onNext: () => void;
}

export default function DoctorSelection({ appointmentType, selectedDoctor, onSelect, onNext }: DoctorSelectionProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialization, setSelectedSpecialization] = useState('');

  const filteredDoctors = doctors.filter(doctor => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doctor.specialization.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialization = !selectedSpecialization || doctor.specialization === selectedSpecialization;
    const matchesType = appointmentType === 'video' ? doctor.onlineOnly || doctor.clinics.length > 0 : !doctor.onlineOnly;
    
    return matchesSearch && matchesSpecialization && matchesType;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Select Your Doctor</h2>
        <p className="text-lg text-gray-600">Choose from our team of qualified healthcare professionals</p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name or specialty..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <select
            value={selectedSpecialization}
            onChange={(e) => setSelectedSpecialization(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">All Specializations</option>
            {specializations.map(spec => (
              <option key={spec} value={spec}>{spec}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Doctor Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {filteredDoctors.map(doctor => (
          <button
            key={doctor.id}
            onClick={() => onSelect(doctor)}
            className={`bg-white rounded-xl shadow-sm border-2 transition-all duration-200 text-left p-6 hover:shadow-md ${
              selectedDoctor?.id === doctor.id
                ? 'border-blue-600 bg-blue-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="flex items-center mb-4">
              <img
                src={doctor.image}
                alt={doctor.name}
                className="w-16 h-16 rounded-full object-cover mr-4"
              />
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{doctor.name}</h3>
                <p className="text-sm text-gray-600">{doctor.title}</p>
              </div>
            </div>
            
            <div className="mb-3">
              <p className="text-blue-600 font-medium">{doctor.specialization}</p>
            </div>
            
            <div className="flex items-center mb-3">
              <Star className="h-4 w-4 text-yellow-400 fill-current" />
              <span className="text-sm font-medium text-gray-900 ml-1">{doctor.rating}</span>
              <span className="text-sm text-gray-500 ml-1">({doctor.reviews} reviews)</span>
            </div>
            
            <div className="flex items-center text-sm text-gray-600">
              {doctor.onlineOnly ? (
                <>
                  <Video className="h-4 w-4 mr-1" />
                  <span>Online Only</span>
                </>
              ) : (
                <>
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>{doctor.clinics.length} location{doctor.clinics.length > 1 ? 's' : ''}</span>
                </>
              )}
            </div>
          </button>
        ))}
      </div>

      {filteredDoctors.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No doctors found matching your criteria.</p>
        </div>
      )}

      <div className="flex justify-center">
        <button
          onClick={onNext}
          disabled={!selectedDoctor}
          className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold px-8 py-3 rounded-xl flex items-center transition-colors duration-200"
        >
          Continue
          <ArrowRight className="ml-2 h-5 w-5" />
        </button>
      </div>
    </div>
  );
}