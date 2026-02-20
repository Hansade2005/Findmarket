import Link from 'next/link';
import { ArrowRight, MapPin, Rocket, Store, Search } from 'lucide-react';
import ListingCard from '@/components/ListingCard';
import { listings, categories, cities } from '@/data/listings';

export default function HomePage() {
  const featuredListings = listings.filter((l) => l.featured).slice(0, 8);
  const recentListings = listings.slice(0, 12);

  return (
    <div className="fade-in">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0djZoLTJ2LTZoLTR2Nmgtdi02aC00djZoLTJWMzRIMHYtMmg0di00SDB2LTJoNHYtNEgwdi0yaDR2LTZoMnY2aDR2LTZoMnY2aDR2LTZoMnY2aDRWMjBoMnY0aDR2MmgtNHY0aDR2Mmgt')] opacity-10"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 relative">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4">
              Cameroon&apos;s Marketplace.{' '}
              <span className="text-primary-200">Simplified.</span>
            </h1>
            <p className="text-lg md:text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
              Post products, browse shops, and contact sellers directly on WhatsApp.
            </p>

            {/* Location indicator */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm text-primary-100 mb-8">
              <MapPin className="w-4 h-4" />
              <span>📍 showing</span>
              <span className="font-semibold text-white">Near Maroua, Far North</span>
            </div>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search for anything..."
                    className="w-full pl-12 pr-4 py-3.5 rounded-xl text-gray-900 bg-white shadow-lg focus:ring-2 focus:ring-primary-300 outline-none text-sm"
                  />
                </div>
                <Link
                  href="/listings"
                  className="bg-accent-500 hover:bg-accent-600 text-white font-semibold py-3.5 px-8 rounded-xl transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 text-sm"
                >
                  <Search className="w-4 h-4" />
                  Search
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Popular Categories</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/listings?category=${cat.slug}`}
              className={`flex flex-col items-center gap-2 p-4 rounded-xl ${cat.color} hover:shadow-md transition-all duration-200 hover:-translate-y-0.5`}
            >
              <span className="text-2xl">{cat.icon}</span>
              <span className="text-xs font-semibold text-center">{cat.name}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Shop Feature Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="bg-gradient-to-r from-violet-600 to-purple-700 rounded-2xl p-6 md:p-8 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
          <div className="relative">
            <div className="inline-flex items-center gap-1.5 bg-white/20 text-xs font-semibold px-3 py-1 rounded-full mb-3">
              <Rocket className="w-3.5 h-3.5" />
              New Feature
            </div>
            <h2 className="text-xl md:text-2xl font-bold mb-2">
              Open Your Own Shop & Build Your Brand! 🚀
            </h2>
            <p className="text-purple-100 text-sm md:text-base mb-5 max-w-xl">
              Create your personalized storefront, showcase all your products in one place, and let customers find you easily. It&apos;s free!
            </p>
            <Link
              href="/shops"
              className="inline-flex items-center gap-2 bg-white text-purple-700 font-semibold text-sm py-2.5 px-5 rounded-xl hover:bg-purple-50 transition-all"
            >
              <Store className="w-4 h-4" />
              Create Your Shop
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Listings */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Featured Ads</h2>
          <Link href="/listings" className="text-sm font-semibold text-primary-600 hover:text-primary-700 flex items-center gap-1">
            View all <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {featuredListings.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      </section>

      {/* Explore Cameroon's Marketplace - SEO Section */}
      <section className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Explore Cameroon&apos;s Marketplace
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Popular Cities */}
            <div>
              <h3 className="text-base font-semibold text-gray-900 mb-4 flex items-center gap-2">
                🌍 Popular Cities
              </h3>
              <ul className="space-y-2.5">
                <li>
                  <Link href="/city/Douala" className="text-sm text-primary-600 hover:text-primary-700 hover:underline">
                    Buy, Sell, Rent Houses & Find Jobs in Douala
                  </Link>
                </li>
                <li>
                  <Link href="/city/Yaoundé" className="text-sm text-primary-600 hover:text-primary-700 hover:underline">
                    Buy, Sell & Rent Property in Yaoundé
                  </Link>
                </li>
                <li>
                  <Link href="/city/Bamenda" className="text-sm text-primary-600 hover:text-primary-700 hover:underline">
                    Marketplace & Classifieds in Bamenda
                  </Link>
                </li>
                <li>
                  <Link href="/city/Buea" className="text-sm text-primary-600 hover:text-primary-700 hover:underline">
                    Buy & Sell in Buea, Cameroon
                  </Link>
                </li>
                <li>
                  <Link href="/city/Limbe" className="text-sm text-primary-600 hover:text-primary-700 hover:underline">
                    Find Jobs & Houses in Limbe
                  </Link>
                </li>
                <li>
                  <Link href="/city/Bafoussam" className="text-sm text-primary-600 hover:text-primary-700 hover:underline">
                    Bafoussam Online Marketplace
                  </Link>
                </li>
              </ul>
            </div>

            {/* Real Estate */}
            <div>
              <h3 className="text-base font-semibold text-gray-900 mb-4 flex items-center gap-2">
                🏠 Real Estate
              </h3>
              <ul className="space-y-2.5">
                <li>
                  <Link href="/listings?listing_type=rent&city=Douala" className="text-sm text-primary-600 hover:text-primary-700 hover:underline">
                    Apartments for Rent in Douala
                  </Link>
                </li>
                <li>
                  <Link href="/listings?listing_type=rent&city=Yaoundé" className="text-sm text-primary-600 hover:text-primary-700 hover:underline">
                    Cheap Houses in Yaoundé
                  </Link>
                </li>
                <li>
                  <Link href="/listings?listing_type=rent&city=Buea" className="text-sm text-primary-600 hover:text-primary-700 hover:underline">
                    Student Rooms for Rent in Buea
                  </Link>
                </li>
                <li>
                  <Link href="/listings?listing_type=rent&city=Bamenda" className="text-sm text-primary-600 hover:text-primary-700 hover:underline">
                    Land for Sale in Bamenda
                  </Link>
                </li>
                <li>
                  <Link href="/listings?listing_type=rent&city=Limbe" className="text-sm text-primary-600 hover:text-primary-700 hover:underline">
                    Beach Houses in Limbe
                  </Link>
                </li>
                <li>
                  <Link href="/properties" className="text-sm text-primary-600 hover:text-primary-700 hover:underline">
                    All Property Listings in Cameroon
                  </Link>
                </li>
              </ul>
            </div>

            {/* Jobs & Careers */}
            <div>
              <h3 className="text-base font-semibold text-gray-900 mb-4 flex items-center gap-2">
                💼 Jobs & Careers
              </h3>
              <ul className="space-y-2.5">
                <li>
                  <Link href="/listings?listing_type=job&city=Douala" className="text-sm text-primary-600 hover:text-primary-700 hover:underline">
                    IT Jobs in Douala
                  </Link>
                </li>
                <li>
                  <Link href="/listings?listing_type=job&city=Yaoundé" className="text-sm text-primary-600 hover:text-primary-700 hover:underline">
                    Driver Jobs in Yaoundé
                  </Link>
                </li>
                <li>
                  <Link href="/listings?listing_type=job&city=Limbe" className="text-sm text-primary-600 hover:text-primary-700 hover:underline">
                    Hotel Jobs in Limbe
                  </Link>
                </li>
                <li>
                  <Link href="/listings?listing_type=job&city=Bamenda" className="text-sm text-primary-600 hover:text-primary-700 hover:underline">
                    Teaching Jobs in Bamenda
                  </Link>
                </li>
                <li>
                  <Link href="/listings?listing_type=job" className="text-sm text-primary-600 hover:text-primary-700 hover:underline">
                    Remote Jobs in Cameroon
                  </Link>
                </li>
                <li>
                  <Link href="/jobs" className="text-sm text-primary-600 hover:text-primary-700 hover:underline">
                    All Jobs in Cameroon
                  </Link>
                </li>
              </ul>
            </div>

            {/* Products */}
            <div>
              <h3 className="text-base font-semibold text-gray-900 mb-4 flex items-center gap-2">
                📱 Products
              </h3>
              <ul className="space-y-2.5">
                <li>
                  <Link href="/listings?listing_type=sale&category=electronics&city=Douala" className="text-sm text-primary-600 hover:text-primary-700 hover:underline">
                    iPhones for Sale in Douala
                  </Link>
                </li>
                <li>
                  <Link href="/listings?listing_type=sale&category=electronics&city=Yaoundé" className="text-sm text-primary-600 hover:text-primary-700 hover:underline">
                    Used Laptops in Yaoundé
                  </Link>
                </li>
                <li>
                  <Link href="/listings?listing_type=sale&category=vehicles&city=Douala" className="text-sm text-primary-600 hover:text-primary-700 hover:underline">
                    Cars for Sale in Douala
                  </Link>
                </li>
                <li>
                  <Link href="/listings?listing_type=sale&category=fashion" className="text-sm text-primary-600 hover:text-primary-700 hover:underline">
                    Fashion & Clothing in Cameroon
                  </Link>
                </li>
                <li>
                  <Link href="/listings?listing_type=sale&category=furniture" className="text-sm text-primary-600 hover:text-primary-700 hover:underline">
                    Furniture & Home Decor
                  </Link>
                </li>
                <li>
                  <Link href="/vehicles" className="text-sm text-primary-600 hover:text-primary-700 hover:underline">
                    All Vehicles for Sale
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary-600 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">Post Your Ad</h2>
          <p className="text-primary-100 mb-6">Reach thousands of buyers on WhatsApp</p>
          <Link
            href="/post-ad"
            className="inline-flex items-center gap-2 bg-white text-primary-700 font-semibold py-3 px-8 rounded-xl hover:bg-primary-50 transition-all shadow-lg text-sm"
          >
            Post Free Ad
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
