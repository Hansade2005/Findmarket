'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Upload, X, Camera, Plus, Check } from 'lucide-react';
import { categories, cities } from '@/data/listings';

export default function PostAdPage() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || '';

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    category: initialCategory,
    listingType: 'sale',
    city: '',
    town: '',
    negotiable: true,
    phone: '',
    // Property fields
    bedrooms: '',
    bathrooms: '',
    furnished: false,
    propertyType: '',
    // Vehicle fields
    vehicleMake: '',
    vehicleModel: '',
    vehicleYear: '',
    fuelType: '',
    transmission: '',
  });
  const [images, setImages] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center fade-in">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-3">Ad Posted Successfully! 🎉</h1>
          <p className="text-gray-600 mb-6">
            Your ad is now live on FindAm. Buyers can reach you directly on WhatsApp.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/listings" className="btn-primary">
              Browse Listings
            </Link>
            <button
              onClick={() => {
                setSubmitted(false);
                setStep(1);
                setFormData({
                  title: '',
                  description: '',
                  price: '',
                  category: '',
                  listingType: 'sale',
                  city: '',
                  town: '',
                  negotiable: true,
                  phone: '',
                  bedrooms: '',
                  bathrooms: '',
                  furnished: false,
                  propertyType: '',
                  vehicleMake: '',
                  vehicleModel: '',
                  vehicleYear: '',
                  fuelType: '',
                  transmission: '',
                });
              }}
              className="btn-secondary"
            >
              Post Another Ad
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 fade-in">
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 mb-2">
            <ArrowLeft className="w-4 h-4" />
            Back
          </Link>
          <h1 className="text-xl font-bold text-gray-900">Post Your Ad</h1>
          <p className="text-sm text-gray-500">Reach thousands of buyers on WhatsApp</p>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center gap-2">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center gap-2 flex-1">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-colors ${
                    step >= s
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-200 text-gray-500'
                  }`}
                >
                  {step > s ? <Check className="w-4 h-4" /> : s}
                </div>
                <span className={`text-xs font-medium hidden sm:block ${step >= s ? 'text-primary-600' : 'text-gray-400'}`}>
                  {s === 1 ? 'Details' : s === 2 ? 'Photos' : 'Contact'}
                </span>
                {s < 3 && <div className={`flex-1 h-0.5 ${step > s ? 'bg-primary-600' : 'bg-gray-200'}`} />}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <form onSubmit={handleSubmit}>
          {/* Step 1: Details */}
          {step === 1 && (
            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm slide-up">
              <h2 className="text-lg font-semibold text-gray-900 mb-5">Ad Details</h2>

              <div className="space-y-4">
                {/* Category */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {categories.map((cat) => (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => setFormData({ ...formData, category: cat.id })}
                        className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border-2 transition-all ${
                          formData.category === cat.id
                            ? 'border-primary-600 bg-primary-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <span className="text-xl">{cat.icon}</span>
                        <span className="text-xs font-medium">{cat.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Listing Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Listing Type *</label>
                  <div className="flex gap-2">
                    {[
                      { value: 'sale', label: 'For Sale' },
                      { value: 'rent', label: 'For Rent' },
                      { value: 'job', label: 'Job' },
                      { value: 'service', label: 'Service' },
                    ].map((type) => (
                      <button
                        key={type.value}
                        type="button"
                        onClick={() => setFormData({ ...formData, listingType: type.value })}
                        className={`flex-1 py-2.5 rounded-xl text-sm font-medium border-2 transition-all ${
                          formData.listingType === type.value
                            ? 'border-primary-600 bg-primary-50 text-primary-700'
                            : 'border-gray-200 text-gray-600 hover:border-gray-300'
                        }`}
                      >
                        {type.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Title */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Title *</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g., iPhone 14 Pro Max - 256GB"
                    className="input-field text-sm"
                    required
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Description *</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Describe your item in detail..."
                    className="input-field text-sm min-h-[120px] resize-y"
                    required
                  />
                </div>

                {/* Price */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Price (CFA)</label>
                    <input
                      type="number"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      placeholder="0"
                      className="input-field text-sm"
                    />
                  </div>
                  <div className="flex items-end pb-2">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.negotiable}
                        onChange={(e) => setFormData({ ...formData, negotiable: e.target.checked })}
                        className="w-4 h-4 rounded text-primary-600"
                      />
                      <span className="text-sm text-gray-700">Negotiable</span>
                    </label>
                  </div>
                </div>

                {/* City */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">City *</label>
                    <select
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="select-field text-sm"
                      required
                    >
                      <option value="">Select city</option>
                      {cities.map((city) => (
                        <option key={city.slug} value={city.name}>{city.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Town / Area</label>
                    <input
                      type="text"
                      value={formData.town}
                      onChange={(e) => setFormData({ ...formData, town: e.target.value })}
                      placeholder="e.g., Akwa, Bonapriso"
                      className="input-field text-sm"
                    />
                  </div>
                </div>

                {/* Property fields */}
                {(formData.category === 'property' || formData.category === 'rent') && (
                  <div className="border-t border-gray-100 pt-4 mt-4">
                    <h3 className="font-medium text-gray-900 text-sm mb-3">Property Details</h3>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">Bedrooms</label>
                        <input type="number" value={formData.bedrooms} onChange={(e) => setFormData({ ...formData, bedrooms: e.target.value })} className="input-field text-sm" />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">Bathrooms</label>
                        <input type="number" value={formData.bathrooms} onChange={(e) => setFormData({ ...formData, bathrooms: e.target.value })} className="input-field text-sm" />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">Property Type</label>
                        <select value={formData.propertyType} onChange={(e) => setFormData({ ...formData, propertyType: e.target.value })} className="select-field text-sm">
                          <option value="">Select</option>
                          <option value="Apartment">Apartment</option>
                          <option value="House">House</option>
                          <option value="Studio">Studio</option>
                          <option value="Land">Land</option>
                        </select>
                      </div>
                      <div className="flex items-end pb-2">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input type="checkbox" checked={formData.furnished} onChange={(e) => setFormData({ ...formData, furnished: e.target.checked })} className="w-4 h-4 rounded text-primary-600" />
                          <span className="text-sm text-gray-700">Furnished</span>
                        </label>
                      </div>
                    </div>
                  </div>
                )}

                {/* Vehicle fields */}
                {formData.category === 'vehicles' && (
                  <div className="border-t border-gray-100 pt-4 mt-4">
                    <h3 className="font-medium text-gray-900 text-sm mb-3">Vehicle Details</h3>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">Make</label>
                        <input type="text" value={formData.vehicleMake} onChange={(e) => setFormData({ ...formData, vehicleMake: e.target.value })} placeholder="e.g., Toyota" className="input-field text-sm" />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">Model</label>
                        <input type="text" value={formData.vehicleModel} onChange={(e) => setFormData({ ...formData, vehicleModel: e.target.value })} placeholder="e.g., Corolla" className="input-field text-sm" />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">Year</label>
                        <input type="number" value={formData.vehicleYear} onChange={(e) => setFormData({ ...formData, vehicleYear: e.target.value })} placeholder="2020" className="input-field text-sm" />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">Fuel Type</label>
                        <select value={formData.fuelType} onChange={(e) => setFormData({ ...formData, fuelType: e.target.value })} className="select-field text-sm">
                          <option value="">Select</option>
                          <option value="Petrol">Petrol</option>
                          <option value="Diesel">Diesel</option>
                          <option value="Electric">Electric</option>
                          <option value="Hybrid">Hybrid</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">Transmission</label>
                        <select value={formData.transmission} onChange={(e) => setFormData({ ...formData, transmission: e.target.value })} className="select-field text-sm">
                          <option value="">Select</option>
                          <option value="Automatic">Automatic</option>
                          <option value="Manual">Manual</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <button
                type="button"
                onClick={() => setStep(2)}
                className="w-full btn-primary mt-6"
              >
                Continue to Photos
              </button>
            </div>
          )}

          {/* Step 2: Photos */}
          {step === 2 && (
            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm slide-up">
              <h2 className="text-lg font-semibold text-gray-900 mb-5">Add Photos</h2>
              <p className="text-sm text-gray-500 mb-4">
                Add up to 8 photos to make your ad stand out
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                {/* Upload Button */}
                <label className="h-28 border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-primary-400 hover:bg-primary-50 transition-all">
                  <Camera className="w-6 h-6 text-gray-400 mb-1" />
                  <span className="text-xs text-gray-500">Add Photo</span>
                  <input type="file" accept="image/*" className="hidden" />
                </label>

                {/* Placeholder slots */}
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-28 border-2 border-dashed border-gray-200 rounded-xl flex items-center justify-center">
                    <Plus className="w-5 h-5 text-gray-300" />
                  </div>
                ))}
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="btn-secondary flex-1"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="btn-primary flex-1"
                >
                  Continue to Contact
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Contact */}
          {step === 3 && (
            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm slide-up">
              <h2 className="text-lg font-semibold text-gray-900 mb-5">Contact Information</h2>

              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">WhatsApp Number *</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+237 6XX XXX XXX"
                    className="input-field text-sm"
                    required
                  />
                  <p className="text-xs text-gray-400 mt-1">
                    Buyers will contact you directly on WhatsApp
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="btn-secondary flex-1"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="btn-primary flex-1"
                >
                  Post Ad for Free
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
