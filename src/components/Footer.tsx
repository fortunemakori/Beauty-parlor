import React from 'react';
import { BRAND_ASSETS } from '../data/mockData';
import { Phone, Instagram, MapPin, Heart, Sparkles, ExternalLink } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-b from-[#FFF5F8] to-[#FFF0F4] border-t border-[#FCE1E8] text-xs text-[#7A4D5C]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Brand Col */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full p-0.5 bg-gradient-to-tr from-[#E07A93] via-[#F5BDCD] to-[#D4AF37] shadow-sm">
                <img
                  src={BRAND_ASSETS.logo}
                  alt="Agatha Glamour Logo"
                  className="w-full h-full object-contain rounded-full bg-white p-0.5"
                />
              </div>
              <div>
                <span className="font-serif text-lg font-bold text-[#2E141D] block">Agatha Glamour</span>
                <span className="text-[10px] text-[#C74B72] font-semibold">Owned by Agatha, Lead Artist</span>
              </div>
            </div>
            <p className="text-[11px] text-[#8C5A69] leading-relaxed">
              Ongata Rongai’s boutique feminine beauty parlour. Specializing in signature Bohemian braids with wooden beads, custom sculpted stiletto nail art, and melanin bridal glam along Magadi Road, Maasai Lodge.
            </p>
          </div>

          {/* Quick links */}
          <div className="space-y-2">
            <span className="font-semibold text-xs text-[#2E141D] uppercase tracking-wider block">
              Parlour Services
            </span>
            <ul className="space-y-2 text-xs text-[#7A4D5C]">
              <li><a href="#quick-services" className="hover:text-[#C74B72] transition-colors">Hair & Bohemian Braids</a></li>
              <li><a href="#quick-services" className="hover:text-[#C74B72] transition-colors">Sculpted Stiletto Nails</a></li>
              <li><a href="#quick-services" className="hover:text-[#C74B72] transition-colors">Melanin Bridal Glam</a></li>
              <li><a href="#transformations" className="hover:text-[#C74B72] transition-colors">Before & After Slider</a></li>
              <li><a href="#shade-finder" className="hover:text-[#C74B72] transition-colors">Virtual Shade Matcher</a></li>
            </ul>
          </div>

          {/* Social & TikTok */}
          <div className="space-y-2">
            <span className="font-semibold text-xs text-[#2E141D] uppercase tracking-wider block">
              Viral Looks & Social
            </span>
            <ul className="space-y-2 text-xs text-[#7A4D5C]">
              <li>
                <a
                  href={BRAND_ASSETS.tiktokUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 hover:text-[#C74B72] transition-colors text-[#2E141D] font-medium"
                >
                  <span className="w-5 h-5 rounded-full bg-black text-white flex items-center justify-center text-[10px] font-bold">♪</span>
                  <span>TikTok: @agathaglamour (48K)</span>
                </a>
              </li>
              <li>
                <a
                  href={BRAND_ASSETS.instagramUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 hover:text-[#C74B72] transition-colors text-[#2E141D] font-medium"
                >
                  <Instagram className="w-4 h-4 text-[#C74B72]" />
                  <span>Instagram: @agatha_glamour</span>
                </a>
              </li>
              <li><a href="#events" className="hover:text-[#C74B72] transition-colors">Community Beauty Mixers</a></li>
              <li><a href="#stylists" className="hover:text-[#C74B72] transition-colors">Meet Stylists</a></li>
            </ul>
          </div>

          {/* Contact Col */}
          <div className="space-y-2">
            <span className="font-semibold text-xs text-[#2E141D] uppercase tracking-wider block">
              Maasai Lodge Parlour
            </span>
            <ul className="space-y-2 text-xs text-[#7A4D5C]">
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#C74B72]" />
                <span className="font-mono text-[#2E141D] font-bold">{BRAND_ASSETS.phone}</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#C74B72] shrink-0 mt-0.5" />
                <span>Maasai Lodge Stage, Magadi Road, Ongata Rongai, Kenya</span>
              </li>
              <li className="text-[11px] text-[#15803D] font-semibold bg-[#F0FAF3] p-2 rounded-xl border border-[#A3E0BA]">
                Lipa na M-Pesa Buy Goods Till: <strong>{BRAND_ASSETS.tillNumber}</strong>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-[#FCE1E8] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#9E6577]">
          <div>
            © {new Date().getFullYear()} Agatha Glamour. All rights reserved. Ongata Rongai, Maasai Lodge, Kenya.
          </div>
          <div className="flex items-center gap-1.5">
            <span>Crafted with love for Agatha & Rongai beauty lovers</span>
            <Heart className="w-3.5 h-3.5 text-[#E07A93] fill-[#E07A93]" />
          </div>
        </div>
      </div>
    </footer>
  );
};
