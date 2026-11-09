import React, { useState } from 'react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { BRAND_ASSETS } from '../data/mockData';
import { Sparkles, MoveHorizontal, Heart } from 'lucide-react';

interface BeforeAfterSliderProps {
  language: Language;
  onBookService: (serviceId?: string) => void;
}

export const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({ language, onBookService }) => {
  const [sliderPosition, setSliderPosition] = useState(52); // percentage 0-100
  const [activePreset, setActivePreset] = useState<'nails' | 'makeup' | 'hair'>('nails');
  const t = translations[language];

  // Presets
  const presets = {
    nails: {
      title: 'Natural Nails → Luxury Sculpted Stiletto Art',
      serviceId: 'srv-stiletto-art',
      serviceName: 'Sculpted Stilettos & Kiss Art',
      price: 'KES 2,600',
      stylist: 'Brenda K. (Senior Nail Architect)',
      beforeLabel: 'Natural Bare Nails',
      afterLabel: 'Agatha Sculpted Stilettos',
      beforeImg: BRAND_ASSETS.nailsFrench, // French clean baseline
      afterImg: BRAND_ASSETS.nailsStiletto, // Custom kiss art
      notes: 'Hand-painted red kisses, micro-hearts, apex build and 4-week chip-free retention.',
    },
    makeup: {
      title: 'Everyday Bare Complexion → Royalty Bridal Glam',
      serviceId: 'srv-bridal-glam',
      serviceName: 'Royalty Bridal Glam',
      price: 'KES 6,500',
      stylist: 'Stacy W. (Lead Bridal Artist)',
      beforeLabel: 'Natural Skin Prep',
      afterLabel: 'Agatha 16h Bridal Glow',
      beforeImg: BRAND_ASSETS.heroModel,
      afterImg: BRAND_ASSETS.bridalMakeup,
      notes: 'Custom melanin undertone matching, 24K gold serum infusion, and waterproof tear-proof lock.',
    },
    hair: {
      title: 'Tangled Natural Hair → Bohemian Goddess Braids',
      serviceId: 'srv-boho-braids',
      serviceName: 'Bohemian Braids & Beads',
      price: 'KES 3,500',
      stylist: 'Agatha (Main Top Artist)',
      beforeLabel: 'Natural Hair Baseline',
      afterLabel: 'Signature Boho Braids & Wooden Beads',
      beforeImg: BRAND_ASSETS.flyer,
      afterImg: BRAND_ASSETS.braidsBoho,
      notes: 'Gentle, zero-tension parting with curled tendrils and polished natural wooden beads at Maasai Lodge.',
    },
  };

  const current = presets[activePreset];

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSliderPosition(Number(e.target.value));
  };

  return (
    <section id="transformations" className="py-16 lg:py-24 bg-[#FFF9FA] border-b border-[#FCE1E8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#C74B72] tracking-widest uppercase bg-white px-3.5 py-1.5 rounded-full border border-[#F8D2DC] shadow-xs">
            <Heart className="w-3.5 h-3.5 fill-[#E07A93] text-[#E07A93]" />
            <span>Interactive Transformations</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#2E141D]">
            {t.beforeAfterTitle}
          </h2>
          <p className="text-sm text-[#7A4D5C]">
            {t.beforeAfterSub}
          </p>

          {/* Feminine Preset Switcher */}
          <div className="inline-flex items-center gap-1.5 p-1 bg-white border border-[#F8D2DC] rounded-2xl mt-4 shadow-xs">
            <button
              onClick={() => setActivePreset('nails')}
              className={`px-4 py-2 text-xs font-semibold rounded-xl transition-all ${
                activePreset === 'nails'
                  ? 'bg-gradient-to-r from-[#F08CA5] to-[#C74B72] text-white shadow-sm'
                  : 'text-[#7A4D5C] hover:text-[#C74B72]'
              }`}
            >
              Nails (Stiletto Art)
            </button>
            <button
              onClick={() => setActivePreset('makeup')}
              className={`px-4 py-2 text-xs font-semibold rounded-xl transition-all ${
                activePreset === 'makeup'
                  ? 'bg-gradient-to-r from-[#F08CA5] to-[#C74B72] text-white shadow-sm'
                  : 'text-[#7A4D5C] hover:text-[#C74B72]'
              }`}
            >
              Makeup (Bridal Glam)
            </button>
            <button
              onClick={() => setActivePreset('hair')}
              className={`px-4 py-2 text-xs font-semibold rounded-xl transition-all ${
                activePreset === 'hair'
                  ? 'bg-gradient-to-r from-[#F08CA5] to-[#C74B72] text-white shadow-sm'
                  : 'text-[#7A4D5C] hover:text-[#C74B72]'
              }`}
            >
              Hair (Boho Braids)
            </button>
          </div>
        </div>

        {/* Interactive Comparison Card */}
        <div className="max-w-4xl mx-auto bg-white border border-[#F8D2DC] rounded-3xl p-5 sm:p-7 shadow-[0_20px_50px_-10px_rgba(224,122,147,0.18)]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Visual Slider Frame */}
            <div className="lg:col-span-7">
              <div className="relative aspect-[4/3] sm:aspect-[16/11] rounded-2xl overflow-hidden select-none border-2 border-[#FCE1E8] shadow-inner bg-[#FCECEF]">
                {/* AFTER image */}
                <img
                  src={current.afterImg}
                  alt={current.afterLabel}
                  referrerPolicy="no-referrer"
                  className="absolute inset-0 w-full h-full object-cover"
                />

                {/* BEFORE image */}
                <div
                  className="absolute inset-0 overflow-hidden"
                  style={{ width: `${sliderPosition}%` }}
                >
                  <img
                    src={current.beforeImg}
                    alt={current.beforeLabel}
                    referrerPolicy="no-referrer"
                    className="absolute inset-0 w-full h-full object-cover max-w-none"
                    style={{ width: '100%', height: '100%' }}
                  />
                  {/* Rose-gold shadow separator on the edge */}
                  <div className="absolute top-0 right-0 bottom-0 w-1 bg-[#E07A93] shadow-[0_0_15px_#E07A93]" />
                </div>

                {/* Floating Labels */}
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-semibold text-[#6E2A40] border border-[#F8D2DC] shadow-xs">
                  {current.beforeLabel}
                </div>
                <div className="absolute top-3 right-3 bg-gradient-to-r from-[#F08CA5] to-[#C74B72] backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-bold text-white shadow-sm">
                  {current.afterLabel}
                </div>

                {/* Slider Drag Handle */}
                <div
                  className="absolute top-0 bottom-0 pointer-events-none flex items-center justify-center -ml-4"
                  style={{ left: `${sliderPosition}%` }}
                >
                  <div className="w-8 h-8 rounded-full bg-white border-2 border-[#E07A93] text-[#C74B72] flex items-center justify-center shadow-md pointer-events-auto cursor-ew-resize hover:scale-110 transition-transform">
                    <MoveHorizontal className="w-4 h-4" />
                  </div>
                </div>

                {/* Range Input element */}
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={sliderPosition}
                  onChange={handleSliderChange}
                  className="absolute inset-0 opacity-0 cursor-ew-resize w-full h-full z-10"
                  aria-label="Drag before and after slider"
                />
              </div>

              {/* Slider instruction */}
              <div className="flex items-center justify-between text-[11px] text-[#9E6577] mt-2.5 px-1">
                <span>◀ Drag slider left/right to reveal</span>
                <span className="tabular-nums font-mono font-semibold text-[#C74B72]">{sliderPosition}% reveal</span>
              </div>
            </div>

            {/* Details & Direct Booking Action */}
            <div className="lg:col-span-5 space-y-4">
              <div className="space-y-1">
                <span className="text-xs font-bold text-[#C74B72] uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Transformation Details</span>
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#2E141D]">
                  {current.serviceName}
                </h3>
              </div>

              <div className="space-y-2 text-xs text-[#52303D] bg-[#FFF5F8] p-4 rounded-2xl border border-[#FAD6DF]">
                <div className="flex justify-between py-1 border-b border-[#F8D2DC]">
                  <span className="text-[#8C5A69]">Stylist:</span>
                  <span className="font-semibold text-[#2E141D]">{current.stylist}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#F8D2DC]">
                  <span className="text-[#8C5A69]">Standard Price:</span>
                  <span className="font-bold text-[#C74B72] font-mono tabular-nums text-sm">
                    {current.price}
                  </span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-[#8C5A69]">Deposit:</span>
                  <span className="text-[#2E141D] font-mono font-semibold">KES 500 (via M-Pesa)</span>
                </div>
              </div>

              <p className="text-xs text-[#7A4D5C] leading-relaxed">
                {current.notes}
              </p>

              <div className="pt-2">
                <button
                  onClick={() => onBookService(current.serviceId)}
                  className="w-full py-3.5 text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-[#F08CA5] via-[#E07A93] to-[#C74B72] rounded-xl hover:brightness-105 shadow-md shadow-[#E07A93]/25 transition-all"
                >
                  Book This Look · {current.price}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
