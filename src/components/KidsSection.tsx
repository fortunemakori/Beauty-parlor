import React from 'react';
import { Language } from '../types';
import { KIDS_PERKS_DATA, SERVICES_DATA } from '../data/mockData';
import { Sparkles, Heart, Clock, Check, ArrowRight, ShieldCheck, Smile } from 'lucide-react';

interface KidsSectionProps {
  language: Language;
  onBookService: (serviceId: string) => void;
}

export const KidsSection: React.FC<KidsSectionProps> = ({ language, onBookService }) => {
  const kidsServices = SERVICES_DATA.filter((s) => s.category === 'kids');

  return (
    <section id="kids-section" className="py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20">
      {/* Decorative Outer Container */}
      <div className="bg-gradient-to-br from-[#FFF5F8] via-[#FFF9FB] to-[#FDF0F4] rounded-3xl p-6 sm:p-10 border-2 border-[#FAD6DF] shadow-[0_15px_45px_rgba(244,114,152,0.12)] relative overflow-hidden">
        {/* Playful background ambient glow */}
        <div className="absolute top-0 right-1/4 w-72 h-72 bg-[#FDE2EC]/50 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-72 h-72 bg-[#FCE8F0]/60 rounded-full blur-3xl pointer-events-none" />

        {/* Section Header */}
        <div className="relative z-10 text-center max-w-2xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#FAD6DF] text-xs font-bold text-[#C74B72] shadow-xs">
            <span className="text-sm">🧸</span>
            <span>Little Queens & Kids Corner</span>
            <span className="text-[#E07A93]">·</span>
            <span className="text-[#8C5A69]">Painless & Gentle Styling</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#2E141D] leading-tight">
            {language === 'sw'
              ? 'Huduma Maalum za Watoto (Bila Maumivu)'
              : 'Kids & Little Queens Glamour Lounge'}
          </h2>

          <p className="text-xs sm:text-sm text-[#7A5866] leading-relaxed">
            {language === 'sw'
              ? 'Huduma maalum kwa watoto wetu wa kike na wa kiume: ususi laini usioumiza kichwa, katuni za kuburudisha, vinywaji vitamu, na shanga za rangi za kuvutia.'
              : 'Painless, tear-free hair care and playful pampering for ages 1 to 14. We combine patient stylists, colorful beads, organic gentle products, and cartoon entertainment so every visit is pure joy.'}
          </p>

          <div className="inline-block px-3 py-1 bg-white/90 border border-[#A3E0BA] text-[#15803D] rounded-full text-xs font-semibold">
            ✨ Deposit is completely optional upon booking — pay on arrival at parlour!
          </div>
        </div>

        {/* 4 Kid-Friendly Guarantees */}
        <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {KIDS_PERKS_DATA.map((perk, idx) => (
            <div
              key={idx}
              className="bg-white/90 backdrop-blur-xs rounded-2xl p-4.5 border border-[#FCE1E8] shadow-xs hover:border-[#E07A93] hover:shadow-sm transition-all space-y-2"
            >
              <div className="w-10 h-10 rounded-xl bg-[#FFF0F4] border border-[#FAD6DF] flex items-center justify-center text-xl shadow-xs">
                {perk.icon}
              </div>
              <h4 className="font-serif text-sm font-bold text-[#2E141D]">
                {language === 'sw' ? perk.titleSw : perk.title}
              </h4>
              <p className="text-[11px] text-[#7A5866] leading-relaxed">
                {language === 'sw' ? perk.descSw : perk.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Kids Services Cards Grid */}
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          {kidsServices.map((service) => (
            <div
              key={service.id}
              className="group bg-white rounded-3xl border border-[#FAD6DF] overflow-hidden shadow-sm hover:shadow-md hover:border-[#E07A93] transition-all flex flex-col justify-between"
            >
              <div>
                {/* Header Image */}
                <div className="relative h-48 overflow-hidden bg-[#FFF0F4]">
                  <img
                    src={service.image}
                    alt={service.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                  <div className="absolute top-3 left-3 flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-white/95 text-[#2E141D] backdrop-blur-md shadow-xs">
                    <span>👑</span>
                    <span>Kids Special</span>
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 flex items-baseline justify-between text-white">
                    <div>
                      <span className="text-[10px] text-white/80 block uppercase tracking-wider">Parlour Price:</span>
                      <span className="font-serif text-2xl font-bold font-mono tracking-tight text-white drop-shadow">
                        KES {service.priceKES.toLocaleString()}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] text-white/80 block">Time:</span>
                      <span className="text-xs font-mono font-medium flex items-center gap-1 text-[#FCE1E8]">
                        <Clock className="w-3.5 h-3.5" />
                        {service.durationMinutes} mins
                      </span>
                    </div>
                  </div>
                </div>

                {/* Details */}
                <div className="p-5 space-y-3">
                  <h3 className="font-serif text-base font-bold text-[#2E141D] group-hover:text-[#C74B72] transition-colors">
                    {language === 'sw' ? service.nameSw : service.name}
                  </h3>
                  <p className="text-xs text-[#7A5866] leading-relaxed line-clamp-2">
                    {language === 'sw' ? service.descriptionSw : service.description}
                  </p>

                  <div className="pt-2 border-t border-[#FCE1E8] space-y-1.5">
                    <span className="text-[10px] font-bold text-[#C74B72] uppercase tracking-wider block">
                      {language === 'sw' ? 'Inajumuisha:' : "What's Included:"}
                    </span>
                    <div className="space-y-1 text-[11px] text-[#52303D]">
                      {(language === 'sw' ? service.includesSw : service.includes).slice(0, 3).map((item, i) => (
                        <div key={i} className="flex items-center gap-1.5 truncate">
                          <Check className="w-3.5 h-3.5 text-[#15803D] shrink-0" />
                          <span className="truncate">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-5 pt-0">
                <div className="flex items-center justify-between text-[11px] text-[#8A6372] mb-2.5 font-mono pt-3 border-t border-[#FCE1E8]">
                  <span>Deposit:</span>
                  <span className="font-bold text-[#15803D]">Optional (Pay on Arrival)</span>
                </div>

                <button
                  onClick={() => onBookService(service.id)}
                  className="w-full py-3 px-4 rounded-2xl text-xs font-bold text-white rose-gold-gradient-bg hover:brightness-105 active:scale-98 shadow-md shadow-[#C74B72]/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Smile className="w-3.5 h-3.5" />
                  <span>Book for Kids (Optional Deposit)</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
