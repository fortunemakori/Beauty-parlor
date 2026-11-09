import React, { useState } from 'react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { BRAND_ASSETS } from '../data/mockData';
import { Phone, Clock, Sparkles, Menu, X, Heart, MapPin, Instagram } from 'lucide-react';

interface NavbarProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  onOpenBooking: () => void;
  onOpenDashboard: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  language,
  onLanguageChange,
  onOpenBooking,
  onOpenDashboard,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = translations[language];

  return (
    <>
      {/* Top Feminine Notification Strip */}
      <div className="bg-[#FFF0F4] border-b border-[#FCE1E8] text-xs text-[#823F54] px-4 py-2">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 truncate">
            <Heart className="w-3.5 h-3.5 fill-[#E07A93] text-[#E07A93] shrink-0" />
            <span className="font-semibold text-[#6E2A40]">{t.customerServiceWeek}</span>
            <span className="text-[#D9AAB8] hidden sm:inline">·</span>
            <div className="hidden sm:inline-flex items-center gap-1 text-[#8C5366]">
              <MapPin className="w-3 h-3 text-[#C74B72]" />
              <span className="font-semibold text-[#C74B72]">{t.locationRongai}</span>
              <span>(Magadi Rd)</span>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0 text-xs">
            <a
              href={`tel:${BRAND_ASSETS.phone}`}
              className="flex items-center gap-1.5 text-[#6E2A40] hover:text-[#C74B72] transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#C74B72]" />
              <span className="tabular-nums font-semibold">{BRAND_ASSETS.phone}</span>
            </a>
            <span className="text-[#E8B8C6]">|</span>
            <a
              href="#tiktok-hub"
              className="hidden sm:flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-black text-white text-[11px] font-bold hover:bg-[#FE2C55] transition-colors shadow-xs"
            >
              <span className="text-[#25F4EE]">♪</span>
              <span>TikTok</span>
            </a>
            <a
              href={BRAND_ASSETS.instagramUrl}
              target="_blank"
              rel="noreferrer"
              className="hidden sm:flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F77737] text-white text-[11px] font-bold hover:opacity-90 transition-opacity shadow-xs"
            >
              <Instagram className="w-3 h-3 text-white" />
              <span>Instagram</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Feminine Navigation Bar */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#FCE6EC] shadow-[0_2px_15px_-3px_rgba(235,160,180,0.12)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-6">
          {/* Brand Wordmark with circular emblem */}
          <a href="#" className="flex items-center gap-3 shrink-0 group">
            <div className="relative w-11 h-11 rounded-full p-0.5 bg-gradient-to-tr from-[#E07A93] via-[#F5BDCD] to-[#D4AF37] shadow-sm group-hover:scale-105 transition-transform">
              <img
                src={BRAND_ASSETS.logo}
                alt="Agatha Glamour Crest"
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain rounded-full bg-white p-0.5"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-[#2E141D] group-hover:text-[#C74B72] transition-colors whitespace-nowrap">
                Agatha Glamour
              </span>
              <span className="text-[10px] tracking-wider uppercase text-[#9E6B7A] font-semibold">
                Ongata Rongai • Maasai Lodge
              </span>
            </div>
          </a>

          {/* Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-[#684652]">
            <a
              href="#quick-services"
              className="hover:text-[#C74B72] hover:underline underline-offset-8 transition-colors whitespace-nowrap"
            >
              {t.navServices}
            </a>
            <a
              href="#tiktok-hub"
              className="hover:text-[#C74B72] hover:underline underline-offset-8 transition-colors whitespace-nowrap flex items-center gap-1.5"
            >
              <span className="text-[#FE2C55] font-bold">TikTok</span>
              <span className="px-1.5 py-0.2 rounded-full text-[9px] font-bold bg-[#FE2C55]/10 text-[#FE2C55]">Viral</span>
            </a>
            <a
              href="#kids-corner"
              className="hover:text-[#C74B72] hover:underline underline-offset-8 transition-colors whitespace-nowrap flex items-center gap-1.5"
            >
              <span>Kids Corner</span>
              <span className="px-1.5 py-0.2 rounded-full text-[9px] font-bold bg-[#FFF0F4] text-[#C74B72] border border-[#FAD6DF]">New</span>
            </a>
            <a
              href="#stylists"
              className="hover:text-[#C74B72] hover:underline underline-offset-8 transition-colors whitespace-nowrap"
            >
              {t.navStylists}
            </a>
            <a
              href="#transformations"
              className="hover:text-[#C74B72] hover:underline underline-offset-8 transition-colors whitespace-nowrap"
            >
              Transformations
            </a>
            <a
              href="#shade-finder"
              className="hover:text-[#C74B72] hover:underline underline-offset-8 transition-colors whitespace-nowrap"
            >
              Shade Matcher
            </a>
            <a
              href="#reviews"
              className="hover:text-[#C74B72] hover:underline underline-offset-8 transition-colors whitespace-nowrap"
            >
              {t.navReviews}
            </a>
            <a
              href="#location"
              className="hover:text-[#C74B72] hover:underline underline-offset-8 transition-colors whitespace-nowrap"
            >
              Maasai Lodge
            </a>
          </nav>

          {/* Actions (Language toggle, Bookings, CTA) */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Language Switcher */}
            <div className="flex items-center bg-[#FFF2F5] border border-[#F8D2DC] rounded-xl p-1">
              <button
                onClick={() => onLanguageChange('en')}
                className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                  language === 'en'
                    ? 'bg-[#C74B72] text-white shadow-xs'
                    : 'text-[#824E5E] hover:text-[#C74B72]'
                }`}
                title="Switch to English"
              >
                EN
              </button>
              <button
                onClick={() => onLanguageChange('sw')}
                className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                  language === 'sw'
                    ? 'bg-[#C74B72] text-white shadow-xs'
                    : 'text-[#824E5E] hover:text-[#C74B72]'
                }`}
                title="Badilisha hadi Kiswahili"
              >
                SW
              </button>
            </div>

            {/* My Bookings & VIP Button */}
            <button
              onClick={onOpenDashboard}
              className="hidden sm:flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-[#6E2A40] bg-[#FFF5F7] border border-[#F8D2DC] rounded-xl hover:border-[#E07A93] hover:bg-[#FFEBF1] transition-all whitespace-nowrap shadow-xs cursor-pointer"
            >
              <Clock className="w-3.5 h-3.5 text-[#C74B72]" />
              <span>{t.navTracker}</span>
            </button>

            {/* Primary Book Appointment CTA */}
            <button
              onClick={onOpenBooking}
              className="flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold text-white rose-gold-gradient-bg rounded-xl hover:brightness-105 shadow-md shadow-[#E07A93]/25 transition-all whitespace-nowrap active:scale-95 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-white" />
              <span>{t.bookAppointment}</span>
            </button>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-[#684652] hover:text-[#C74B72] cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#FFF9FA] border-b border-[#F8D8E0] px-4 py-4 space-y-3">
            <a
              href="#quick-services"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-medium text-[#5C2B3A] hover:text-[#C74B72] py-1.5"
            >
              {t.navServices}
            </a>
            <a
              href="#tiktok-hub"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-bold text-[#FE2C55] py-1.5"
            >
              TikTok @agathaglamour
            </a>
            <a
              href="#kids-corner"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-semibold text-[#C74B72] hover:text-[#9E2B52] py-1.5 flex items-center justify-between"
            >
              <span>🧸 Kids Corner (Painless Hair & Nails)</span>
              <span className="text-[10px] bg-[#FFF0F4] border border-[#FAD6DF] text-[#C74B72] px-2 py-0.5 rounded-full font-bold">New</span>
            </a>
            <a
              href="#stylists"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-medium text-[#5C2B3A] hover:text-[#C74B72] py-1.5"
            >
              {t.navStylists}
            </a>
            <a
              href="#transformations"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-medium text-[#5C2B3A] hover:text-[#C74B72] py-1.5"
            >
              Transformations
            </a>
            <a
              href="#shade-finder"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-medium text-[#5C2B3A] hover:text-[#C74B72] py-1.5"
            >
              Shade Matcher
            </a>
            <a
              href="#reviews"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-medium text-[#5C2B3A] hover:text-[#C74B72] py-1.5"
            >
              {t.navReviews}
            </a>
            <a
              href="#location"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-medium text-[#5C2B3A] hover:text-[#C74B72] py-1.5"
            >
              Location: Maasai Lodge
            </a>
            <div className="pt-3 border-t border-[#F8D8E0] flex items-center justify-between">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenDashboard();
                }}
                className="text-xs text-[#C74B72] flex items-center gap-1.5 font-semibold cursor-pointer"
              >
                <Clock className="w-3.5 h-3.5" />
                <span>{t.navTracker} & VIP</span>
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
