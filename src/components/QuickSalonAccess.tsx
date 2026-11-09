import React, { useState } from 'react';
import { Language, ServiceCategory, Service } from '../types';
import { translations } from '../data/translations';
import { SERVICES_DATA, BRIDAL_PACKAGE_DETAILS } from '../data/mockData';
import { Sparkles, Clock, Check, Heart, ArrowRight, Crown, ShieldCheck } from 'lucide-react';

interface QuickSalonAccessProps {
  language: Language;
  onBookService: (serviceId: string) => void;
}

export const QuickSalonAccess: React.FC<QuickSalonAccessProps> = ({
  language,
  onBookService,
}) => {
  const t = translations[language];

  // The 6 main signature cards: Makeup, Hair, Nails, Skincare, Lashes & Brows, Training
  const mainSixServices = SERVICES_DATA.filter(
    (s: Service) => s.category !== 'bridal_package' && s.category !== 'kids'
  );

  const bridalService = SERVICES_DATA.find(
    (s: Service) => s.category === 'bridal_package'
  ) || SERVICES_DATA[SERVICES_DATA.length - 1];

  return (
    <section id="services" className="py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20">
      <div id="quick-services" />

      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#FAD6DF] text-xs font-bold text-[#C74B72] shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-[#C74B72]" />
          <span>Ongata Rongai • Maasai Lodge</span>
          <span className="text-[#E07A93]">·</span>
          <span>Transparent Pricing</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#2E141D]">
          {language === 'sw' ? 'Huduma Zetu za Saluni' : 'Parlour Services Menu'}
        </h2>
        <p className="text-xs sm:text-sm text-[#7A5866]">
          {language === 'sw'
            ? 'Huduma 6 kuu za saluni zikiwa na bei wazi na nafasi ya kuweka miadi kwa kubofya mara moja.'
            : 'Explore our 6 signature salon services with transparent KES pricing and instant M-Pesa appointment booking.'}
        </p>
      </div>

      {/* Services Grid (6 Cards: Makeup, Hair, Nails, Skincare, Lashes & Brows, Training) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-14">
        {mainSixServices.map((service: Service) => {
          const categoryLabels: Record<string, { label: string; icon: string }> = {
            makeup: { label: 'Makeup', icon: '💄' },
            hair: { label: 'Hair', icon: '💇‍♀️' },
            nails: { label: 'Nails', icon: '💅' },
            skincare: { label: 'Skincare', icon: '🧖‍♀️' },
            lashes_brows: { label: 'Lashes & Brows', icon: '👁️' },
            training: { label: 'Training', icon: '🎓' },
          };

          const catInfo = categoryLabels[service.category] || { label: service.category, icon: '✨' };

          return (
            <div
              key={service.id}
              className="group bg-white rounded-3xl border border-[#FAD6DF] overflow-hidden shadow-[0_10px_30px_rgba(244,114,152,0.08)] hover:shadow-[0_20px_45px_rgba(224,122,147,0.18)] hover:border-[#E07A93] transition-all flex flex-col justify-between"
            >
              <div>
                {/* Image & Price Header */}
                <div className="relative h-52 overflow-hidden bg-[#FFF0F4]">
                  <img
                    src={service.image}
                    alt={service.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

                  {/* Top Category Badge */}
                  <div className="absolute top-3.5 left-3.5 flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-white/95 text-[#2E141D] backdrop-blur-md shadow-sm">
                    <span>{catInfo.icon}</span>
                    <span>{catInfo.label}</span>
                  </div>

                  {/* Price Tag Overlay */}
                  <div className="absolute bottom-3.5 left-3.5 right-3.5 flex items-baseline justify-between text-white">
                    <div>
                      <span className="text-[10px] text-white/80 block uppercase tracking-wider">
                        {service.id === 'srv-makeup' ? 'Personal / Pro Price:' : 'Parlour Price:'}
                      </span>
                      <span className="font-serif text-2xl font-bold font-mono tracking-tight text-white drop-shadow">
                        KES {service.priceKES.toLocaleString()}
                        {service.id === 'srv-makeup' && <span className="text-xs font-sans font-normal text-[#FCE1E8] ml-1">/ 20,000</span>}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] text-white/80 block">Duration:</span>
                      <span className="text-xs font-mono font-medium flex items-center gap-1 text-[#FCE1E8]">
                        <Clock className="w-3.5 h-3.5" />
                        {service.durationMinutes} mins
                      </span>
                    </div>
                  </div>
                </div>

                {/* Details Body */}
                <div className="p-5 space-y-3">
                  <h3 className="font-serif text-lg font-bold text-[#2E141D] group-hover:text-[#C74B72] transition-colors line-clamp-1">
                    {language === 'sw' ? service.nameSw : service.name}
                  </h3>
                  <p className="text-xs text-[#7A5866] leading-relaxed line-clamp-2">
                    {language === 'sw' ? service.descriptionSw : service.description}
                  </p>

                  {/* Key Highlights */}
                  <div className="pt-2 border-t border-[#FCE1E8] space-y-1.5">
                    <span className="text-[10px] font-bold text-[#C74B72] uppercase tracking-wider block">
                      {language === 'sw' ? 'Inajumuisha:' : 'Service Highlights:'}
                    </span>
                    <div className="space-y-1 text-[11px] text-[#52303D]">
                      {(language === 'sw' ? service.includesSw : service.includes).slice(0, 2).map((item: string, idx: number) => (
                        <div key={idx} className="flex items-center gap-1.5 truncate">
                          <Check className="w-3.5 h-3.5 text-[#15803D] shrink-0" />
                          <span className="truncate">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Deposit Strip & Book Button */}
              <div className="p-5 pt-0">
                <div className="flex items-center justify-between text-[11px] text-[#8A6372] mb-2.5 font-mono pt-3 border-t border-[#FCE1E8]">
                  <span className="flex items-center gap-1.5 text-[#5E3A48] font-sans font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#15803D]" />
                    <span>Deposit:</span>
                    <span className="text-[10px] text-[#15803D] font-bold bg-[#E8F8EE] px-1.5 py-0.2 rounded-sm">Optional</span>
                  </span>
                  <span className="font-bold text-[#15803D]">KES 0 / {service.depositKES.toLocaleString()}</span>
                </div>

                <button
                  onClick={() => onBookService(service.id)}
                  className="w-full py-3 px-4 rounded-2xl text-xs font-bold text-white rose-gold-gradient-bg hover:brightness-105 active:scale-98 shadow-md shadow-[#C74B72]/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Book {catInfo.label} Appointment</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Kids Corner Teaser Banner */}
      <div className="mb-12 bg-gradient-to-r from-[#FFF0F5] via-[#FFF7F9] to-[#FFEBF1] rounded-3xl p-5 sm:p-6 border border-[#FAD6DF] flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-white border border-[#FAD6DF] flex items-center justify-center text-2xl shadow-xs shrink-0">
            🧸
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-serif text-lg font-bold text-[#2E141D]">
                {language === 'sw' ? 'Sehemu ya Watoto ya Agatha Glamour' : 'Agatha Glamour Kids Corner'}
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider bg-[#FFF0F4] text-[#C74B72] border border-[#FAD6DF] px-2 py-0.5 rounded-full">
                {language === 'sw' ? 'Bila Maumivu' : 'Zero Pain & Fun'}
              </span>
            </div>
            <p className="text-xs text-[#7A4D5C] mt-0.5">
              {language === 'sw'
                ? 'Ususi usio na maumivu, shanga za kupendeza, shampoo isiyowasha machoni, na mini manicure kwa watoto.'
                : 'Painless gentle braiding with colorful beads, tear-free organic wash & blowout, mini mani-pedi & cartoon treats.'}
            </p>
          </div>
        </div>
        <a
          href="#kids-corner"
          className="shrink-0 px-5 py-2.5 rounded-2xl text-xs font-bold text-white rose-gold-gradient-bg hover:brightness-105 shadow-sm transition-all whitespace-nowrap"
        >
          {language === 'sw' ? 'Tazama Sehemu ya Watoto →' : 'Explore Kids Corner →'}
        </a>
      </div>

      {/* Special Luxury Feature: Bridal Package (Makeup + Hair + Nails + Lashes) */}
      <div className="bg-gradient-to-r from-[#FFF5F8] via-white to-[#FDEFF3] rounded-3xl p-6 sm:p-10 border-2 border-[#E07A93] shadow-[0_20px_50px_rgba(224,122,147,0.2)] relative overflow-hidden">
        {/* Subtle background shimmer */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#FAD6DF]/40 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left: Package Info & Price */}
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFF0F4] border border-[#FAD6DF] text-xs font-bold text-[#C74B72]">
              <Crown className="w-4 h-4 text-[#C74B72]" />
              <span>All-In-One Bridal Sanctuary Package</span>
            </div>

            <h3 className="font-serif text-3xl sm:text-4xl font-bold text-[#2E141D] leading-tight">
              {BRIDAL_PACKAGE_DETAILS.title}
            </h3>

            <p className="text-sm font-semibold text-[#C74B72]">
              {BRIDAL_PACKAGE_DETAILS.tagline}
            </p>

            <p className="text-xs sm:text-sm text-[#7A5866] leading-relaxed">
              Step into your special day with complete serenity. Our complete bridal suite covers everything under one roof at our Ongata Rongai, Maasai Lodge parlour.
            </p>

            {/* What it entails: Makeup + Hair + Nails + Lashes Breakdown */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {BRIDAL_PACKAGE_DETAILS.features.map((feat, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-2xl bg-white border border-[#FAD6DF] shadow-xs space-y-1"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-base">{feat.icon}</span>
                    <span className="font-serif text-xs font-bold text-[#2E141D]">{feat.title}</span>
                  </div>
                  <p className="text-[11px] text-[#7A5866] leading-tight pl-6">
                    {feat.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Bonus Perks */}
            <div className="pt-2">
              <span className="text-[11px] font-bold text-[#C74B72] uppercase tracking-wider block mb-1.5">
                Complimentary VIP Inclusions:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-[11px] text-[#52303D]">
                {BRIDAL_PACKAGE_DETAILS.bonusPerks.map((perk, i) => (
                  <div key={i} className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-[#15803D] shrink-0" />
                    <span>{perk}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Pricing Card & Direct Booking CTA */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#FAD6DF] shadow-lg text-center space-y-4">
              <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#FFF0F4] text-xs font-bold text-[#C74B72]">
                <Heart className="w-3 h-3 fill-[#C74B72]" />
                <span>Special Bridal Value</span>
              </div>

              <div>
                <span className="text-xs text-[#8A6372] uppercase tracking-wider block">Full Package Price</span>
                <div className="font-serif text-4xl sm:text-5xl font-bold text-[#2E141D] font-mono tracking-tight mt-1">
                  KES {BRIDAL_PACKAGE_DETAILS.priceKES.toLocaleString()}
                </div>
                <span className="text-xs text-[#15803D] font-semibold block mt-1">
                  M-Pesa Deposit to Lock Date: KES {BRIDAL_PACKAGE_DETAILS.depositKES.toLocaleString()}
                </span>
                <span className="text-[11px] text-[#8A6372] block mt-0.5">
                  Balance KES {(BRIDAL_PACKAGE_DETAILS.priceKES - BRIDAL_PACKAGE_DETAILS.depositKES).toLocaleString()} payable at salon on wedding week
                </span>
              </div>

              <div className="p-3 bg-[#FFF9FA] rounded-2xl border border-[#FAD6DF] text-xs text-[#7A5866] text-left space-y-1">
                <div className="font-semibold text-[#2E141D] flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#15803D]" />
                  <span>Maasai Lodge Bridal Guarantee</span>
                </div>
                <p className="text-[11px]">
                  Includes personalized 1-on-1 coordination with Agatha & priority preparation chair.
                </p>
              </div>

              <button
                onClick={() => onBookService(BRIDAL_PACKAGE_DETAILS.serviceId)}
                className="w-full py-4 px-6 rounded-2xl text-sm font-bold text-white rose-gold-gradient-bg hover:brightness-105 active:scale-98 shadow-lg shadow-[#C74B72]/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Crown className="w-4 h-4" />
                <span>Book Bridal Package (KES 12,000)</span>
              </button>

              <p className="text-[11px] text-[#8A6372]">
                Custom bridesmaid group packages also available upon inquiry
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
