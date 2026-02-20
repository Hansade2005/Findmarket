'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Store, Star, Package, MapPin, Phone, MessageCircle } from 'lucide-react';
import { shops, listings } from '@/data/listings';
import ListingCard from '@/components/ListingCard';

export default function ShopDetailPage() {
  const params = useParams();
  const shopId = params.id as string;
  const shop = shops.find((s) => s.id === shopId);

  if (!shop) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">🏪</div>
          <h1 className="text-xl font-bold text-gray-900 mb-2">Shop Not Found</h1>
          <Link href="/shops" className="text-primary-600 hover:text-primary-700 text-sm">
            Back to Shops
          </Link>
        </div>
      </div>
    );
  }

  // Get listings for this shop (mock: use random listings)
  const shopListings = listings.slice(0, shop.itemCount > 8 ? 8 : shop.itemCount);

  const gradients = [
    'from-blue-400 to-blue-600',
    'from-purple-400 to-purple-600',
    'from-green-400 to-green-600',
    'from-orange-400 to-orange-600',
    'from-pink-400 to-pink-600',
  ];
  const gradient = gradients[shop.name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % gradients.length];

  return (
    <div className="min-h-screen bg-gray-50 fade-in">
      {/* Shop Header */}
      <div className={`bg-gradient-to-br ${gradient} text-white`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <Link href="/shops" className="inline-flex items-center gap-1 text-sm text-white/80 hover:text-white mb-4">
            <ArrowLeft className="w-4 h-4" />
            Back to Shops
          </Link>

          <div className="flex items-center gap-4">
            <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
              <span className="text-3xl font-bold text-white">
                {shop.name.charAt(0).toUpperCase()}
              </span>
            </div>
            <div>
              <h1 className="text-2xl font-bold flex items-center gap-2">
                {shop.name}
                {shop.verified && <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />}
              </h1>
              <div className="flex items-center gap-3 mt-1 text-sm text-white/80">
                <span className="flex items-center gap-1">
                  <Package className="w-4 h-4" />
                  {shop.itemCount} items
                </span>
                {shop.city && (
                  <span className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {shop.city}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Shop Products */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Products ({shop.itemCount})</h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {shopListings.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      </div>
    </div>
  );
}
