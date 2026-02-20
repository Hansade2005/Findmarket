'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft,
  Heart,
  Share2,
  Flag,
  MapPin,
  Clock,
  Eye,
  Phone,
  MessageCircle,
  ChevronRight,
  Bed,
  Bath,
  Calendar,
  Fuel,
  Settings2,
  Briefcase,
  DollarSign,
  ExternalLink,
} from 'lucide-react';
import { listings, formatPrice, timeAgo } from '@/data/listings';
import ListingCard from '@/components/ListingCard';

export default function AdDetailsPage() {
  const params = useParams();
  const id = params.id as string;
  const listing = listings.find((l) => l.id === id);

  if (!listing) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">🔍</div>
          <h1 className="text-xl font-bold text-gray-900 mb-2">Ad Not Found</h1>
          <Link href="/listings" className="text-primary-600 hover:text-primary-700 text-sm">
            Browse All Listings
          </Link>
        </div>
      </div>
    );
  }

  // Related listings
  const related = listings
    .filter((l) => l.category === listing.category && l.id !== listing.id)
    .slice(0, 4);

  const getCategoryIcon = (category: string) => {
    const icons: Record<string, string> = {
      electronics: '📱',
      fashion: '👗',
      vehicles: '🚗',
      property: '🏠',
      jobs: '💼',
      services: '🔧',
      furniture: '🪑',
      kids_family: '👶',
    };
    return icons[category] || '📦';
  };

  const gradients = [
    'from-blue-400 to-blue-600',
    'from-purple-400 to-purple-600',
    'from-green-400 to-green-600',
    'from-orange-400 to-orange-600',
    'from-pink-400 to-pink-600',
    'from-teal-400 to-teal-600',
    'from-indigo-400 to-indigo-600',
  ];
  const gradient = gradients[parseInt(listing.id) % gradients.length];

  const whatsappUrl = `https://wa.me/${listing.sellerPhone?.replace(/\+/g, '')}?text=${encodeURIComponent(
    `Hi, I'm interested in your listing: ${listing.title} (${formatPrice(listing.price, listing.currency)})`
  )}`;

  return (
    <div className="min-h-screen bg-gray-50 fade-in">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-primary-600">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link href="/listings" className="hover:text-primary-600">Listings</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-gray-900 font-medium truncate">{listing.title}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Main Content */}
          <div className="flex-1">
            {/* Image */}
            <div className={`relative h-64 md:h-96 bg-gradient-to-br ${gradient} rounded-2xl overflow-hidden mb-6`}>
              <div className="absolute inset-0 flex items-center justify-center text-white/30 text-8xl">
                {getCategoryIcon(listing.category)}
              </div>

              {/* Badges */}
              <div className="absolute top-4 left-4 flex gap-2">
                {listing.featured && (
                  <span className="badge-featured">Featured</span>
                )}
                {listing.urgent && (
                  <span className="badge-urgent">Urgent</span>
                )}
              </div>

              {/* Actions */}
              <div className="absolute top-4 right-4 flex gap-2">
                <button className="w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-sm">
                  <Heart className="w-5 h-5 text-gray-500 hover:text-red-500" />
                </button>
                <button className="w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-sm">
                  <Share2 className="w-5 h-5 text-gray-500" />
                </button>
              </div>
            </div>

            {/* Listing Info */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm mb-6">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <h1 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
                    {listing.title}
                  </h1>
                  <div className="flex items-center gap-3 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {listing.town ? `${listing.town}, ${listing.city}` : listing.city}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {timeAgo(listing.createdAt)}
                    </span>
                    <span className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      {listing.views} views
                    </span>
                  </div>
                </div>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-2 mb-6">
                <span className="text-2xl md:text-3xl font-bold text-primary-600">
                  {formatPrice(listing.price, listing.currency)}
                </span>
                {listing.negotiable && (
                  <span className="badge bg-green-100 text-green-700">Negotiable</span>
                )}
                {listing.listingType === 'rent' && (
                  <span className="text-sm text-gray-400">/monthly</span>
                )}
              </div>

              {/* Property-specific details */}
              {listing.category === 'property' && (
                <div className="flex flex-wrap items-center gap-4 mb-6 p-4 bg-gray-50 rounded-xl">
                  {listing.bedrooms && (
                    <span className="flex items-center gap-2 text-sm text-gray-700">
                      <Bed className="w-5 h-5 text-gray-400" />
                      {listing.bedrooms} Bedrooms
                    </span>
                  )}
                  {listing.bathrooms && (
                    <span className="flex items-center gap-2 text-sm text-gray-700">
                      <Bath className="w-5 h-5 text-gray-400" />
                      {listing.bathrooms} Bathrooms
                    </span>
                  )}
                  {listing.propertyType && (
                    <span className="badge bg-purple-100 text-purple-700">{listing.propertyType}</span>
                  )}
                  {listing.furnished && (
                    <span className="badge bg-green-100 text-green-700">Furnished</span>
                  )}
                </div>
              )}

              {/* Vehicle-specific details */}
              {listing.category === 'vehicles' && (
                <div className="flex flex-wrap items-center gap-4 mb-6 p-4 bg-gray-50 rounded-xl">
                  {listing.vehicleMake && (
                    <span className="text-sm text-gray-700">
                      <strong>Make:</strong> {listing.vehicleMake}
                    </span>
                  )}
                  {listing.vehicleModel && (
                    <span className="text-sm text-gray-700">
                      <strong>Model:</strong> {listing.vehicleModel}
                    </span>
                  )}
                  {listing.vehicleYear && (
                    <span className="flex items-center gap-1 text-sm text-gray-700">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      {listing.vehicleYear}
                    </span>
                  )}
                  {listing.fuelType && (
                    <span className="flex items-center gap-1 text-sm text-gray-700">
                      <Fuel className="w-4 h-4 text-gray-400" />
                      {listing.fuelType}
                    </span>
                  )}
                  {listing.transmission && (
                    <span className="flex items-center gap-1 text-sm text-gray-700">
                      <Settings2 className="w-4 h-4 text-gray-400" />
                      {listing.transmission}
                    </span>
                  )}
                </div>
              )}

              {/* Job-specific details */}
              {listing.category === 'jobs' && (
                <div className="flex flex-wrap items-center gap-4 mb-6 p-4 bg-gray-50 rounded-xl">
                  {listing.company && (
                    <span className="flex items-center gap-1 text-sm text-gray-700">
                      <Briefcase className="w-4 h-4 text-gray-400" />
                      {listing.company}
                    </span>
                  )}
                  {listing.jobType && (
                    <span className="badge bg-blue-100 text-blue-700">{listing.jobType}</span>
                  )}
                  {listing.salary && (
                    <span className="flex items-center gap-1 text-sm text-gray-700">
                      <DollarSign className="w-4 h-4 text-gray-400" />
                      {listing.salary}
                    </span>
                  )}
                </div>
              )}

              {/* Description */}
              <div>
                <h2 className="font-semibold text-gray-900 mb-3">Description</h2>
                <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">
                  {listing.description}
                </p>
              </div>
            </div>

            {/* Report */}
            <div className="flex items-center justify-center">
              <button className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-red-500 transition-colors">
                <Flag className="w-4 h-4" />
                Report this ad
              </button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:w-80">
            {/* Seller Card */}
            <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm sticky top-20 mb-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                  <span className="text-lg font-bold text-gray-500">
                    {listing.sellerName.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{listing.sellerName}</h3>
                  <p className="text-xs text-gray-500">Active seller</p>
                </div>
              </div>

              {/* WhatsApp Button */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp w-full justify-center mb-3"
              >
                <MessageCircle className="w-5 h-5" />
                Chat on WhatsApp
              </a>

              {/* Call Button */}
              <a
                href={`tel:${listing.sellerPhone}`}
                className="flex items-center justify-center gap-2 w-full btn-secondary text-sm"
              >
                <Phone className="w-4 h-4" />
                Call Seller
              </a>
            </div>

            {/* Safety Tips */}
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4">
              <h3 className="text-sm font-semibold text-amber-800 mb-2">⚠️ Safety Tips</h3>
              <ul className="text-xs text-amber-700 space-y-1.5">
                <li>• Meet in a safe, public place</li>
                <li>• Don&apos;t pay in advance</li>
                <li>• Inspect the item before buying</li>
                <li>• Check the seller&apos;s profile</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Related Listings */}
        {related.length > 0 && (
          <div className="mt-12">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Similar Ads</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {related.map((item) => (
                <ListingCard key={item.id} listing={item} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
