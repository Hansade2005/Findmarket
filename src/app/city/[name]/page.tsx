'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowRight, MapPin } from 'lucide-react';
import ListingCard from '@/components/ListingCard';
import { listings, cities } from '@/data/listings';

export default function CityPage() {
  const params = useParams();
  const cityName = decodeURIComponent(params.name as string);
  const city = cities.find((c) => c.name === cityName || c.slug === cityName);

  const cityListings = listings.filter((l) => l.city === cityName).slice(0, 12);

  return (
    <div className="min-h-screen bg-gray-50 fade-in">
      {/* Hero */}
      <div className="bg-gradient-to-br from-primary-600 to-primary-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center gap-2 text-primary-200 mb-2">
            <MapPin className="w-4 h-4" />
            <span className="text-sm">Cameroon</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            {cityName} Marketplace
          </h1>
          <p className="text-primary-200 text-sm md:text-base mb-4">
            Buy, Sell, Rent & Find Jobs in {cityName}
          </p>
          {city && (
            <span className="inline-flex items-center gap-1 bg-white/10 px-3 py-1.5 rounded-full text-sm">
              📊 {city.listings} active listings
            </span>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Links */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          <Link
            href={`/listings?listing_type=sale&city=${cityName}`}
            className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm hover:shadow-md transition-all text-center"
          >
            <span className="text-2xl mb-2 block">🛍️</span>
            <span className="text-sm font-medium text-gray-700">Buy & Sell</span>
          </Link>
          <Link
            href={`/listings?listing_type=rent&city=${cityName}`}
            className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm hover:shadow-md transition-all text-center"
          >
            <span className="text-2xl mb-2 block">🏠</span>
            <span className="text-sm font-medium text-gray-700">Properties</span>
          </Link>
          <Link
            href={`/listings?listing_type=job&city=${cityName}`}
            className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm hover:shadow-md transition-all text-center"
          >
            <span className="text-2xl mb-2 block">💼</span>
            <span className="text-sm font-medium text-gray-700">Jobs</span>
          </Link>
          <Link
            href={`/listings?category=vehicles&city=${cityName}`}
            className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm hover:shadow-md transition-all text-center"
          >
            <span className="text-2xl mb-2 block">🚗</span>
            <span className="text-sm font-medium text-gray-700">Vehicles</span>
          </Link>
        </div>

        {/* Listings */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900">
            Latest in {cityName}
          </h2>
          <Link
            href={`/listings?city=${cityName}`}
            className="text-sm font-semibold text-primary-600 hover:text-primary-700 flex items-center gap-1"
          >
            View all <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {cityListings.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl">
            <div className="text-4xl mb-4">🏙️</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No listings in {cityName} yet</h3>
            <p className="text-sm text-gray-500 mb-4">Be the first to post in this city!</p>
            <Link href="/post-ad" className="btn-primary text-sm">
              Post Free Ad
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {cityListings.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
