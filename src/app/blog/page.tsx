import Link from 'next/link';
import { Calendar, ArrowRight, User, Clock } from 'lucide-react';

const blogPosts = [
  {
    id: '1',
    title: 'How to Sell Fast on FindAm - Tips for Cameroon Sellers',
    excerpt: 'Learn the best strategies to sell your products quickly on the marketplace. From pricing to photos, we cover everything.',
    category: 'Tips',
    author: 'FindAm Team',
    date: '2026-02-15',
    readTime: '5 min',
    gradient: 'from-blue-400 to-blue-600',
  },
  {
    id: '2',
    title: 'Top 10 Neighborhoods in Douala for Renting',
    excerpt: 'Discover the best areas to rent in Douala. We compare prices, amenities, and safety across the city.',
    category: 'Real Estate',
    author: 'FindAm Team',
    date: '2026-02-12',
    readTime: '8 min',
    gradient: 'from-purple-400 to-purple-600',
  },
  {
    id: '3',
    title: 'Stay Safe: How to Avoid Scams When Buying Online',
    excerpt: 'Protect yourself from online scams. Learn the warning signs and follow our safety guidelines.',
    category: 'Safety',
    author: 'FindAm Team',
    date: '2026-02-08',
    readTime: '6 min',
    gradient: 'from-red-400 to-red-600',
  },
  {
    id: '4',
    title: 'Job Hunting in Cameroon: Complete Guide 2026',
    excerpt: 'Everything you need to know about finding a job in Cameroon. From IT to hospitality, we cover all sectors.',
    category: 'Jobs',
    author: 'FindAm Team',
    date: '2026-02-01',
    readTime: '10 min',
    gradient: 'from-green-400 to-green-600',
  },
  {
    id: '5',
    title: 'Buying a Used Car in Cameroon: What to Check',
    excerpt: 'Before buying a used car, make sure you check these important things. A complete buyer\'s guide.',
    category: 'Vehicles',
    author: 'FindAm Team',
    date: '2026-01-25',
    readTime: '7 min',
    gradient: 'from-orange-400 to-orange-600',
  },
];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-gray-50 fade-in">
      <div className="bg-gradient-to-br from-primary-600 to-primary-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">📝 Blog & Tips</h1>
          <p className="text-primary-200">
            Helpful guides, tips, and news for the Cameroon marketplace
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.map((post) => (
            <article key={post.id} className="card group hover:-translate-y-1">
              <div className={`h-40 bg-gradient-to-br ${post.gradient} flex items-center justify-center`}>
                <span className="text-4xl text-white/30">📝</span>
              </div>
              <div className="p-5">
                <span className="badge bg-primary-100 text-primary-700 text-[10px] mb-2">
                  {post.category}
                </span>
                <h2 className="font-semibold text-gray-900 group-hover:text-primary-600 transition-colors line-clamp-2 mb-2">
                  {post.title}
                </h2>
                <p className="text-sm text-gray-500 line-clamp-2 mb-3">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between text-xs text-gray-400">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1">
                      <User className="w-3 h-3" />
                      {post.author}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {post.readTime}
                    </span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
