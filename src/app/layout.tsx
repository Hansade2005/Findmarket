import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CitySelector from '@/components/CitySelector';

export const metadata: Metadata = {
  title: 'FindAm - Buy, Sell & Find Anything in Cameroon | Free Online Marketplace',
  description: 'Post products, browse shops, and contact sellers directly on WhatsApp. Cameroon\'s #1 online marketplace for buying, selling, renting properties, finding jobs, and more.',
  keywords: 'Cameroon marketplace, buy sell Cameroon, Douala, Yaoundé, properties, jobs, vehicles, electronics',
  openGraph: {
    title: 'FindAm - Buy, Sell & Find Anything in Cameroon',
    description: 'Cameroon\'s Marketplace. Simplified. Post products, browse shops, and contact sellers directly on WhatsApp.',
    type: 'website',
    locale: 'en_US',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50 antialiased">
        <Navbar />
        <main className="min-h-[calc(100vh-64px)]">
          {children}
        </main>
        <Footer />
        <CitySelector />
      </body>
    </html>
  );
}
