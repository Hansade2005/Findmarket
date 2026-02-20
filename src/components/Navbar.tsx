'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, Plus, Globe, User, Search, Home, ShoppingBag, MessageSquare, LogIn } from 'lucide-react';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [lang, setLang] = useState<'EN' | 'FR'>('EN');

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/properties', label: 'Properties' },
    { href: '/vehicles', label: 'Vehicles' },
    { href: '/jobs', label: 'Jobs' },
    { href: '/shops', label: 'Shops' },
    { href: '/blog', label: 'Blog' },
  ];

  return (
    <>
      {/* Desktop Navbar */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <div className="w-9 h-9 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">F</span>
              </div>
              <span className="text-xl font-bold text-gray-900">FindAm</span>
            </Link>

            {/* Desktop Nav Links */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-3 py-2 text-sm font-medium text-gray-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Right Side */}
            <div className="flex items-center gap-2">
              {/* Language Toggle */}
              <button
                onClick={() => setLang(lang === 'EN' ? 'FR' : 'EN')}
                className="hidden sm:flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-gray-600 hover:text-primary-600 border border-gray-200 rounded-lg hover:border-primary-200 transition-colors"
              >
                <Globe className="w-3.5 h-3.5" />
                {lang === 'EN' ? 'FR' : 'EN'}
              </button>

              {/* Post Ad Button */}
              <Link
                href="/post-ad"
                className="hidden sm:flex items-center gap-1.5 bg-primary-600 hover:bg-primary-700 text-white font-semibold text-sm py-2 px-4 rounded-xl transition-all shadow-sm hover:shadow-md"
              >
                <Plus className="w-4 h-4" />
                Post Ad
              </Link>

              {/* Login */}
              <Link
                href="/login"
                className="hidden sm:flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-primary-600 px-3 py-2 rounded-lg hover:bg-primary-50 transition-colors"
              >
                <User className="w-4 h-4" />
                Login
              </Link>

              {/* Mobile menu button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 text-gray-600 hover:text-primary-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 shadow-lg fade-in">
            <div className="px-4 py-3 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-4 py-2.5 text-sm font-medium text-gray-700 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-2 border-t border-gray-100 mt-2 space-y-2">
                <Link
                  href="/post-ad"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block w-full text-center bg-primary-600 hover:bg-primary-700 text-white font-semibold text-sm py-2.5 px-4 rounded-xl transition-all"
                >
                  Post Ad
                </Link>
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block w-full text-center text-sm font-medium text-gray-600 hover:text-primary-600 py-2 rounded-lg"
                >
                  Login
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
        <div className="flex items-center justify-around py-2">
          <Link href="/" className="flex flex-col items-center gap-0.5 px-3 py-1 text-gray-500 hover:text-primary-600">
            <Home className="w-5 h-5" />
            <span className="text-[10px] font-medium">Home</span>
          </Link>
          <Link href="/listings" className="flex flex-col items-center gap-0.5 px-3 py-1 text-gray-500 hover:text-primary-600">
            <Search className="w-5 h-5" />
            <span className="text-[10px] font-medium">Browse</span>
          </Link>
          <Link href="/post-ad" className="flex flex-col items-center -mt-4">
            <div className="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center shadow-lg">
              <Plus className="w-6 h-6 text-white" />
            </div>
          </Link>
          <Link href="/messages" className="flex flex-col items-center gap-0.5 px-3 py-1 text-gray-500 hover:text-primary-600">
            <MessageSquare className="w-5 h-5" />
            <span className="text-[10px] font-medium">Messages</span>
          </Link>
          <Link href="/login" className="flex flex-col items-center gap-0.5 px-3 py-1 text-gray-500 hover:text-primary-600">
            <LogIn className="w-5 h-5" />
            <span className="text-[10px] font-medium">Login</span>
          </Link>
        </div>
      </div>
    </>
  );
}
