import React, { useState } from 'react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { BRAND_ASSETS } from '../data/mockData';
import { MapPin, Phone, MessageCircle, Clock, ShieldCheck, HelpCircle, ChevronDown, ChevronUp, Heart, ExternalLink, Instagram } from 'lucide-react';

interface ContactLocationProps {
  language: Language;
}

export const ContactLocation: React.FC<ContactLocationProps> = ({ language }) => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const t = translations[language];

  const faqs = [
    {
      q: 'Where exactly is Agatha Glamour located in Ongata Rongai?',
      a: 'We are situated at Maasai Lodge stage, directly along Magadi Road in Ongata Rongai. Whether you are arriving by matatu (simply alight at Maasai Lodge stage) or driving, we have convenient roadside access and secure parking.',
    },
    {
      q: 'Why do you require an M-Pesa deposit for appointments?',
      a: 'Our master stylists dedicate 1.5 to 4 hours per appointment. A small deposit (typically KES 500 - KES 1,000 depending on service) locks your dedicated chair, prepares materials, and prevents no-shows. Deposits are 100% credited toward your total salon bill.',
    },
    {
      q: 'Can I pay via Lipa na M-Pesa Till at the salon?',
      a: 'Yes! We accept M-Pesa Buy Goods Till 542109 (Agatha Glamour), Paybill 400222, and cash. You will receive an automated Safaricom SMS confirmation immediately.',
    },
    {
      q: 'Can I bring a TikTok or Instagram picture for the stylists to recreate?',
      a: 'Absolutely! Our braiders and nail artists love custom inspo. You can show any TikTok reel, Pinterest pin, or Instagram picture, or pick from our curated TikTok viral looks.',
    },
  ];

  return (
    <section id="location" className="py-16 lg:py-24 bg-gradient-to-b from-[#FFF9FA] via-[#FFF2F6] to-[#FFF0F4] border-b border-[#FCE1E8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Location & Contacts */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#C74B72] tracking-widest uppercase bg-white px-3.5 py-1.5 rounded-full border border-[#F8D2DC] shadow-xs">
                <Heart className="w-3.5 h-3.5 fill-[#E07A93] text-[#E07A93]" />
                <span>Visit Us in Rongai</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#2E141D] mt-2">
                The Maasai Lodge Parlour
              </h2>
              <p className="text-sm text-[#7A4D5C] mt-2 leading-relaxed">
                Step into our tranquil, air-conditioned beauty parlour in Ongata Rongai, Maasai Lodge. Enjoy complimentary chilled drinks, high-speed WiFi, and master-level beauty pampering.
              </p>
            </div>

            <div className="space-y-4 text-xs text-[#52303D]">
              {/* Address card */}
              <div className="p-4.5 rounded-2xl bg-white border border-[#F8DCE2] space-y-2 shadow-xs">
                <div className="font-bold text-[#2E141D] flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#C74B72]" />
                  <span>Physical Address:</span>
                </div>
                <p className="text-[#7A4D5C] pl-6 font-medium leading-relaxed">
                  {BRAND_ASSETS.locationDetail}
                </p>
                <div className="pl-6 pt-1">
                  <a
                    href="https://maps.google.com/?q=Maasai+Lodge+Ongata+Rongai+Kenya"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C74B72] hover:underline"
                  >
                    <span>Open in Google Maps</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              {/* Hours */}
              <div className="p-4 rounded-2xl bg-white border border-[#F8DCE2] space-y-1 shadow-xs">
                <div className="font-bold text-[#2E141D] flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#C74B72]" />
                  <span>Operating Hours:</span>
                </div>
                <p className="text-[#7A4D5C] pl-6 font-medium">
                  Monday – Saturday: 8:00 AM – 8:00 PM <br />
                  Sunday: 10:00 AM – 6:00 PM
                </p>
              </div>

              {/* Contact actions */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <a
                  href={`tel:${BRAND_ASSETS.phone}`}
                  className="p-3.5 rounded-2xl bg-white border border-[#F8D2DC] hover:border-[#E07A93] hover:bg-[#FFF5F8] transition-all flex items-center gap-3 text-left shadow-xs"
                >
                  <div className="w-9 h-9 rounded-full bg-[#FFF0F4] border border-[#F8D2DC] flex items-center justify-center text-[#C74B72] shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div className="overflow-hidden">
                    <span className="text-[10px] text-[#8C5A69] font-medium block">Phone Hotline</span>
                    <span className="font-mono font-bold text-[#2E141D] text-xs truncate block">{BRAND_ASSETS.phone}</span>
                  </div>
                </a>

                <a
                  href={`https://wa.me/254710690669?text=${encodeURIComponent('Hello Agatha Glamour, I would like to book a service at your Maasai Lodge, Ongata Rongai parlour.')}`}
                  target="_blank"
                  rel="noreferrer"
                  className="p-3.5 rounded-2xl bg-[#E8F8EC] border border-[#BDE8C8] hover:bg-[#D5F2DC] transition-all flex items-center gap-3 text-left shadow-xs"
                >
                  <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center text-[#25D366] shrink-0 shadow-xs">
                    <MessageCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] text-[#2F6B3E] font-medium block">Instant WhatsApp</span>
                    <span className="font-bold text-[#1E7E34] text-xs">Chat Now</span>
                  </div>
                </a>

                <a
                  href={BRAND_ASSETS.tiktokUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="p-3.5 rounded-2xl bg-black text-white hover:bg-[#FE2C55] transition-all flex items-center gap-3 text-left shadow-xs"
                >
                  <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-[#25F4EE] shrink-0 font-bold">
                    ♪
                  </div>
                  <div>
                    <span className="text-[10px] text-white/70 font-medium block">TikTok</span>
                    <span className="font-bold text-white text-xs truncate block">@agathaglamour</span>
                  </div>
                </a>

                <a
                  href={BRAND_ASSETS.instagramUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="p-3.5 rounded-2xl bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F77737] text-white hover:opacity-90 transition-all flex items-center gap-3 text-left shadow-xs"
                >
                  <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-white shrink-0">
                    <Instagram className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <span className="text-[10px] text-white/80 font-medium block">Instagram</span>
                    <span className="font-bold text-white text-xs truncate block">@agatha_glamour</span>
                  </div>
                </a>
              </div>
            </div>
          </div>

          {/* Interactive FAQs */}
          <div className="lg:col-span-6 space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold text-[#C74B72] uppercase tracking-wider">
              <HelpCircle className="w-4 h-4" />
              <span>Frequently Asked Questions</span>
            </div>

            <div className="space-y-3">
              {faqs.map((faq, idx) => {
                const isOpen = openFaqIndex === idx;
                return (
                  <div
                    key={idx}
                    className="rounded-2xl bg-white border border-[#F8DCE2] overflow-hidden transition-all shadow-xs"
                  >
                    <button
                      onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                      className="w-full p-4 text-left flex items-center justify-between gap-3 text-xs font-bold text-[#2E141D] hover:text-[#C74B72] cursor-pointer"
                    >
                      <span>{faq.q}</span>
                      {isOpen ? (
                        <ChevronUp className="w-4 h-4 text-[#C74B72] shrink-0" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-[#8C5A69] shrink-0" />
                      )}
                    </button>

                    {isOpen && (
                      <div className="px-4 pb-4 text-xs text-[#7A4D5C] leading-relaxed border-t border-[#F8DCE2] pt-3 animate-fadeIn">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* M-Pesa Security Pledge */}
            <div className="p-4 rounded-2xl bg-[#E8F8EC] border border-[#BDE8C8] text-xs text-[#1E7E34] flex items-start gap-3 shadow-xs">
              <ShieldCheck className="w-5 h-5 text-[#25D366] shrink-0 mt-0.5" />
              <div>
                <strong className="text-[#1E7E34] block mb-0.5">Safaricom Authorized Till Security</strong>
                <p className="text-[11px] text-[#2B6E3C]">
                  All payments are processed securely through Safaricom Till 542109 with immediate automated SMS receipts. Zero hidden fees.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
