import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar, Clock, ArrowRight } from 'lucide-react';
import { Doctor, Clinic } from '../types';
import { clinics } from '../data/mockData';

interface DateTimeSelectionProps {
  doctor: Doctor;
  clinic: Clinic | null;
  selectedDate: string | null;
  selectedTime: string | null;
  onDateSelect: (date: string) => void;
  onTimeSelect: (time: string) => void;
  onNext: () => void;
}

export default function DateTimeSelection({
  doctor,
  clinic,
  selectedDate,
  selectedTime,
  onDateSelect,
  onTimeSelect,
  onNext,
}: DateTimeSelectionProps) {
  const [currentWeekStart, setCurrentWeekStart] = useState(() => {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const mondayOffset = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
    const monday = new Date(today);
    monday.setDate(today.getDate() + mondayOffset);
    return monday;
  });

  const generateWeekDates = (startDate: Date) => {
    const dates = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      dates.push(date);
    }
    return dates;
  };

  const getAvailableSlots = (date: string) => {
    const availability = doctor.availability.find((a) => a.date === date);
    if (!availability) return [];

    const availableSlots = availability.slots.filter((slot) => {
      if (doctor.onlineOnly) return slot.available; // For video appointments
      if (!clinic) return false;
      return slot.available && slot.clinicId === clinic.id;
    });

    return availableSlots;
  };

  const formatDate = (date: Date) => {
    return date.toISOString().split('T')[0];
  };

  const formatDisplayDate = (date: Date) => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return 'Tomorrow';
    }

    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
  };

  const navigateWeek = (direction: 'prev' | 'next') => {
    const newStart = new Date(currentWeekStart);
    newStart.setDate(currentWeekStart.getDate() + (direction === 'next' ? 7 : -7));

    // Don't allow going to past weeks
    const today = new Date();
    const mondayOfThisWeek = new Date(today);
    const dayOfWeek = today.getDay();
    const mondayOffset = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
    mondayOfThisWeek.setDate(today.getDate() + mondayOffset);

    if (direction === 'prev' && newStart < mondayOfThisWeek) {
      return;
    }

    setCurrentWeekStart(newStart);
  };

  const weekDates = generateWeekDates(currentWeekStart);
  const selectedDateSlots = selectedDate ? getAvailableSlots(selectedDate) : [];

  // Group time slots by time periods for better organization
  const groupSlotsByPeriod = (slots: any[]) => {
    const morning = slots.filter((slot) => {
      const hour = parseInt(slot.time.split(':')[0]);
      return hour < 12;
    });

    const afternoon = slots.filter((slot) => {
      const hour = parseInt(slot.time.split(':')[0]);
      return hour >= 12 && hour < 17;
    });

    const evening = slots.filter((slot) => {
      const hour = parseInt(slot.time.split(':')[0]);
      return hour >= 17;
    });

    return { morning, afternoon, evening };
  };

  const { morning, afternoon, evening } = groupSlotsByPeriod(selectedDateSlots);

  console.log({ doctor, clinic, selectedDate, selectedTime });

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Select Date & Time</h2>
        <p className="text-lg text-gray-600">
          Choose your preferred appointment slot with Dr. {doctor.name}
          {clinic && ` at ${clinic.name}`}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Calendar */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <Calendar className="h-5 w-5 mr-2" />
              Available Dates
            </h3>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => navigateWeek('prev')}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
              >
                <ChevronLeft className="h-5 w-5 text-gray-600" />
              </button>
              <span className="text-sm font-medium text-gray-700 min-w-32 text-center">
                {currentWeekStart.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </span>
              <button
                onClick={() => navigateWeek('next')}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
              >
                <ChevronRight className="h-5 w-5 text-gray-600" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-2 mb-4">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
              <div key={day} className="text-center text-xs font-medium text-gray-500 py-2">
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-2">
            {weekDates.map((date) => {
              const dateStr = formatDate(date);

              const hasSlots = getAvailableSlots(dateStr).length > 0;
              const isSelected = selectedDate === dateStr;
              const isPast = date < new Date(new Date().setHours(0, 0, 0, 0));

              return (
                <button
                  key={dateStr}
                  onClick={() => hasSlots && !isPast && onDateSelect(dateStr)}
                  disabled={!hasSlots || isPast}
                  className={`p-3 rounded-lg border-2 transition-all duration-200 min-h-16 ${
                    isSelected
                      ? 'border-blue-600 bg-blue-50'
                      : hasSlots && !isPast
                      ? 'border-gray-200 hover:border-gray-300 bg-white'
                      : 'border-gray-100 bg-gray-50 cursor-not-allowed opacity-50'
                  }`}
                >
                  <div className="text-center">
                    <p
                      className={`text-sm font-medium ${
                        isSelected
                          ? 'text-blue-600'
                          : hasSlots && !isPast
                          ? 'text-gray-900'
                          : 'text-gray-400'
                      }`}
                    >
                      {date.getDate()}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">{formatDisplayDate(date)}</p>
                    {hasSlots && !isPast && (
                      <p className="text-xs text-green-600 mt-1">
                        {getAvailableSlots(dateStr).length} slots
                      </p>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Time Slots */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <Clock className="h-5 w-5 mr-2" />
              Available Times
            </h3>
          </div>

          {!selectedDate ? (
            <div className="text-center py-8">
              <Clock className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">Please select a date first</p>
            </div>
          ) : selectedDateSlots.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">No available slots for this date</p>
            </div>
          ) : (
            <div className="space-y-6 max-h-96 overflow-y-auto">
              {morning.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-3">Morning</h4>
                  <div className="grid grid-cols-3 gap-2">
                    {morning.map((slot) => (
                      <button
                        key={slot.time}
                        onClick={() => onTimeSelect(slot.time)}
                        className={`p-2 rounded-lg border-2 transition-all duration-200 text-sm ${
                          selectedTime === slot.time
                            ? 'border-blue-600 bg-blue-50 text-blue-600'
                            : 'border-gray-200 hover:border-gray-300 bg-white text-gray-900'
                        }`}
                      >
                        {slot.time}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {afternoon.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-3">Afternoon</h4>
                  <div className="grid grid-cols-3 gap-2">
                    {afternoon.map((slot) => (
                      <button
                        key={slot.time}
                        onClick={() => onTimeSelect(slot.time)}
                        className={`p-2 rounded-lg border-2 transition-all duration-200 text-sm ${
                          selectedTime === slot.time
                            ? 'border-blue-600 bg-blue-50 text-blue-600'
                            : 'border-gray-200 hover:border-gray-300 bg-white text-gray-900'
                        }`}
                      >
                        {slot.time}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {evening.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-3">Evening</h4>
                  <div className="grid grid-cols-3 gap-2">
                    {evening.map((slot) => (
                      <button
                        key={slot.time}
                        onClick={() => onTimeSelect(slot.time)}
                        className={`p-2 rounded-lg border-2 transition-all duration-200 text-sm ${
                          selectedTime === slot.time
                            ? 'border-blue-600 bg-blue-50 text-blue-600'
                            : 'border-gray-200 hover:border-gray-300 bg-white text-gray-900'
                        }`}
                      >
                        {slot.time}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-center mt-8">
        <button
          onClick={onNext}
          disabled={!selectedDate || !selectedTime}
          className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold px-8 py-3 rounded-xl flex items-center transition-colors duration-200"
        >
          Continue
          <ArrowRight className="ml-2 h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
