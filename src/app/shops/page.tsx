'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Search, Store, Star, ExternalLink, Package } from 'lucide-react';
import { shops } from '@/data/listings';

export default function ShopsPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredShops = useMemo(() => {
    if (!searchQuery) return shops;
    const q = searchQuery.toLowerCase();
    return shops.filter(
      (shop) => shop.name.toLowerCase().includes(q) || shop.owner.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  // Generate gradient based on shop name
  const getGradient = (name: string) => {
    const gradients = [
      'from-blue-400 to-blue-600',
      'from-purple-400 to-purple-600',
      'from-green-400 to-green-600',
      'from-orange-400 to-orange-600',
      'from-pink-400 to-pink-600',
      'from-teal-400 to-teal-600',
      'from-indigo-400 to-indigo-600',
      'from-red-400 to-red-600',
      'from-yellow-400 to-yellow-600',
      'from-cyan-400 to-cyan-600',
    ];
    const index = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % gradients.length;
    return gradients[index];
  };

  return (
    <div className="min-h-screen bg-gray-50 fade-in">
      {/* Hero */}
      <div className="bg-gradient-to-br from-indigo-600 to-indigo-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">Vendor Shops</h1>
          <p className="text-indigo-200 text-sm md:text-base mb-6">
            Browse shops from trusted vendors
          </p>

          <div className="max-w-xl relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search shops..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl text-gray-900 bg-white shadow-lg outline-none text-sm"
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <p className="text-sm text-gray-500 mb-4">
          <span className="font-semibold text-gray-900">{filteredShops.length}</span> shops found
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {filteredShops.map((shop) => (
            <Link key={shop.id} href={`/shops/${shop.id}`}>
              <div className="card group hover:-translate-y-1 text-center">
                {/* Avatar */}
                <div className={`h-28 bg-gradient-to-br ${getGradient(shop.name)} flex items-center justify-center`}>
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                    <span className="text-2xl font-bold text-white">
                      {shop.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                </div>

                <div className="p-3">
                  <h3 className="font-semibold text-sm text-gray-900 group-hover:text-primary-600 transition-colors truncate mb-1">
                    {shop.name}
                  </h3>

                  {shop.verified && (
                    <div className="flex items-center justify-center gap-1 text-[10px] text-blue-600 mb-1.5">
                      <Star className="w-3 h-3 fill-blue-600" />
                      Verified
                    </div>
                  )}

                  <div className="flex items-center justify-center gap-1 text-xs text-gray-500">
                    <Package className="w-3.5 h-3.5" />
                    {shop.itemCount} items
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
