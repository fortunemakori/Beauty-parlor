import React, { useState } from 'react';
import { Appointment, Language, MembershipTier } from '../types';
import { translations } from '../data/translations';
import { MEMBERSHIP_TIERS, BRAND_ASSETS } from '../data/mockData';
import { X, Clock, Calendar, Award, Phone } from 'lucide-react';

interface ClientDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  appointments: Appointment[];
  onCancelAppointment: (id: string) => void;
  language: Language;
}

export const ClientDashboardModal: React.FC<ClientDashboardModalProps> = ({
  isOpen,
  onClose,
  appointments,
  onCancelAppointment,
  language,
}) => {
  const [activeTab, setActiveTab] = useState<'appointments' | 'membership'>('appointments');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const t = translations[language];

  if (!isOpen) return null;

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#2E141D]/50 backdrop-blur-md flex items-center justify-center p-4">
      <div className="relative w-full max-w-2xl bg-white border border-[#FAD6DF] rounded-3xl shadow-[0_25px_60px_rgba(224,122,147,0.22)] overflow-hidden my-6 animate-fadeIn">
        {/* Header */}
        <div className="px-6 py-4.5 border-b border-[#FCE1E8] bg-gradient-to-r from-[#FFF0F4] via-[#FFF7F9] to-[#FFF0F4] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#FFF0F4] border border-[#FAD6DF] flex items-center justify-center text-[#C74B72]">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-[#2E141D]">
                Glamour Sanctuary Portal
              </h3>
              <p className="text-[11px] text-[#8A6372]">
                Appointment Tracking & VIP Membership Hub · Maasai Lodge
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-[#9E6B7A] hover:text-[#2E141D] rounded-full hover:bg-[#FCE1E8]/60 transition-colors cursor-pointer"
            aria-label="Close portal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-[#FCE1E8] bg-[#FFF8FA] text-xs font-semibold">
          <button
            onClick={() => setActiveTab('appointments')}
            className={`flex-1 py-3 text-center transition-colors border-b-2 flex items-center justify-center gap-2 cursor-pointer ${
              activeTab === 'appointments'
                ? 'border-[#C74B72] text-[#C74B72] bg-[#FFF0F4]/70'
                : 'border-transparent text-[#7A5866] hover:text-[#2E141D]'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>Appointment Tracking ({appointments.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('membership')}
            className={`flex-1 py-3 text-center transition-colors border-b-2 flex items-center justify-center gap-2 cursor-pointer ${
              activeTab === 'membership'
                ? 'border-[#C74B72] text-[#C74B72] bg-[#FFF0F4]/70'
                : 'border-transparent text-[#7A5866] hover:text-[#2E141D]'
            }`}
          >
            <Award className="w-4 h-4" />
            <span>VIP Glamour Club & Discounts</span>
          </button>
        </div>

        <div className="p-6">
          {activeTab === 'appointments' ? (
            <div className="space-y-4">
              {appointments.length === 0 ? (
                <div className="p-8 text-center text-[#8A6372] space-y-2 bg-[#FFF8FA] rounded-2xl border border-[#FAD6DF]">
                  <Calendar className="w-10 h-10 mx-auto text-[#D4AF37]" />
                  <p className="text-sm font-semibold text-[#2E141D]">No appointments scheduled yet.</p>
                  <p className="text-xs text-[#7A5866]">Book a salon service to track your schedule and automated reminders.</p>
                </div>
              ) : (
                <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
                  {appointments.map((apt) => (
                    <div
                      key={apt.id}
                      className="p-4.5 rounded-2xl bg-[#FFF9FA] border border-[#FAD6DF] space-y-3 hover:border-[#E07A93] transition-colors shadow-xs"
                    >
                      <div className="flex flex-wrap items-start justify-between gap-2">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-xs font-bold text-[#C74B72]">
                              {apt.bookingRef}
                            </span>
                            <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-[#F0FAF3] text-[#15803D] border border-[#A3E0BA]">
                              {apt.status}
                            </span>
                          </div>
                          <h4 className="font-serif text-base font-bold text-[#2E141D] mt-1">
                            {apt.serviceName}
                          </h4>
                          <p className="text-xs text-[#7A5866]">
                            Stylist: <span className="text-[#C74B72] font-semibold">{apt.stylistName}</span> · Client: {apt.clientName}
                          </p>
                        </div>

                        <div className="text-right">
                          <div className="text-xs text-[#C74B72] font-bold font-mono">
                            {apt.date}
                          </div>
                          <div className="text-xs text-[#7A5866] font-mono">
                            {apt.timeSlot}
                          </div>
                        </div>
                      </div>

                      {/* Payment & Reminders Strip */}
                      <div className="pt-2 border-t border-[#FCE1E8] flex flex-wrap items-center justify-between text-xs text-[#7A5866]">
                        <div className="flex items-center gap-3">
                          <span>Deposit Paid: <strong className="text-[#15803D] font-mono">KES {apt.depositPaidKES.toLocaleString()}</strong></span>
                          <span>·</span>
                          <span>M-Pesa: <span className="font-mono text-[#2E141D] font-bold">{apt.mpesaCode}</span></span>
                        </div>

                        {apt.status === 'confirmed' && (
                          <button
                            onClick={() => {
                              if (confirm(`Are you sure you want to cancel appointment ${apt.bookingRef}? Deposit policy applies.`)) {
                                onCancelAppointment(apt.id);
                              }
                            }}
                            className="text-[11px] text-red-500 hover:underline font-semibold cursor-pointer"
                          >
                            Cancel Slot
                          </button>
                        )}
                      </div>

                      {/* Reminder status preview */}
                      <div className="text-[11px] text-[#15803D] bg-[#F0FAF3] p-2 rounded-xl border border-[#A3E0BA] flex items-center gap-1.5">
                        <Phone className="w-3.5 h-3.5 text-[#15803D]" />
                        <span>SMS & WhatsApp reminder active for {apt.clientPhone}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-6">
              {/* VIP Card Representation */}
              <div className="rounded-3xl p-6 bg-gradient-to-tr from-[#FFF0F4] via-[#FFE2EB] to-[#FFF5F8] border-2 border-[#E07A93] shadow-md text-[#2E141D] relative overflow-hidden">
                <div className="flex items-center justify-between relative">
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-[#C74B72] font-bold">
                      Agatha Glamour VIP Club
                    </span>
                    <h3 className="font-serif text-2xl font-bold text-[#2E141D]">
                      Gold Royalty Member
                    </h3>
                    <p className="text-xs text-[#7A5866]">Maasai Lodge, Ongata Rongai</p>
                  </div>
                  <img
                    src={BRAND_ASSETS.logo}
                    alt="AG crest"
                    className="w-12 h-12 rounded-full bg-white p-1 object-contain shadow-sm border border-[#FAD6DF]"
                  />
                </div>

                <div className="mt-6 flex items-baseline justify-between border-t border-[#FAD6DF] pt-4">
                  <div>
                    <span className="text-[10px] text-[#7A5866] uppercase block">Points Balance</span>
                    <span className="font-serif text-3xl font-bold text-[#C74B72] font-mono tabular-nums">
                      3,450 PTS
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-[#7A5866] uppercase block">Current Perk</span>
                    <span className="text-xs font-bold text-[#15803D] bg-[#F0FAF3] px-2 py-1 rounded-md border border-[#A3E0BA]">
                      12% OFF ALL SERVICES
                    </span>
                  </div>
                </div>
              </div>

              {/* Exclusive Discount Vouchers */}
              <div className="space-y-3">
                <label className="text-xs font-bold text-[#C74B72] uppercase tracking-wider block">
                  Exclusive Promo Codes
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-3.5 rounded-2xl bg-[#FFF9FA] border border-[#FAD6DF] flex items-center justify-between">
                    <div>
                      <div className="font-mono text-xs font-bold text-[#C74B72]">MAASAI-GLAM-12</div>
                      <div className="text-[10px] text-[#7A5866]">12% off your next Boho Braids session</div>
                    </div>
                    <button
                      onClick={() => handleCopyCode('MAASAI-GLAM-12')}
                      className="px-3 py-1.5 text-[11px] font-bold text-white rose-gold-gradient-bg rounded-lg hover:brightness-105 shadow-sm cursor-pointer"
                    >
                      {copiedCode === 'MAASAI-GLAM-12' ? 'Copied!' : 'Copy'}
                    </button>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-[#FFF9FA] border border-[#FAD6DF] flex items-center justify-between">
                    <div>
                      <div className="font-mono text-xs font-bold text-[#C74B72]">STILETTO-FREE-GEL</div>
                      <div className="text-[10px] text-[#7A5866]">Free Gel Topcoat with Brenda K.</div>
                    </div>
                    <button
                      onClick={() => handleCopyCode('STILETTO-FREE-GEL')}
                      className="px-3 py-1.5 text-[11px] font-bold text-white rose-gold-gradient-bg rounded-lg hover:brightness-105 shadow-sm cursor-pointer"
                    >
                      {copiedCode === 'STILETTO-FREE-GEL' ? 'Copied!' : 'Copy'}
                    </button>
                  </div>
                </div>
              </div>

              {/* Tier breakdown */}
              <div className="space-y-2">
                <span className="text-xs font-semibold text-[#7A5866] block">Available Membership Tiers:</span>
                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  {MEMBERSHIP_TIERS.map((tier: MembershipTier) => (
                    <div key={tier.id} className="p-3 rounded-2xl bg-[#FFF9FA] border border-[#FAD6DF]">
                      <div className="font-bold text-[#2E141D] text-[11px]">{tier.name}</div>
                      <div className="text-[#C74B72] font-bold text-xs mt-0.5">{tier.discountPercent}% Off</div>
                      <div className="text-[10px] text-[#8A6372] mt-1">{tier.minPoints} pts</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
