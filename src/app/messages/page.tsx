'use client';

import Link from 'next/link';
import { MessageSquare, ArrowRight, LogIn } from 'lucide-react';

export default function MessagesPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 fade-in">
      <div className="text-center max-w-md">
        <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <MessageSquare className="w-10 h-10 text-primary-600" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-3">Messages</h1>
        <p className="text-gray-600 mb-6">
          Login to view your messages and conversations with buyers and sellers.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/login" className="btn-primary flex items-center justify-center gap-2">
            <LogIn className="w-4 h-4" />
            Login to Continue
          </Link>
          <Link href="/" className="btn-secondary flex items-center justify-center gap-2">
            Back to Home
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
