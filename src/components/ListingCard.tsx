'use client';

import Link from 'next/link';
import { Heart, MapPin, Clock, Eye } from 'lucide-react';
import { Listing, formatPrice, timeAgo } from '@/data/listings';

interface ListingCardProps {
  listing: Listing;
  compact?: boolean;
}

export default function ListingCard({ listing, compact = false }: ListingCardProps) {
  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      electronics: 'bg-indigo-100 text-indigo-700',
      fashion: 'bg-orange-100 text-orange-700',
      vehicles: 'bg-red-100 text-red-700',
      property: 'bg-purple-100 text-purple-700',
      jobs: 'bg-green-100 text-green-700',
      services: 'bg-yellow-100 text-yellow-700',
      furniture: 'bg-teal-100 text-teal-700',
      kids_family: 'bg-pink-100 text-pink-700',
    };
    return colors[category] || 'bg-gray-100 text-gray-700';
  };

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

  // Generate a gradient for listings without images
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

  return (
    <Link href={`/ad/${listing.id}`} className="block">
      <div className="card group hover:-translate-y-1">
        {/* Image */}
        <div className={`relative ${compact ? 'h-36' : 'h-48'} bg-gradient-to-br ${gradient} overflow-hidden`}>
          {listing.images[0] ? (
            <div className="absolute inset-0 flex items-center justify-center text-white/30 text-6xl">
              {getCategoryIcon(listing.category)}
            </div>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-white/50 text-5xl">
              {getCategoryIcon(listing.category)}
            </div>
          )}

          {/* Badges */}
          <div className="absolute top-2 left-2 flex gap-1.5">
            {listing.featured && (
              <span className="badge-featured text-[10px]">
                Featured
              </span>
            )}
            {listing.urgent && (
              <span className="badge-urgent text-[10px]">
                Urgent
              </span>
            )}
          </div>

          {/* Favorite */}
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            className="absolute top-2 right-2 w-8 h-8 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-sm transition-all"
          >
            <Heart className="w-4 h-4 text-gray-400 hover:text-red-500" />
          </button>

          {/* Category badge */}
          <div className="absolute bottom-2 left-2">
            <span className={`badge text-[10px] ${getCategoryColor(listing.category)}`}>
              {getCategoryIcon(listing.category)} {listing.category.replace('_', ' ')}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-3.5">
          {/* Seller */}
          <div className="flex items-center gap-2 mb-1.5">
            <div className="w-5 h-5 bg-gray-200 rounded-full flex items-center justify-center">
              <span className="text-[8px] font-bold text-gray-500">
                {listing.sellerName.charAt(0).toUpperCase()}
              </span>
            </div>
            <span className="text-xs text-gray-500 truncate">{listing.sellerName}</span>
          </div>

          {/* Title */}
          <h3 className={`font-semibold text-gray-900 group-hover:text-primary-600 transition-colors line-clamp-2 ${compact ? 'text-sm' : 'text-sm'}`}>
            {listing.title}
          </h3>

          {/* Price */}
          <div className="mt-2 flex items-baseline gap-1.5">
            <span className="text-lg font-bold text-primary-600">
              {formatPrice(listing.price, listing.currency)}
            </span>
            {listing.negotiable && (
              <span className="text-[10px] text-green-600 font-medium">Negotiable</span>
            )}
            {listing.listingType === 'rent' && (
              <span className="text-xs text-gray-400">/monthly</span>
            )}
          </div>

          {/* Location & Time */}
          <div className="mt-2 flex items-center justify-between text-xs text-gray-400">
            <div className="flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              <span>{listing.town ? `${listing.town}, ${listing.city}` : listing.city}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              <span>{timeAgo(listing.createdAt)}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
