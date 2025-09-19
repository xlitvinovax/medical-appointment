import React, { useState } from 'react';
import { Search, ArrowRight } from 'lucide-react';
import { Doctor } from '../types';
import { doctors, commonSymptoms } from '../data/mockData';

interface SymptomInputProps {
  symptoms: string;
  selectedDoctor: Doctor | null;
  onSymptomsChange: (symptoms: string) => void;
  onDoctorSelect: (doctor: Doctor) => void;
  onNext: () => void;
}

export default function SymptomInput({ symptoms, selectedDoctor, onSymptomsChange, onDoctorSelect, onNext }: SymptomInputProps) {
  const [showSuggestions, setShowSuggestions] = useState(false);
  
  const filteredSymptoms = commonSymptoms.filter(symptom =>
    symptom.toLowerCase().includes(symptoms.toLowerCase()) && symptoms.length > 0
  );

  const getRecommendedDoctors = () => {
    if (!symptoms.trim()) return [];
    
    // Simple symptom-to-specialization mapping
    const symptomMap: { [key: string]: string[] } = {
      'chest pain': ['Cardiology'],
      'headache': ['Neurology', 'General Practice'],
      'skin rash': ['Dermatology'],
      'joint pain': ['Orthopedics'],
      'back pain': ['Orthopedics', 'General Practice'],
      'fever': ['General Practice'],
      'cough': ['General Practice'],
      'shortness of breath': ['Cardiology', 'General Practice'],
      'abdominal pain': ['General Practice'],
      'fatigue': ['General Practice'],
      'dizziness': ['Neurology', 'General Practice'],
      'nausea': ['General Practice']
    };
    
    const lowerSymptoms = symptoms.toLowerCase();
    let relevantSpecializations: string[] = [];
    
    Object.keys(symptomMap).forEach(symptom => {
      if (lowerSymptoms.includes(symptom)) {
        relevantSpecializations = [...relevantSpecializations, ...symptomMap[symptom]];
      }
    });
    
    if (relevantSpecializations.length === 0) {
      relevantSpecializations = ['General Practice'];
    }
    
    return doctors.filter(doctor => 
      relevantSpecializations.includes(doctor.specialization)
    );
  };

  const recommendedDoctors = getRecommendedDoctors();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Describe Your Symptoms</h2>
        <p className="text-lg text-gray-600">Tell us what you're experiencing so we can recommend the right specialist</p>
      </div>

      {/* Symptom Input */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
        <div className="relative">
          <Search className="absolute left-3 top-4 h-5 w-5 text-gray-400" />
          <textarea
            placeholder="Type your symptoms here... (e.g., chest pain, headache, skin rash)"
            value={symptoms}
            onChange={(e) => {
              onSymptomsChange(e.target.value);
              setShowSuggestions(e.target.value.length > 0);
            }}
            onFocus={() => setShowSuggestions(symptoms.length > 0)}
            className="pl-10 w-full rounded-lg border border-gray-300 px-4 py-3 h-32 resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          
          {/* Symptom Suggestions */}
          {showSuggestions && filteredSymptoms.length > 0 && (
            <div className="absolute z-10 w-full bg-white border border-gray-200 rounded-lg shadow-lg mt-1 max-h-48 overflow-y-auto">
              {filteredSymptoms.map(symptom => (
                <button
                  key={symptom}
                  onClick={() => {
                    const newSymptoms = symptoms ? `${symptoms}, ${symptom}` : symptom;
                    onSymptomsChange(newSymptoms);
                    setShowSuggestions(false);
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-gray-50 focus:bg-gray-50"
                >
                  {symptom}
                </button>
              ))}
            </div>
          )}
        </div>
        
        {/* Common Symptoms */}
        <div className="mt-4">
          <p className="text-sm font-medium text-gray-700 mb-3">Common symptoms:</p>
          <div className="flex flex-wrap gap-2">
            {commonSymptoms.slice(0, 8).map(symptom => (
              <button
                key={symptom}
                onClick={() => {
                  const newSymptoms = symptoms ? `${symptoms}, ${symptom}` : symptom;
                  onSymptomsChange(newSymptoms);
                }}
                className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm rounded-full transition-colors duration-200"
              >
                {symptom}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Recommended Doctors */}
      {recommendedDoctors.length > 0 && symptoms.trim() && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Recommended Specialists</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {recommendedDoctors.map(doctor => (
              <button
                key={doctor.id}
                onClick={() => onDoctorSelect(doctor)}
                className={`p-4 rounded-lg border-2 transition-all duration-200 text-left ${
                  selectedDoctor?.id === doctor.id
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center">
                  <img
                    src={doctor.image}
                    alt={doctor.name}
                    className="w-12 h-12 rounded-full object-cover mr-3"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900">{doctor.name}</h4>
                    <p className="text-sm text-blue-600">{doctor.specialization}</p>
                    <p className="text-xs text-gray-500">⭐ {doctor.rating} ({doctor.reviews} reviews)</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="flex justify-center">
        <button
          onClick={onNext}
          disabled={!selectedDoctor || !symptoms.trim()}
          className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold px-8 py-3 rounded-xl flex items-center transition-colors duration-200"
        >
          Continue
          <ArrowRight className="ml-2 h-5 w-5" />
        </button>
      </div>
    </div>
  );
}