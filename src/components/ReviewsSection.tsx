import React, { useState } from 'react';
import { Language, CustomerReview, ServiceCategory } from '../types';
import { translations } from '../data/translations';
import { REVIEWS_DATA } from '../data/mockData';
import { Star, ShieldCheck, Heart, MessageSquarePlus, CheckCircle2, X } from 'lucide-react';

interface ReviewsSectionProps {
  language: Language;
}

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({ language }) => {
  const [reviews, setReviews] = useState<CustomerReview[]>(REVIEWS_DATA);
  const [filter, setFilter] = useState<ServiceCategory | 'all'>('all');
  const [writeModalOpen, setWriteModalOpen] = useState(false);
  const [author, setAuthor] = useState('');
  const [location, setLocation] = useState('');
  const [rating, setRating] = useState(5);
  const [category, setCategory] = useState<ServiceCategory>('hair');
  const [serviceName, setServiceName] = useState('');
  const [text, setText] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const t = translations[language];

  const filtered = filter === 'all'
    ? reviews
    : reviews.filter((r: CustomerReview) => r.serviceCategory === filter);

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    const newRev: CustomerReview = {
      id: `rev-${Date.now()}`,
      author,
      location: location || 'Ongata Rongai',
      date: 'Just now',
      rating,
      serviceCategory: category,
      serviceName: serviceName || 'Agatha Glamour Session',
      stylistName: 'Agatha Glamour Stylist',
      text,
      verified: true,
    };
    setReviews([newRev, ...reviews]);
    setSubmitted(true);
    setTimeout(() => {
      setWriteModalOpen(false);
      setSubmitted(false);
      setAuthor('');
      setLocation('');
      setServiceName('');
      setText('');
    }, 2000);
  };

  return (
    <section id="reviews" className="py-16 lg:py-24 bg-[#FFF0F4] border-b border-[#FCE1E8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Customer Service Week Tribute Card */}
        <div className="mb-14 rounded-3xl bg-gradient-to-r from-[#FFF5F8] via-white to-[#FDEFF2] border-2 border-[#FAD6DF] p-6 sm:p-9 relative overflow-hidden shadow-[0_15px_40px_-5px_rgba(224,122,147,0.18)]">
          <div className="absolute top-0 right-0 w-72 h-72 bg-[#F8BDCE]/25 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-8 space-y-3">
              <div className="inline-flex items-center gap-2 text-xs font-bold text-[#C74B72] tracking-widest uppercase bg-white px-3.5 py-1.5 rounded-full border border-[#F8D2DC] shadow-xs">
                <Heart className="w-4 h-4 fill-[#E07A93] text-[#E07A93]" />
                <span>Happy Customer Service Week</span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#2E141D]">
                Thank You for Choosing Agatha Glamour
              </h3>
              <p className="text-sm text-[#6B4653] leading-relaxed">
                "To our amazing customers: We appreciate you for always choosing Agatha Glamour. Your trust, support, and kind words mean the world to us! YOU ARE THE REASON WE DO WHAT WE DO!"
              </p>
              <div className="flex flex-wrap items-center gap-6 pt-2 text-xs text-[#52303D] font-medium">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#E07A93]" />
                  <span>Your Satisfaction Matters</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#E07A93]" />
                  <span>We Value Your Trust</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#E07A93]" />
                  <span>Always Here For You</span>
                </div>
              </div>
            </div>

            <div className="md:col-span-4 flex flex-col items-center justify-center p-5 rounded-2xl bg-white border border-[#F8DCE2] text-center space-y-1 shadow-sm">
              <div className="flex items-center gap-1 text-[#D4AF37]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-[#D4AF37]" />
                ))}
              </div>
              <div className="font-serif text-3xl font-bold text-[#2E141D] tabular-nums">4.95 / 5.0</div>
              <p className="text-[11px] text-[#8C5A69]">Based on 680+ Verified Client Reviews</p>
              <button
                onClick={() => setWriteModalOpen(true)}
                className="mt-2 text-xs font-bold text-[#C74B72] hover:underline flex items-center gap-1.5"
              >
                <MessageSquarePlus className="w-3.5 h-3.5" />
                <span>Leave Your Review</span>
              </button>
            </div>
          </div>
        </div>

        {/* Section Header & Filters */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          <div>
            <h3 className="font-serif text-2xl font-bold text-[#2E141D]">
              Community Voices & Testimonials
            </h3>
            <p className="text-xs text-[#7A4D5C]">
              Real experiences from clients in Ongata Rongai, Karen, Kiserian and Nairobi
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex items-center gap-1.5 p-1 bg-white rounded-xl border border-[#F8D2DC] shadow-xs">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                filter === 'all' ? 'bg-[#C74B72] text-white shadow-xs' : 'text-[#7A4D5C] hover:text-[#C74B72]'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilter('hair')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                filter === 'hair' ? 'bg-[#C74B72] text-white shadow-xs' : 'text-[#7A4D5C] hover:text-[#C74B72]'
              }`}
            >
              Hair
            </button>
            <button
              onClick={() => setFilter('nails')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                filter === 'nails' ? 'bg-[#C74B72] text-white shadow-xs' : 'text-[#7A4D5C] hover:text-[#C74B72]'
              }`}
            >
              Nails
            </button>
            <button
              onClick={() => setFilter('makeup')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                filter === 'makeup' ? 'bg-[#C74B72] text-white shadow-xs' : 'text-[#7A4D5C] hover:text-[#C74B72]'
              }`}
            >
              Makeup
            </button>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filtered.map((rev: CustomerReview) => (
            <div
              key={rev.id}
              className="bg-white border border-[#F8DCE2] rounded-3xl p-6 flex flex-col justify-between space-y-4 hover:border-[#E07A93] transition-colors shadow-[0_10px_30px_-5px_rgba(224,122,147,0.1)] hover:shadow-[0_15px_40px_-5px_rgba(224,122,147,0.18)]"
            >
              <div className="space-y-3">
                {/* Rating & Verified Tag */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-0.5 text-[#D4AF37]">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-[#D4AF37]" />
                    ))}
                  </div>
                  {rev.verified && (
                    <span className="flex items-center gap-1 text-[10px] font-bold text-[#1E7E34] bg-[#E8F8EC] px-2 py-0.5 rounded-full border border-[#BDE8C8]">
                      <ShieldCheck className="w-3 h-3 text-[#25D366]" />
                      <span>Verified</span>
                    </span>
                  )}
                </div>

                <p className="text-xs text-[#52303D] leading-relaxed italic">
                  "{rev.text}"
                </p>
              </div>

              <div className="pt-3 border-t border-[#F8DCE2]">
                <div className="font-bold text-xs text-[#2E141D]">{rev.author}</div>
                <div className="text-[10px] text-[#8C5A69]">
                  {rev.location} · {rev.serviceName}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Write Review Modal */}
      {writeModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative w-full max-w-md bg-white border border-[#F8D2DC] rounded-3xl shadow-2xl p-6 sm:p-8 space-y-5">
            <div className="flex items-center justify-between border-b border-[#F8D2DC] pb-4">
              <h3 className="font-serif text-lg font-bold text-[#2E141D]">
                Share Your Agatha Experience
              </h3>
              <button
                onClick={() => setWriteModalOpen(false)}
                className="p-1 text-[#8C5A69] hover:text-[#2E141D]"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {submitted ? (
              <div className="p-6 text-center space-y-3 bg-[#E8F8EC] border border-[#BDE8C8] rounded-2xl text-[#1E7E34]">
                <CheckCircle2 className="w-10 h-10 text-[#25D366] mx-auto" />
                <h4 className="font-serif text-lg font-bold text-[#1E7E34]">Thank You!</h4>
                <p className="text-xs text-[#2B6E3C]">
                  Your review has been verified and added to the Agatha Glamour community wall.
                </p>
              </div>
            ) : (
              <form onSubmit={handleAddReview} className="space-y-4 text-xs">
                <div>
                  <label className="font-semibold text-[#52303D] block mb-1">Your Name *</label>
                  <input
                    type="text"
                    required
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    placeholder="e.g. Sandra Ndinda"
                    className="w-full bg-[#FFF5F8] border border-[#F8D2DC] rounded-xl px-3.5 py-2 text-[#2E141D] focus:outline-none focus:border-[#C74B72]"
                  />
                </div>

                <div>
                  <label className="font-semibold text-[#52303D] block mb-1">Location in Rongai / Nairobi</label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g. Maasai Lodge, Rongai"
                    className="w-full bg-[#FFF5F8] border border-[#F8D2DC] rounded-xl px-3.5 py-2 text-[#2E141D] focus:outline-none focus:border-[#C74B72]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-semibold text-[#52303D] block mb-1">Category</label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value as any)}
                      className="w-full bg-[#FFF5F8] border border-[#F8D2DC] rounded-xl px-3 py-2 text-[#2E141D] focus:outline-none focus:border-[#C74B72]"
                    >
                      <option value="hair">Hair & Braids</option>
                      <option value="nails">Nails & Art</option>
                      <option value="makeup">Makeup & Bridal</option>
                      <option value="spa">Spa & Wellness</option>
                    </select>
                  </div>

                  <div>
                    <label className="font-semibold text-[#52303D] block mb-1">Rating</label>
                    <select
                      value={rating}
                      onChange={(e) => setRating(Number(e.target.value))}
                      className="w-full bg-[#FFF5F8] border border-[#F8D2DC] rounded-xl px-3 py-2 text-[#2E141D] focus:outline-none focus:border-[#C74B72]"
                    >
                      <option value={5}>5 Stars (Excellent)</option>
                      <option value={4}>4 Stars (Very Good)</option>
                      <option value={3}>3 Stars (Average)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="font-semibold text-[#52303D] block mb-1">Service Received</label>
                  <input
                    type="text"
                    value={serviceName}
                    onChange={(e) => setServiceName(e.target.value)}
                    placeholder="e.g. Boho Goddess Braids"
                    className="w-full bg-[#FFF5F8] border border-[#F8D2DC] rounded-xl px-3.5 py-2 text-[#2E141D] focus:outline-none focus:border-[#C74B72]"
                  />
                </div>

                <div>
                  <label className="font-semibold text-[#52303D] block mb-1">Your Review *</label>
                  <textarea
                    rows={3}
                    required
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Tell the community about your stylist, finish, and experience..."
                    className="w-full bg-[#FFF5F8] border border-[#F8D2DC] rounded-xl px-3.5 py-2 text-[#2E141D] focus:outline-none focus:border-[#C74B72]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 px-4 font-semibold text-white bg-gradient-to-r from-[#F08CA5] via-[#E07A93] to-[#C74B72] rounded-xl hover:brightness-105 transition-all shadow-md shadow-[#E07A93]/20"
                >
                  Post Verified Review
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
