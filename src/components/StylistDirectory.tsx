import React from 'react';
import { Language, Stylist } from '../types';
import { translations } from '../data/translations';
import { STYLISTS_DATA } from '../data/mockData';
import { Sparkles, Star, Calendar, Instagram, Award, Clock, Heart } from 'lucide-react';

interface StylistDirectoryProps {
  language: Language;
  onBookWithStylist: (stylistId: string) => void;
}

export const StylistDirectory: React.FC<StylistDirectoryProps> = ({ language, onBookWithStylist }) => {
  const t = translations[language];

  return (
    <section id="stylists" className="py-16 lg:py-24 bg-[#FFF0F4] border-b border-[#FCE1E8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#C74B72] tracking-widest uppercase bg-white px-3.5 py-1.5 rounded-full border border-[#F8D2DC] shadow-xs">
            <Heart className="w-3.5 h-3.5 fill-[#E07A93] text-[#E07A93]" />
            <span>Master Artisans & Educators</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#2E141D]">
            {t.selectStylist}
          </h2>
          <p className="text-sm text-[#7A4D5C]">
            Meet our certified team of beauty visionaries dedicated to personalized luxury and hair/nail health.
          </p>
        </div>

        {/* Stylists Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {STYLISTS_DATA.map((stylist: Stylist) => {
            const displayTitle = language === 'sw' ? stylist.titleSw : stylist.title;
            const displayBio = language === 'sw' ? stylist.bioSw : stylist.bio;

            return (
              <div
                key={stylist.id}
                className="bg-white border border-[#F8DCE2] rounded-3xl overflow-hidden hover:border-[#E07A93] transition-all duration-300 flex flex-col justify-between shadow-[0_10px_30px_-5px_rgba(224,122,147,0.1)] hover:shadow-[0_15px_40px_-5px_rgba(224,122,147,0.18)] group"
              >
                <div>
                  {/* Stylist Portrait */}
                  <div className="relative aspect-square overflow-hidden bg-[#FCECEF]">
                    <img
                      src={stylist.image}
                      alt={stylist.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#2B0E17]/80 via-transparent to-transparent" />

                    {/* Rating Pill */}
                    <div className="absolute bottom-3 left-3 flex items-center gap-1.5 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-full text-xs font-bold text-[#6E2A40] border border-[#F8D2DC] shadow-xs">
                      <Star className="w-3.5 h-3.5 fill-[#D4AF37] text-[#D4AF37]" />
                      <span className="tabular-nums font-mono">{stylist.rating}</span>
                      <span className="text-[#9E6577] text-[10px]">({stylist.reviewsCount})</span>
                    </div>

                    {/* Instagram handle */}
                    <a
                      href={`https://instagram.com/${stylist.instagram.replace('@', '')}`}
                      target="_blank"
                      rel="noreferrer"
                      className="absolute top-3 right-3 p-2 rounded-full bg-white/90 text-[#C74B72] hover:bg-[#C74B72] hover:text-white transition-colors shadow-xs"
                      title="Follow on Instagram"
                    >
                      <Instagram className="w-3.5 h-3.5" />
                    </a>
                  </div>

                  {/* Stylist Details */}
                  <div className="p-5 space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="font-serif text-lg font-bold text-[#2E141D] flex items-center gap-1.5">
                          <span>{stylist.name}</span>
                          {stylist.id === 'stylist-agatha' && (
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#FFF0F4] border border-[#FAD6DF] text-[#C74B72]">
                              Main Top Artist
                            </span>
                          )}
                        </h3>
                        <p className="text-xs font-semibold text-[#C74B72]">
                          {displayTitle}
                        </p>
                      </div>
                    </div>

                    {stylist.id === 'stylist-agatha' ? (
                      <div className="p-2.5 rounded-xl bg-[#FFF5F8] border border-[#FAD6DF] space-y-1.5 text-[11px]">
                        <span className="text-[10px] font-bold text-[#C74B72] uppercase tracking-wider block">
                          Agatha's Official Rates
                        </span>
                        <div className="flex justify-between font-mono">
                          <span className="text-[#6B4653]">Personal Makeup:</span>
                          <span className="font-bold text-[#2E141D]">Ksh. 10,000</span>
                        </div>
                        <div className="flex justify-between font-mono">
                          <span className="text-[#6B4653]">Pro Makeup:</span>
                          <span className="font-bold text-[#C74B72]">Ksh. 20,000</span>
                        </div>
                        <div className="text-[10px] text-[#15803D] font-bold pt-0.5 border-t border-[#FAD6DF]">
                          Call / WhatsApp: 0710.690.669
                        </div>
                      </div>
                    ) : (
                      <div className="text-[11px] text-[#7A4D5C] space-y-1">
                        <div className="flex items-center gap-1.5 text-[#52303D]">
                          <Award className="w-3.5 h-3.5 text-[#C74B72] shrink-0" />
                          <span className="truncate">{stylist.specialty}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-[#9E6577] shrink-0" />
                          <span>{stylist.experienceYears} Years Professional Experience</span>
                        </div>
                      </div>
                    )}

                    <p className="text-xs text-[#8C5A69] leading-relaxed line-clamp-3">
                      {displayBio}
                    </p>

                    {/* Available Slots Preview */}
                    <div className="pt-2">
                      <span className="text-[10px] text-[#9E6577] uppercase font-bold block mb-1">
                        Upcoming Slots:
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {stylist.availableSlots.slice(0, 3).map((slot: string, idx: number) => (
                          <span
                            key={idx}
                            className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-[#FFF5F8] border border-[#F8D2DC] text-[#6E2A40] font-medium"
                          >
                            {slot}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Direct Booking CTA */}
                <div className="p-5 pt-0">
                  <button
                    onClick={() => onBookWithStylist(stylist.id)}
                    className="w-full py-2.5 px-3 text-xs font-semibold text-[#6E2A40] bg-[#FFF5F7] border border-[#F8D2DC] rounded-xl hover:border-[#E07A93] hover:bg-[#FFEBF1] transition-colors flex items-center justify-center gap-1.5 shadow-xs cursor-pointer"
                  >
                    <Calendar className="w-3.5 h-3.5 text-[#C74B72]" />
                    <span>Schedule with {stylist.name.split(' ')[0]}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
