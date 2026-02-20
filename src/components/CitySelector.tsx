'use client';

import { useState, useEffect } from 'react';
import { X, MapPin } from 'lucide-react';
import { cities } from '@/data/listings';

export default function CitySelector() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('selectedCity');
    if (saved) {
      setSelectedCity(saved);
    } else {
      // Show selector after a delay on first visit
      const timer = setTimeout(() => setIsOpen(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleSelectCity = (city: string) => {
    setSelectedCity(city);
    localStorage.setItem('selectedCity', city);
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] bg-black/50 flex items-end sm:items-center justify-center">
      <div className="bg-white w-full sm:max-w-md rounded-t-2xl sm:rounded-2xl p-6 slide-up">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-900">Select Your City</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <p className="text-sm text-gray-500 mb-4">
          Choose your city to see listings near you first
        </p>

        <select
          className="select-field mb-4"
          value={selectedCity || ''}
          onChange={(e) => handleSelectCity(e.target.value)}
        >
          <option value="">Select a city</option>
          {cities.map((city) => (
            <option key={city.slug} value={city.slug}>
              {city.name}
            </option>
          ))}
        </select>

        <div className="flex gap-2">
          <button
            onClick={() => {
              if (selectedCity) {
                localStorage.setItem('selectedCity', selectedCity);
                setIsOpen(false);
              }
            }}
            className="flex-1 btn-primary text-sm"
          >
            Save & Continue
          </button>
          <button
            onClick={() => setIsOpen(false)}
            className="btn-secondary text-sm"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
