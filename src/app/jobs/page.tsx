'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Search, Plus, MapPin, Briefcase, Clock, DollarSign } from 'lucide-react';
import { listings, formatPrice, timeAgo, cities } from '@/data/listings';

export default function JobsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [jobType, setJobType] = useState('');

  const jobs = useMemo(() => {
    let result = listings.filter((l) => l.category === 'jobs');

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (l) => l.title.toLowerCase().includes(q) || l.description.toLowerCase().includes(q)
      );
    }

    if (selectedCity) {
      result = result.filter((l) => l.city === selectedCity);
    }

    if (jobType) {
      result = result.filter((l) => l.jobType === jobType);
    }

    return result;
  }, [searchQuery, selectedCity, jobType]);

  return (
    <div className="min-h-screen bg-gray-50 fade-in">
      {/* Hero */}
      <div className="bg-gradient-to-br from-green-600 to-green-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">💼 Jobs & Careers in Cameroon</h1>
          <p className="text-green-200 text-sm md:text-base mb-6">
            Find your next career opportunity or post a job listing
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search jobs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl text-gray-900 bg-white shadow-lg outline-none text-sm"
              />
            </div>
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="px-4 py-3 rounded-xl text-gray-900 bg-white shadow-lg outline-none text-sm"
            >
              <option value="">All cities</option>
              {cities.map((city) => (
                <option key={city.slug} value={city.name}>{city.name}</option>
              ))}
            </select>
            <Link
              href="/post-ad?category=jobs"
              className="inline-flex items-center justify-center gap-2 bg-white text-green-700 font-semibold py-3 px-6 rounded-xl hover:bg-green-50 transition-all shadow-lg text-sm"
            >
              <Plus className="w-4 h-4" />
              Post Job
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">
          {jobs.length} Jobs Found
        </h2>

        {jobs.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl">
            <div className="text-4xl mb-4">💼</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No jobs found</h3>
            <p className="text-sm text-gray-500">Try adjusting your search</p>
          </div>
        ) : (
          <div className="space-y-3">
            {jobs.map((job) => (
              <Link key={job.id} href={`/ad/${job.id}`}>
                <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm hover:shadow-md hover:border-green-200 transition-all group">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 group-hover:text-green-600 transition-colors mb-1">
                        {job.title}
                      </h3>
                      {job.company && (
                        <p className="text-sm text-gray-600 mb-2">{job.company}</p>
                      )}
                      <p className="text-sm text-gray-500 line-clamp-2 mb-3">
                        {job.description}
                      </p>

                      <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5" />
                          {job.city}
                        </span>
                        {job.jobType && (
                          <span className="flex items-center gap-1">
                            <Briefcase className="w-3.5 h-3.5" />
                            {job.jobType}
                          </span>
                        )}
                        {job.salary && (
                          <span className="flex items-center gap-1">
                            <DollarSign className="w-3.5 h-3.5" />
                            {job.salary}
                          </span>
                        )}
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          {timeAgo(job.createdAt)}
                        </span>
                      </div>
                    </div>

                    <div className="flex-shrink-0">
                      <div className="text-sm font-semibold text-green-600">
                        {job.sellerName}
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
