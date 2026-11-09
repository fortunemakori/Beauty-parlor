import React, { useState } from 'react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { Palette, Check, ArrowRight, Heart, Sparkles } from 'lucide-react';

interface ShadeFinderProps {
  language: Language;
  onBookMatchedLook: (details: { serviceId: string; notes: string }) => void;
}

export const ShadeFinder: React.FC<ShadeFinderProps> = ({ language, onBookMatchedLook }) => {
  const [skinTone, setSkinTone] = useState<'deep' | 'espresso' | 'caramel' | 'honey'>('caramel');
  const [undertone, setUndertone] = useState<'warm' | 'neutral' | 'cool'>('warm');
  const [glamStyle, setGlamStyle] = useState<'bridal' | 'soft' | 'baddie'>('soft');
  const t = translations[language];

  // Complexion palette database
  const skinTones = [
    { id: 'deep', name: 'Deep Rich Cocoa', color: '#3B2318', desc: 'Rich espresso and deep melanin tones' },
    { id: 'espresso', name: 'Warm Espresso Bronze', color: '#5C3826', desc: 'Chestnut with rich golden depth' },
    { id: 'caramel', name: 'Sun-Kissed Caramel', color: '#88583B', desc: 'Warm amber and caramel warmth' },
    { id: 'honey', name: 'Golden Honey Amber', color: '#B37D56', desc: 'Luminous olive and honey radiance' },
  ];

  const undertones = [
    { id: 'warm', name: 'Warm / Golden', desc: 'Gold jewelry looks best on you; peachy/yellow base' },
    { id: 'neutral', name: 'Neutral / Balanced', desc: 'Both gold and silver flatter you; balanced tones' },
    { id: 'cool', name: 'Cool / Red Depth', desc: 'Rich reddish or ruby undertones under sunlight' },
  ];

  const styles = [
    { id: 'soft', name: 'Effortless Soft Glam', bestFor: 'Everyday meetings, birthdays & dinners' },
    { id: 'bridal', name: 'Royalty Bridal Radiance', bestFor: 'Weddings, dowry ceremonies & official galas' },
    { id: 'baddie', name: 'High-Impact Sculpted Glam', bestFor: 'Photoshoots, festivals & party nights' },
  ];

  // Recommendation engine
  const getRecommendation = () => {
    if (skinTone === 'deep') {
      return {
        formulaCode: 'AG-MELANIN-520',
        foundationName: 'Agatha Velvet Matte #520 Deep Cocoa',
        lipCombo: 'Dark Chocolate Liner + Bronze Shimmer Gloss',
        nailMatch: 'French Tip Sculpted Stilettos with Red Lips Art',
        hairMatch: 'Boho Braids with Polished Dark Wood Beads',
        serviceId: 'srv-makeup',
        serviceName: 'Royalty Melanin Glam & Makeup',
      };
    } else if (skinTone === 'espresso') {
      return {
        formulaCode: 'AG-MELANIN-440',
        foundationName: 'Agatha Hydrating Silk #440 Warm Espresso',
        lipCombo: 'Chestnut Brown Liner + Rongai Nude Peach Butter',
        nailMatch: 'Classic French Tip Square Acrylics',
        hairMatch: 'Mid-Back Knotless Braids with Gold Cuffs',
        serviceId: 'srv-makeup',
        serviceName: 'Melanin Radiance Soft Glam',
      };
    } else if (skinTone === 'caramel') {
      return {
        formulaCode: 'AG-MELANIN-380',
        foundationName: 'Agatha Luminous Glow #380 Golden Caramel',
        lipCombo: 'Spiced Latte Liner + Champagne Diamond Glaze',
        nailMatch: 'Sculpted Stiletto Nails with Custom Hearts',
        hairMatch: 'Bohemian Goddess Braids with Mahogany Beads',
        serviceId: 'srv-nails',
        serviceName: 'Sculpted Nails & Soft Glam Bundle',
      };
    } else {
      return {
        formulaCode: 'AG-MELANIN-310',
        foundationName: 'Agatha Dewy Filter #310 Honey Amber',
        lipCombo: 'Cinnamon Toffee Liner + Rose Gold High-Shine Gloss',
        nailMatch: 'Milky French Gel Overlay with Micro-Gems',
        hairMatch: 'Honey-Blonde Blended Bohemian Goddess Braids',
        serviceId: 'srv-hair',
        serviceName: 'Bohemian Braids & Golden Glow',
      };
    }
  };

  const rec = getRecommendation();

  const handleBook = () => {
    onBookMatchedLook({
      serviceId: rec.serviceId,
      notes: `Custom Shade Finder Profile: Tone ${skinTone}, Undertone ${undertone}, Style ${glamStyle}. Foundation: ${rec.foundationName}, Lips: ${rec.lipCombo}`,
    });
  };

  return (
    <section id="shade-finder" className="py-16 lg:py-24 bg-[#FFF0F4] border-b border-[#FCE1E8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#C74B72] tracking-widest uppercase bg-white px-3.5 py-1.5 rounded-full border border-[#F8D2DC] shadow-xs">
            <Palette className="w-3.5 h-3.5 text-[#E07A93]" />
            <span>Smart Glamour Matcher</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#2E141D]">
            {t.shadeFinderTitle}
          </h2>
          <p className="text-sm text-[#7A4D5C]">
            {t.shadeFinderSub}
          </p>
        </div>

        {/* Interactive Matcher Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls Column */}
          <div className="lg:col-span-7 space-y-8 bg-white border border-[#F8D2DC] rounded-3xl p-6 sm:p-8 shadow-[0_15px_35px_-5px_rgba(224,122,147,0.12)]">
            {/* Step 1: Skin Tone Selection */}
            <div className="space-y-3">
              <label className="text-xs font-bold text-[#C74B72] uppercase tracking-wider flex items-center justify-between">
                <span>1. Select Your Melanin Tone</span>
                <span className="text-[11px] text-[#9E6577] font-normal">Click swatch to preview</span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {skinTones.map((tone) => (
                  <button
                    key={tone.id}
                    onClick={() => setSkinTone(tone.id as any)}
                    className={`p-3 rounded-2xl border text-left transition-all ${
                      skinTone === tone.id
                        ? 'border-[#E07A93] bg-[#FFF5F8] ring-2 ring-[#E07A93]/40 shadow-xs'
                        : 'border-[#F8DCE2] bg-white hover:border-[#E8A5B6]'
                    }`}
                  >
                    <div
                      className="w-full h-10 rounded-xl mb-2 shadow-inner border border-black/5"
                      style={{ backgroundColor: tone.color }}
                    />
                    <div className="text-xs font-bold text-[#2E141D] truncate">{tone.name}</div>
                    <div className="text-[10px] text-[#8C5A69] truncate">{tone.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Undertone Selection */}
            <div className="space-y-3">
              <label className="text-xs font-bold text-[#C74B72] uppercase tracking-wider">
                2. Select Your Undertone
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {undertones.map((under) => (
                  <button
                    key={under.id}
                    onClick={() => setUndertone(under.id as any)}
                    className={`p-3.5 rounded-2xl border text-left transition-all ${
                      undertone === under.id
                        ? 'border-[#E07A93] bg-[#FFF5F8] ring-2 ring-[#E07A93]/40 shadow-xs'
                        : 'border-[#F8DCE2] bg-white hover:border-[#E8A5B6]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-[#2E141D]">{under.name}</span>
                      {undertone === under.id && <Check className="w-3.5 h-3.5 text-[#C74B72]" />}
                    </div>
                    <div className="text-[10px] text-[#8C5A69] leading-tight">{under.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Glamour Vibe */}
            <div className="space-y-3">
              <label className="text-xs font-bold text-[#C74B72] uppercase tracking-wider">
                3. Choose Desired Vibe
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {styles.map((style) => (
                  <button
                    key={style.id}
                    onClick={() => setGlamStyle(style.id as any)}
                    className={`p-3.5 rounded-2xl border text-left transition-all ${
                      glamStyle === style.id
                        ? 'border-[#E07A93] bg-[#FFF5F8] ring-2 ring-[#E07A93]/40 shadow-xs'
                        : 'border-[#F8DCE2] bg-white hover:border-[#E8A5B6]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-[#2E141D]">{style.name}</span>
                      {glamStyle === style.id && <Check className="w-3.5 h-3.5 text-[#C74B72]" />}
                    </div>
                    <div className="text-[10px] text-[#8C5A69] leading-tight">{style.bestFor}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Feminine Results Card */}
          <div className="lg:col-span-5 bg-gradient-to-b from-[#FFF5F8] via-[#FFF8FA] to-[#FDEFF2] border-2 border-[#FAD6DF] rounded-3xl p-6 sm:p-8 space-y-6 shadow-[0_20px_50px_-10px_rgba(224,122,147,0.18)] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#F8BDCE]/30 rounded-full blur-2xl pointer-events-none" />

            <div className="flex items-center justify-between border-b border-[#F8D2DC] pb-4">
              <div>
                <span className="text-[10px] font-bold text-[#C74B72] uppercase tracking-widest flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  <span>Custom Match Formula</span>
                </span>
                <h3 className="font-serif text-2xl font-bold text-[#2E141D]">
                  {rec.formulaCode}
                </h3>
              </div>
              <span className="px-3 py-1 text-xs font-bold font-mono text-[#C74B72] bg-white rounded-full border border-[#F8D2DC] shadow-xs">
                100% Match
              </span>
            </div>

            {/* Curated Recommendations */}
            <div className="space-y-3 text-xs">
              <div className="p-3.5 rounded-2xl bg-white border border-[#F8DCE2] space-y-1 shadow-xs">
                <span className="text-[10px] font-bold text-[#8C5A69] uppercase tracking-wider">Complexion & Base</span>
                <p className="font-semibold text-[#2E141D]">{rec.foundationName}</p>
              </div>

              <div className="p-3.5 rounded-2xl bg-white border border-[#F8DCE2] space-y-1 shadow-xs">
                <span className="text-[10px] font-bold text-[#8C5A69] uppercase tracking-wider">Signature Lip Palette</span>
                <p className="font-semibold text-[#C74B72]">{rec.lipCombo}</p>
              </div>

              <div className="p-3.5 rounded-2xl bg-white border border-[#F8DCE2] space-y-1 shadow-xs">
                <span className="text-[10px] font-bold text-[#8C5A69] uppercase tracking-wider">Recommended Nail Set</span>
                <p className="font-semibold text-[#2E141D]">{rec.nailMatch}</p>
              </div>

              <div className="p-3.5 rounded-2xl bg-white border border-[#F8DCE2] space-y-1 shadow-xs">
                <span className="text-[10px] font-bold text-[#8C5A69] uppercase tracking-wider">Matching Hair Artistry</span>
                <p className="font-semibold text-[#2E141D]">{rec.hairMatch}</p>
              </div>
            </div>

            {/* Direct Booking Action */}
            <button
              onClick={handleBook}
              className="w-full py-3.5 px-4 text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-[#F08CA5] via-[#E07A93] to-[#C74B72] rounded-xl hover:brightness-105 shadow-md shadow-[#E07A93]/25 transition-all flex items-center justify-center gap-2"
            >
              <span>Book This Personalized Look</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <p className="text-[11px] text-center text-[#9E6577]">
              Custom recipe pre-loaded into your appointment booking with deposit via M-Pesa.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
