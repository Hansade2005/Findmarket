'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Search, MapPin, Calendar, Fuel, Settings2 } from 'lucide-react';
import { listings, formatPrice, timeAgo, cities } from '@/data/listings';

export default function VehiclesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedMake, setSelectedMake] = useState('');
  const [priceMin, setPriceMin] = useState('');
  const [priceMax, setPriceMax] = useState('');
  const [transmission, setTransmission] = useState('');

  const vehicles = useMemo(() => {
    let result = listings.filter((l) => l.category === 'vehicles');

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (l) => l.title.toLowerCase().includes(q) || l.description.toLowerCase().includes(q)
      );
    }

    if (selectedCity) {
      result = result.filter((l) => l.city === selectedCity);
    }

    if (selectedMake) {
      result = result.filter((l) => l.vehicleMake === selectedMake);
    }

    if (transmission) {
      result = result.filter((l) => l.transmission === transmission);
    }

    if (priceMin) result = result.filter((l) => l.price >= parseInt(priceMin));
    if (priceMax) result = result.filter((l) => l.price <= parseInt(priceMax));

    return result;
  }, [searchQuery, selectedCity, selectedMake, priceMin, priceMax, transmission]);

  const makes = [...new Set(listings.filter(l => l.category === 'vehicles' && l.vehicleMake).map(l => l.vehicleMake!))];

  return (
    <div className="min-h-screen bg-gray-50 fade-in">
      {/* Hero */}
      <div className="bg-gradient-to-br from-red-600 to-red-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">🚗 Vehicles in Cameroon</h1>
          <p className="text-red-200 text-sm md:text-base mb-6">
            Find your perfect car, motorcycle, or vehicle
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search vehicles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl text-gray-900 bg-white shadow-lg outline-none text-sm"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Filters */}
        <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm mb-6">
          <h3 className="font-semibold text-gray-900 mb-4">Filter Vehicles</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Make</label>
              <select value={selectedMake} onChange={(e) => setSelectedMake(e.target.value)} className="select-field text-sm">
                <option value="">All makes</option>
                {makes.map((make) => (
                  <option key={make} value={make}>{make}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">City</label>
              <select value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)} className="select-field text-sm">
                <option value="">All Cameroon</option>
                {cities.map((city) => (
                  <option key={city.slug} value={city.name}>{city.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Transmission</label>
              <select value={transmission} onChange={(e) => setTransmission(e.target.value)} className="select-field text-sm">
                <option value="">All</option>
                <option value="Automatic">Automatic</option>
                <option value="Manual">Manual</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Min Price (CFA)</label>
              <input type="number" placeholder="Min" value={priceMin} onChange={(e) => setPriceMin(e.target.value)} className="input-field text-sm" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Max Price (CFA)</label>
              <input type="number" placeholder="Max" value={priceMax} onChange={(e) => setPriceMax(e.target.value)} className="input-field text-sm" />
            </div>
          </div>
        </div>

        {/* Results */}
        <h2 className="text-lg font-bold text-gray-900 mb-4">
          {vehicles.length} Vehicles Found
        </h2>

        {vehicles.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl">
            <div className="text-4xl mb-4">🚗</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No vehicles found</h3>
            <p className="text-sm text-gray-500">Try adjusting your filters</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {vehicles.map((vehicle) => (
              <Link key={vehicle.id} href={`/ad/${vehicle.id}`}>
                <div className="card group hover:-translate-y-1">
                  <div className="relative h-48 bg-gradient-to-br from-red-400 to-red-600 overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center text-white/30 text-6xl">
                      🚗
                    </div>
                    {vehicle.featured && (
                      <span className="absolute top-2 left-2 badge-featured text-[10px]">Featured</span>
                    )}
                  </div>

                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 group-hover:text-primary-600 transition-colors line-clamp-2 text-sm mb-2">
                      {vehicle.title}
                    </h3>

                    <div className="text-lg font-bold text-primary-600 mb-3">
                      {formatPrice(vehicle.price, vehicle.currency)}
                    </div>

                    <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 mb-2">
                      {vehicle.vehicleYear && (
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" />
                          {vehicle.vehicleYear}
                        </span>
                      )}
                      {vehicle.fuelType && (
                        <span className="flex items-center gap-1">
                          <Fuel className="w-3.5 h-3.5" />
                          {vehicle.fuelType}
                        </span>
                      )}
                      {vehicle.transmission && (
                        <span className="flex items-center gap-1">
                          <Settings2 className="w-3.5 h-3.5" />
                          {vehicle.transmission}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-1 text-xs text-gray-400">
                      <MapPin className="w-3 h-3" />
                      <span>{vehicle.city}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
