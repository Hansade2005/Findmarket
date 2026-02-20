import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 hidden md:block">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">F</span>
              </div>
              <span className="text-xl font-bold text-white">FindAm</span>
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed">
              Find Anything, Anywhere in Cameroon
            </p>
          </div>

          {/* Real Estate & Property */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Real Estate & Property</h4>
            <ul className="space-y-2.5">
              <li>
                <Link href="/listings?listing_type=rent&city=Douala" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Apartments for Rent in Douala
                </Link>
              </li>
              <li>
                <Link href="/listings?listing_type=rent&city=Yaoundé" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Houses for Rent in Yaoundé
                </Link>
              </li>
              <li>
                <Link href="/listings?listing_type=rent&city=Buea" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Student Rooms in Buea
                </Link>
              </li>
              <li>
                <Link href="/properties" className="text-sm text-gray-400 hover:text-white transition-colors">
                  All Property Listings
                </Link>
              </li>
            </ul>
          </div>

          {/* Jobs & Careers */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Jobs & Careers</h4>
            <ul className="space-y-2.5">
              <li>
                <Link href="/listings?listing_type=job&city=Douala" className="text-sm text-gray-400 hover:text-white transition-colors">
                  IT Jobs in Douala
                </Link>
              </li>
              <li>
                <Link href="/listings?listing_type=job&city=Yaoundé" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Driver Jobs in Yaoundé
                </Link>
              </li>
              <li>
                <Link href="/listings?listing_type=job&city=Limbe" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Hotel Jobs in Limbe
                </Link>
              </li>
              <li>
                <Link href="/jobs" className="text-sm text-gray-400 hover:text-white transition-colors">
                  All Jobs in Cameroon
                </Link>
              </li>
            </ul>
          </div>

          {/* Electronics & Products */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Electronics & Products</h4>
            <ul className="space-y-2.5">
              <li>
                <Link href="/listings?listing_type=sale&category=electronics&city=Douala" className="text-sm text-gray-400 hover:text-white transition-colors">
                  iPhones for Sale in Douala
                </Link>
              </li>
              <li>
                <Link href="/listings?listing_type=sale&category=electronics" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Used Laptops in Cameroon
                </Link>
              </li>
              <li>
                <Link href="/listings?listing_type=sale&category=vehicles" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Cars for Sale in Cameroon
                </Link>
              </li>
              <li>
                <Link href="/vehicles" className="text-sm text-gray-400 hover:text-white transition-colors">
                  All Vehicles
                </Link>
              </li>
            </ul>
          </div>

          {/* Company & Legal */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Company</h4>
            <ul className="space-y-2.5">
              <li>
                <Link href="/about" className="text-sm text-gray-400 hover:text-white transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Blog & Tips
                </Link>
              </li>
              <li>
                <Link href="/feedback" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Send Feedback
                </Link>
              </li>
            </ul>
            <h4 className="text-sm font-semibold text-white mb-3 mt-6">Legal</h4>
            <ul className="space-y-2.5">
              <li>
                <Link href="/terms" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/safety" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Safety & Anti-Scam
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-8 text-center">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} FindAm. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
