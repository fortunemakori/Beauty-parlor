import React from 'react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { BRAND_ASSETS } from '../data/mockData';
import { Sparkles, Calendar, MessageCircle, Phone, MapPin, CheckCircle2, Heart, ArrowDown, Instagram } from 'lucide-react';

interface HeroProps {
  language: Language;
  onOpenBooking: () => void;
  onOpenShadeFinder: () => void;
}

export const Hero: React.FC<HeroProps> = ({ language, onOpenBooking, onOpenShadeFinder }) => {
  const t = translations[language];

  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:pt-12 lg:pb-20 border-b border-[#FCE6EC] bg-gradient-to-b from-[#FFF0F5] via-[#FFF8FA] to-[#FFEBF2]">
      {/* Background ambient rose-gold & pink sparkles */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#F8BDCE]/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-[#FCE1E8]/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main 2-Column Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Editorial & Value Proposition */}
          <div className="lg:col-span-7 space-y-6">
            {/* Location & Feminine Trust Tag */}
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#C74B72] tracking-wider uppercase bg-white/95 border border-[#FAD0DC] px-4 py-2 rounded-full shadow-[0_4px_15px_rgba(244,114,152,0.1)]">
              <Heart className="w-3.5 h-3.5 fill-[#E07A93] text-[#E07A93]" />
              <span>Ongata Rongai · Maasai Lodge</span>
              <span className="text-[#E8B8C6]">·</span>
              <span className="text-[#8C5366]">Magadi Road</span>
            </div>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-[#6B4653] max-w-xl leading-relaxed">
              {t.heroSubtitle}
            </p>

            {/* Trust Highlights Checklist with Rose Gold Accents */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-[#52303D] pt-1">
              <div className="flex items-center gap-2 bg-white/90 p-2.5 rounded-2xl border border-[#F8DCE2] shadow-xs">
                <CheckCircle2 className="w-4 h-4 text-[#C74B72] shrink-0" />
                <span>Instant M-Pesa Till 542109 STK Confirmation</span>
              </div>
              <div className="flex items-center gap-2 bg-white/90 p-2.5 rounded-2xl border border-[#F8DCE2] shadow-xs">
                <CheckCircle2 className="w-4 h-4 text-[#C74B72] shrink-0" />
                <span>Painless, Tension-Free Hairline Braiding</span>
              </div>
              <div className="flex items-center gap-2 bg-white/90 p-2.5 rounded-2xl border border-[#F8DCE2] shadow-xs">
                <CheckCircle2 className="w-4 h-4 text-[#C74B72] shrink-0" />
                <span>Custom Sculpted Stiletto Nails with Hand Art</span>
              </div>
              <div className="flex items-center gap-2 bg-white/90 p-2.5 rounded-2xl border border-[#F8DCE2] shadow-xs">
                <CheckCircle2 className="w-4 h-4 text-[#C74B72] shrink-0" />
                <span>Automated SMS & WhatsApp Appointment Reminders</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3.5 pt-3">
              <button
                onClick={onOpenBooking}
                className="px-6 py-3.5 text-sm font-semibold text-white rose-gold-gradient-bg rounded-2xl hover:brightness-105 shadow-lg shadow-[#E07A93]/30 transition-all active:scale-95 flex items-center gap-2.5 cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                <span>{t.bookAppointment}</span>
              </button>

              <a
                href="#quick-services"
                className="px-5 py-3.5 text-sm font-semibold text-[#6E2A40] bg-white border border-[#F5C7D4] rounded-2xl hover:border-[#E07A93] hover:bg-[#FFF5F7] shadow-xs transition-all flex items-center gap-2"
              >
                <span>Browse Salon Menu</span>
                <ArrowDown className="w-4 h-4 text-[#C74B72]" />
              </a>

              <a
                href="#tiktok-hub"
                className="px-4 py-3.5 text-sm font-bold text-white bg-black hover:bg-[#FE2C55] rounded-2xl transition-all flex items-center gap-2 shadow-xs"
              >
                <span className="text-[#25F4EE]">♪</span>
                <span>TikTok Looks</span>
              </a>

              <a
                href={BRAND_ASSETS.instagramUrl}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-3.5 text-sm font-bold text-white bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F77737] hover:opacity-90 rounded-2xl transition-all flex items-center gap-2 shadow-xs"
              >
                <Instagram className="w-4 h-4 text-white" />
                <span>Instagram</span>
              </a>

              <a
                href={`https://wa.me/254710690669?text=${encodeURIComponent('Hello Agatha Glamour, I would like to book a salon appointment at your Ongata Rongai, Maasai Lodge parlour.')}`}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-3.5 text-sm font-medium text-[#1E7E34] bg-[#E8F8EC] border border-[#BDE8C8] rounded-2xl hover:bg-[#D5F2DC] transition-all flex items-center gap-2 shadow-xs"
              >
                <MessageCircle className="w-4 h-4 text-[#25D366]" />
                <span>WhatsApp</span>
              </a>
            </div>

            {/* Direct contact info strip */}
            <div className="pt-2 flex flex-wrap items-center gap-3 text-xs text-[#825464]">
              <span className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-[#C74B72]" />
                <span>Call Parlour: <strong className="text-[#4A1D2B] font-mono">{BRAND_ASSETS.phone}</strong></span>
              </span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-[#C74B72]" />
                <span>Maasai Lodge Stage, Magadi Rd</span>
              </span>
              <span>·</span>
              <span>Mon - Sat: 8AM - 8PM</span>
            </div>
          </div>

          {/* Right Column: Visual Anchor & Luxury Portrait */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Outer pearlescent card with rose gold border */}
              <div className="relative rounded-3xl overflow-hidden border-2 border-[#FAD6DF] bg-white shadow-[0_20px_50px_-10px_rgba(224,122,147,0.22)] p-3">
                <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-[#FCECEF]">
                  <img
                    src={BRAND_ASSETS.heroModel}
                    alt="Agatha Glamour Signature Beauty"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2B0E17]/85 via-transparent to-transparent" />

                  {/* Floating Overlay Badge on Model */}
                  <div className="absolute bottom-4 left-4 right-4 p-4 bg-white/95 backdrop-blur-md rounded-2xl border border-[#FCE1E8] text-[#2E141D] space-y-1 shadow-lg">
                    <div className="flex items-center justify-between">
                      <span className="text-xs uppercase tracking-wider text-[#C74B72] font-bold">
                        Signature Soft Glam & Nails
                      </span>
                      <span className="text-xs font-mono font-bold text-[#D4AF37]">From KES 2,000</span>
                    </div>
                    <p className="text-xs text-[#6B4653]">
                      Crafted with high-pigment palettes, Russian prep, and custom embellishments at Maasai Lodge.
                    </p>
                  </div>
                </div>
              </div>

              {/* Floating Customer Service Week Ribbon Badge */}
              <div className="absolute -top-3 -left-3 bg-white border border-[#FAD0DC] rounded-2xl px-3.5 py-2 shadow-lg flex items-center gap-2.5">
                <img
                  src={BRAND_ASSETS.logo}
                  alt="AG Logo"
                  className="w-8 h-8 rounded-full bg-[#FFF0F4] p-0.5 object-contain border border-[#F5C7D4]"
                />
                <div className="flex flex-col">
                  <span className="text-[11px] font-bold text-[#6E2A40] leading-tight">Agatha Glamour</span>
                  <span className="text-[10px] text-[#A66276]">Beauty Parlour • Ongata Rongai</span>
                </div>
              </div>

              {/* Floating M-Pesa Badge */}
              <div className="absolute -bottom-3 -right-3 bg-white border border-[#BDE8C8] rounded-2xl px-3.5 py-2 shadow-lg flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-[#25D366] animate-pulse" />
                <div className="flex flex-col text-left">
                  <span className="text-[11px] font-bold text-[#1E7E34] leading-tight">Lipa na M-Pesa</span>
                  <span className="text-[10px] text-[#2F6B3E] font-mono">Till: {BRAND_ASSETS.tillNumber}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4-Column KPI Trust Strip below Hero Split */}
        <div className="mt-14 pt-10 border-t border-[#F8DCE2] grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="p-5 rounded-2xl bg-white border border-[#F8DCE2] shadow-[0_4px_20px_-2px_rgba(224,122,147,0.08)]">
            <div className="font-serif text-2xl sm:text-3xl font-bold text-[#6E2A40] tabular-nums">4,500+</div>
            <div className="text-xs text-[#825464] mt-1 font-medium">Happy Rongai Clients</div>
          </div>
          <div className="p-5 rounded-2xl bg-white border border-[#F8DCE2] shadow-[0_4px_20px_-2px_rgba(224,122,147,0.08)]">
            <div className="font-serif text-2xl sm:text-3xl font-bold text-[#C74B72] tabular-nums">15+</div>
            <div className="text-xs text-[#825464] mt-1 font-medium">Master Hair & Nail Artists</div>
          </div>
          <div className="p-5 rounded-2xl bg-white border border-[#F8DCE2] shadow-[0_4px_20px_-2px_rgba(224,122,147,0.08)]">
            <div className="font-serif text-2xl sm:text-3xl font-bold text-[#D4AF37] tabular-nums">48.5K</div>
            <div className="text-xs text-[#825464] mt-1 font-medium">TikTok Beauty Community</div>
          </div>
          <div className="p-5 rounded-2xl bg-white border border-[#F8DCE2] shadow-[0_4px_20px_-2px_rgba(224,122,147,0.08)]">
            <div className="font-serif text-2xl sm:text-3xl font-bold text-[#C74B72] tabular-nums">4.98 ★</div>
            <div className="text-xs text-[#825464] mt-1 font-medium">Verified Rongai Rating</div>
          </div>
        </div>
      </div>
    </section>
  );
};
