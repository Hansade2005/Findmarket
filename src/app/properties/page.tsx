'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Search, Plus, Bed, Bath, MapPin } from 'lucide-react';
import { listings, formatPrice, timeAgo, cities } from '@/data/listings';

export default function PropertiesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [listingType, setListingType] = useState('');
  const [propertyType, setPropertyType] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [minBedrooms, setMinBedrooms] = useState('');
  const [furnished, setFurnished] = useState('');
  const [priceMin, setPriceMin] = useState('');
  const [priceMax, setPriceMax] = useState('');

  const properties = useMemo(() => {
    let result = listings.filter((l) => l.category === 'property');

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (l) => l.title.toLowerCase().includes(q) || l.description.toLowerCase().includes(q)
      );
    }

    if (listingType) {
      result = result.filter((l) => l.listingType === listingType);
    }

    if (propertyType) {
      result = result.filter((l) => l.propertyType === propertyType);
    }

    if (selectedCity) {
      result = result.filter((l) => l.city === selectedCity);
    }

    if (minBedrooms) {
      result = result.filter((l) => (l.bedrooms || 0) >= parseInt(minBedrooms));
    }

    if (furnished === 'yes') {
      result = result.filter((l) => l.furnished);
    } else if (furnished === 'no') {
      result = result.filter((l) => !l.furnished);
    }

    if (priceMin) {
      result = result.filter((l) => l.price >= parseInt(priceMin));
    }
    if (priceMax) {
      result = result.filter((l) => l.price <= parseInt(priceMax));
    }

    return result;
  }, [searchQuery, listingType, propertyType, selectedCity, minBedrooms, furnished, priceMin, priceMax]);

  const resetFilters = () => {
    setSearchQuery('');
    setListingType('');
    setPropertyType('');
    setSelectedCity('');
    setMinBedrooms('');
    setFurnished('');
    setPriceMin('');
    setPriceMax('');
  };

  return (
    <div className="min-h-screen bg-gray-50 fade-in">
      {/* Hero */}
      <div className="bg-gradient-to-br from-purple-600 to-purple-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">🏠 Properties in Cameroon</h1>
          <p className="text-purple-200 text-sm md:text-base mb-6">
            Find your perfect home, office, or investment property
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search properties..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl text-gray-900 bg-white shadow-lg focus:ring-2 focus:ring-purple-300 outline-none text-sm"
              />
            </div>
            <Link
              href="/post-ad?category=property"
              className="inline-flex items-center justify-center gap-2 bg-white text-purple-700 font-semibold py-3 px-6 rounded-xl hover:bg-purple-50 transition-all shadow-lg text-sm"
            >
              <Plus className="w-4 h-4" />
              Post Property Listing
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Filters */}
        <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm mb-6">
          <h3 className="font-semibold text-gray-900 mb-4">Filter Properties</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Listing Type</label>
              <select value={listingType} onChange={(e) => setListingType(e.target.value)} className="select-field text-sm">
                <option value="">All types</option>
                <option value="rent">For Rent</option>
                <option value="sale">For Sale</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Property Type</label>
              <select value={propertyType} onChange={(e) => setPropertyType(e.target.value)} className="select-field text-sm">
                <option value="">All properties</option>
                <option value="Apartment">Apartment</option>
                <option value="House">House</option>
                <option value="Studio">Studio</option>
                <option value="Guest House">Guest House</option>
                <option value="Land">Land</option>
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
              <label className="block text-xs font-medium text-gray-500 mb-1">Min Bedrooms</label>
              <select value={minBedrooms} onChange={(e) => setMinBedrooms(e.target.value)} className="select-field text-sm">
                <option value="">Any</option>
                <option value="1">1+</option>
                <option value="2">2+</option>
                <option value="3">3+</option>
                <option value="4">4+</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Furnished</label>
              <select value={furnished} onChange={(e) => setFurnished(e.target.value)} className="select-field text-sm">
                <option value="">Any</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Price Range (CFA)</label>
              <div className="flex gap-1">
                <input type="number" placeholder="Min" value={priceMin} onChange={(e) => setPriceMin(e.target.value)} className="input-field text-xs" />
                <input type="number" placeholder="Max" value={priceMax} onChange={(e) => setPriceMax(e.target.value)} className="input-field text-xs" />
              </div>
            </div>
          </div>
          <button onClick={resetFilters} className="text-sm text-gray-500 hover:text-gray-700 mt-3">
            Reset Filters
          </button>
        </div>

        {/* Results */}
        <h2 className="text-lg font-bold text-gray-900 mb-4">
          {properties.length} Properties Found
        </h2>

        {properties.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl">
            <div className="text-4xl mb-4">🏠</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No properties found</h3>
            <p className="text-sm text-gray-500">Try adjusting your filters</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {properties.map((property) => (
              <Link key={property.id} href={`/ad/${property.id}`}>
                <div className="card group hover:-translate-y-1">
                  {/* Image */}
                  <div className="relative h-48 bg-gradient-to-br from-purple-400 to-purple-600 overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center text-white/30 text-6xl">
                      🏠
                    </div>
                    {property.featured && (
                      <span className="absolute top-2 left-2 badge-featured text-[10px]">Featured</span>
                    )}
                    {property.urgent && (
                      <span className="absolute top-2 left-2 badge-urgent text-[10px]">Urgent</span>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 group-hover:text-primary-600 transition-colors line-clamp-2 text-sm mb-2">
                      {property.title}
                    </h3>

                    <div className="text-lg font-bold text-primary-600 mb-2">
                      {formatPrice(property.price, property.currency)}
                      {property.listingType === 'rent' && (
                        <span className="text-xs text-gray-400 font-normal">/monthly</span>
                      )}
                    </div>

                    <div className="flex items-center gap-4 text-xs text-gray-500 mb-2">
                      {property.bedrooms && (
                        <span className="flex items-center gap-1">
                          <Bed className="w-3.5 h-3.5" />
                          {property.bedrooms}
                        </span>
                      )}
                      {property.bathrooms && (
                        <span className="flex items-center gap-1">
                          <Bath className="w-3.5 h-3.5" />
                          {property.bathrooms}
                        </span>
                      )}
                      {property.furnished && (
                        <span className="badge bg-green-100 text-green-700 text-[10px]">Furnished</span>
                      )}
                    </div>

                    <div className="flex items-center gap-1 text-xs text-gray-400">
                      <MapPin className="w-3 h-3" />
                      <span>{property.town ? `${property.town}, ${property.city}` : property.city}</span>
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
