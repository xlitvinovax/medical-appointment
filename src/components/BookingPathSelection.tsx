import { User, Activity, ArrowRight } from 'lucide-react';

interface BookingPathSelectionProps {
  selectedPath: 'doctor' | 'symptoms' | null;
  onSelect: (path: 'doctor' | 'symptoms') => void;
  onNext: () => void;
}

export default function BookingPathSelection({
  selectedPath,
  onSelect,
  onNext,
}: BookingPathSelectionProps) {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          How Would You Like to Find Your Doctor?
        </h2>
        <p className="text-lg text-gray-600">
          Choose the option that best describes your situation
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <button
          onClick={() => onSelect('doctor')}
          className={`p-8 rounded-2xl border-2 transition-all duration-200 text-left ${
            selectedPath === 'doctor'
              ? 'border-blue-600 bg-blue-50'
              : 'border-gray-200 hover:border-gray-300'
          }`}
        >
          <div className="flex items-center mb-4">
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center ${
                selectedPath === 'doctor' ? 'bg-blue-600' : 'bg-gray-100'
              }`}
            >
              <User
                className={`h-6 w-6 ${selectedPath === 'doctor' ? 'text-white' : 'text-gray-600'}`}
              />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 ml-4">I Know My Doctor</h3>
          </div>
          <p className="text-gray-600 mb-4">
            Search for a specific doctor by name or browse by specialization
          </p>
          <ul className="text-sm text-gray-500 space-y-1">
            <li>• Find your preferred doctor</li>
            <li>• Browse by specialty</li>
            <li>• View doctor profiles</li>
          </ul>
        </button>

        <button
          onClick={() => onSelect('symptoms')}
          className={`p-8 rounded-2xl border-2 transition-all duration-200 text-left ${
            selectedPath === 'symptoms'
              ? 'border-blue-600 bg-blue-50'
              : 'border-gray-200 hover:border-gray-300'
          }`}
        >
          <div className="flex items-center mb-4">
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center ${
                selectedPath === 'symptoms' ? 'bg-blue-600' : 'bg-gray-100'
              }`}
            >
              <Activity
                className={`h-6 w-6 ${
                  selectedPath === 'symptoms' ? 'text-white' : 'text-gray-600'
                }`}
              />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 ml-4">I Have Symptoms</h3>
          </div>
          <p className="text-gray-600 mb-4">
            Describe your symptoms and we'll suggest the right specialists for you
          </p>
          <ul className="text-sm text-gray-500 space-y-1">
            <li>• Symptom-based matching</li>
            <li>• Expert recommendations</li>
            <li>• Find the right specialist</li>
          </ul>
        </button>
      </div>

      <div className="flex justify-center">
        <button
          onClick={onNext}
          disabled={!selectedPath}
          className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold px-8 py-3 rounded-xl flex items-center transition-colors duration-200"
        >
          Continue
          <ArrowRight className="ml-2 h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
