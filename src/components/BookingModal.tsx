import React, { useState, useEffect } from 'react';
import { Language, Service, Stylist, Appointment } from '../types';
import { translations } from '../data/translations';
import { SERVICES_DATA, STYLISTS_DATA } from '../data/mockData';
import { X, Clock, CheckCircle2, Phone, User, Mail, Sparkles, ArrowRight, Printer } from 'lucide-react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preSelectedServiceId?: string;
  preSelectedStylistId?: string;
  initialNotes?: string;
  onBookingConfirmed: (appointment: Appointment) => void;
  language: Language;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  preSelectedServiceId,
  preSelectedStylistId,
  initialNotes = '',
  onBookingConfirmed,
  language,
}) => {
  const t = translations[language];

  // Steps: 1: Service & Stylist, 2: Date & Time, 3: Client Details, 4: M-Pesa Payment, 5: Confirmation
  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5>(1);

  const [selectedServiceId, setSelectedServiceId] = useState<string>(
    preSelectedServiceId || SERVICES_DATA[0].id
  );
  const [selectedStylistId, setSelectedStylistId] = useState<string>(
    preSelectedStylistId || 'any'
  );
  const [makeupTier, setMakeupTier] = useState<'personal' | 'professional'>('personal');

  // Date selection: default to tomorrow
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowStr = tomorrow.toISOString().split('T')[0];
  const [selectedDate, setSelectedDate] = useState<string>(tomorrowStr);
  const [selectedTime, setSelectedTime] = useState<string>('10:00 AM');

  // Client Details
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('0710690669');
  const [clientEmail, setClientEmail] = useState('');
  const [notes, setNotes] = useState(initialNotes);

  // M-Pesa STK state
  const [mpesaNumber, setMpesaNumber] = useState('0710690669');
  const [isProcessingMpesa, setIsProcessingMpesa] = useState(false);
  const [mpesaPromptVisible, setMpesaPromptVisible] = useState(false);
  const [mpesaPin, setMpesaPin] = useState('');
  const [confirmedAppointment, setConfirmedAppointment] = useState<Appointment | null>(null);

  // Update pre-selections when opened
  useEffect(() => {
    if (preSelectedServiceId) {
      setSelectedServiceId(preSelectedServiceId);
    }
    if (preSelectedStylistId) {
      setSelectedStylistId(preSelectedStylistId);
    }
    if (initialNotes) {
      setNotes(initialNotes);
    }
  }, [preSelectedServiceId, preSelectedStylistId, initialNotes]);

  if (!isOpen) return null;

  const currentService = SERVICES_DATA.find((s: Service) => s.id === selectedServiceId) || SERVICES_DATA[0];
  const currentStylist = STYLISTS_DATA.find((st: Stylist) => st.id === selectedStylistId);

  const isMakeup = currentService.id === 'srv-makeup';
  const effectivePriceKES = isMakeup
    ? (makeupTier === 'personal' ? 10000 : 20000)
    : currentService.priceKES;
  const effectiveDepositKES = isMakeup
    ? (makeupTier === 'personal' ? 2000 : 4000)
    : currentService.depositKES;
  const effectiveServiceName = isMakeup
    ? (makeupTier === 'personal' ? 'Personal Makeup (Signature by Agatha)' : 'Professional Makeup (Editorial Artistry by Agatha)')
    : currentService.name;

  const availableSlots = currentStylist
    ? currentStylist.availableSlots
    : ['09:00 AM', '11:30 AM', '02:00 PM', '04:30 PM', '06:00 PM'];

  const [depositChoice, setDepositChoice] = useState<'pay_on_arrival' | 'pay_deposit_now'>('pay_on_arrival');

  const handleBookWithPayOnArrival = () => {
    const randomChars = Math.random().toString(36).substring(2, 7).toUpperCase();
    const bookingRef = `AG-${Math.floor(1000 + Math.random() * 9000)}-${randomChars.slice(0, 2)}`;

    const newAppointment: Appointment = {
      id: `apt-${Date.now()}`,
      bookingRef,
      clientName: clientName || 'Guest Glamour Client',
      clientPhone: clientPhone || mpesaNumber,
      clientEmail: clientEmail || 'client@example.com',
      serviceId: currentService.id,
      serviceName: effectiveServiceName,
      stylistId: currentStylist ? currentStylist.id : 'stylist-agatha',
      stylistName: currentStylist ? currentStylist.name : 'Agatha (Main Top Artist)',
      date: selectedDate,
      timeSlot: selectedTime,
      totalKES: effectivePriceKES,
      depositPaidKES: 0,
      paymentPreference: 'pay_at_parlour',
      status: 'confirmed',
      mpesaCode: 'PAY-ON-ARRIVAL',
      notes: notes ? `${notes} (Deposit optional - Pay at parlour)` : 'Deposit optional - Pay at parlour',
      createdAt: new Date().toLocaleString(),
      reminderSent: true,
    };

    setConfirmedAppointment(newAppointment);
    onBookingConfirmed(newAppointment);
    setStep(5);
  };

  const handleSendStkPush = () => {
    setIsProcessingMpesa(true);
    // Simulate network delay to trigger Kenyan M-Pesa STK push prompt on user's phone
    setTimeout(() => {
      setIsProcessingMpesa(false);
      setMpesaPromptVisible(true);
    }, 1200);
  };

  const handleApprovePin = () => {
    // Generate realistic Safaricom transaction reference
    const randomChars = Math.random().toString(36).substring(2, 7).toUpperCase();
    const generatedMpesaRef = `SL${Math.floor(10 + Math.random() * 89)}${randomChars}`;
    const bookingRef = `AG-${Math.floor(1000 + Math.random() * 9000)}-${randomChars.slice(0, 2)}`;

    const newAppointment: Appointment = {
      id: `apt-${Date.now()}`,
      bookingRef,
      clientName: clientName || 'Guest Glamour Client',
      clientPhone: clientPhone || mpesaNumber,
      clientEmail: clientEmail || 'client@example.com',
      serviceId: currentService.id,
      serviceName: effectiveServiceName,
      stylistId: currentStylist ? currentStylist.id : 'stylist-agatha',
      stylistName: currentStylist ? currentStylist.name : 'Agatha (Main Top Artist)',
      date: selectedDate,
      timeSlot: selectedTime,
      totalKES: effectivePriceKES,
      depositPaidKES: effectiveDepositKES,
      paymentPreference: 'deposit_now',
      status: 'confirmed',
      mpesaCode: generatedMpesaRef,
      notes,
      createdAt: new Date().toLocaleString(),
      reminderSent: true,
    };

    setConfirmedAppointment(newAppointment);
    onBookingConfirmed(newAppointment);
    setMpesaPromptVisible(false);
    setStep(5);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#2E141D]/50 backdrop-blur-md flex items-center justify-center p-4">
      <div className="relative w-full max-w-2xl bg-white border border-[#FAD6DF] rounded-3xl shadow-[0_25px_60px_rgba(224,122,147,0.22)] overflow-hidden my-6 animate-fadeIn">
        {/* Header */}
        <div className="px-6 py-4.5 border-b border-[#FCE1E8] bg-gradient-to-r from-[#FFF0F4] via-[#FFF7F9] to-[#FFF0F4] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#FFF0F4] border border-[#FAD6DF] flex items-center justify-center text-[#C74B72] shadow-sm">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-[#2E141D]">
                {step === 5 ? t.appointmentSuccess : 'Agatha Glamour Appointment Scheduling'}
              </h3>
              <p className="text-[11px] text-[#8A6372]">
                {step === 5 ? 'Booking Secured · Rongai Studio' : `Step ${step} of 4 · Real-time appointment scheduling`}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-[#9E6B7A] hover:text-[#2E141D] rounded-full hover:bg-[#FCE1E8]/60 transition-colors"
            aria-label="Close booking modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Progress Tracker */}
        {step < 5 && (
          <div className="grid grid-cols-4 bg-[#FFF8FA] border-b border-[#FCE1E8] text-center text-[11px] font-semibold text-[#8A6372]">
            <div className={`py-2.5 border-b-2 transition-colors ${step >= 1 ? 'border-[#C74B72] text-[#C74B72] bg-[#FFF0F4]/60' : 'border-transparent'}`}>
              1. Service
            </div>
            <div className={`py-2.5 border-b-2 transition-colors ${step >= 2 ? 'border-[#C74B72] text-[#C74B72] bg-[#FFF0F4]/60' : 'border-transparent'}`}>
              2. Date & Time
            </div>
            <div className={`py-2.5 border-b-2 transition-colors ${step >= 3 ? 'border-[#C74B72] text-[#C74B72] bg-[#FFF0F4]/60' : 'border-transparent'}`}>
              3. Details
            </div>
            <div className={`py-2.5 border-b-2 transition-colors ${step >= 4 ? 'border-[#C74B72] text-[#C74B72] bg-[#FFF0F4]/60' : 'border-transparent'}`}>
              4. M-Pesa
            </div>
          </div>
        )}

        {/* Step Content */}
        <div className="p-6">
          {/* STEP 1: Select Service & Stylist */}
          {step === 1 && (
            <div className="space-y-6">
              {/* Select Service */}
              <div>
                <label className="text-xs font-bold text-[#C74B72] uppercase tracking-wider block mb-2">
                  Select Glamour Service
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-56 overflow-y-auto pr-1">
                  {SERVICES_DATA.map((srv: Service) => (
                    <button
                      key={srv.id}
                      onClick={() => setSelectedServiceId(srv.id)}
                      className={`p-3 rounded-2xl border text-left flex items-center gap-3 transition-all ${
                        selectedServiceId === srv.id
                          ? 'border-[#C74B72] bg-[#FFF0F4] ring-2 ring-[#C74B72]/20 shadow-sm'
                          : 'border-[#FAD6DF] bg-[#FFF9FA] hover:border-[#E07A93] hover:bg-[#FFF2F6]'
                      }`}
                    >
                      <img
                        src={srv.image}
                        alt={srv.name}
                        referrerPolicy="no-referrer"
                        className="w-12 h-12 rounded-xl object-cover shrink-0 shadow-sm"
                      />
                      <div className="overflow-hidden">
                        <div className="text-xs font-semibold text-[#2E141D] truncate">{srv.name}</div>
                        <div className="text-[11px] text-[#C74B72] font-mono font-bold">
                          {srv.id === 'srv-makeup' ? 'From KES 10,000' : `KES ${srv.priceKES.toLocaleString()}`}
                        </div>
                        <div className="text-[10px] text-[#7A5866]">{srv.durationMinutes} mins · Dep KES {srv.depositKES}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Agatha Makeup Tier Selector */}
              {isMakeup && (
                <div className="p-3.5 rounded-2xl bg-gradient-to-r from-[#FFF0F4] to-[#FFF7F9] border-2 border-[#FAD6DF] space-y-2.5 shadow-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#C74B72] uppercase tracking-wider">
                      Agatha's Official Makeup Tier
                    </span>
                    <span className="text-[11px] text-[#15803D] font-bold">
                      Call / WhatsApp: 0710.690.669
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <button
                      type="button"
                      onClick={() => setMakeupTier('personal')}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        makeupTier === 'personal'
                          ? 'border-[#C74B72] bg-white ring-2 ring-[#C74B72]/20 shadow-sm'
                          : 'border-[#FAD6DF] bg-white/70 hover:bg-white text-[#52303D]'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-[#2E141D]">Personal Makeup</span>
                        {makeupTier === 'personal' && (
                          <span className="text-[10px] font-bold text-[#C74B72] bg-[#FFF0F4] px-1.5 py-0.5 rounded">Selected</span>
                        )}
                      </div>
                      <div className="font-serif text-lg font-bold text-[#2E141D] font-mono mt-0.5">Ksh. 10,000</div>
                      <div className="text-[10px] text-[#7A5866] mt-0.5">Soft glam, dinners & birthdays · Dep KES 2,000</div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setMakeupTier('professional')}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        makeupTier === 'professional'
                          ? 'border-[#C74B72] bg-white ring-2 ring-[#C74B72]/20 shadow-sm'
                          : 'border-[#FAD6DF] bg-white/70 hover:bg-white text-[#52303D]'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-[#2E141D]">Professional Makeup</span>
                        {makeupTier === 'professional' && (
                          <span className="text-[10px] font-bold text-[#C74B72] bg-[#FFF0F4] px-1.5 py-0.5 rounded">Selected</span>
                        )}
                      </div>
                      <div className="font-serif text-lg font-bold text-[#C74B72] font-mono mt-0.5">Ksh. 20,000</div>
                      <div className="text-[10px] text-[#7A5866] mt-0.5">Editorial, camera & full glamour · Dep KES 4,000</div>
                    </button>
                  </div>
                </div>
              )}

              {/* Select Stylist */}
              <div>
                <label className="text-xs font-bold text-[#C74B72] uppercase tracking-wider block mb-2">
                  Select Stylist
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  <button
                    onClick={() => setSelectedStylistId('any')}
                    className={`p-3 rounded-2xl border text-center transition-all ${
                      selectedStylistId === 'any'
                        ? 'border-[#C74B72] bg-[#FFF0F4] ring-2 ring-[#C74B72]/20 text-[#C74B72] font-semibold'
                        : 'border-[#FAD6DF] bg-[#FFF9FA] hover:border-[#E07A93] text-[#52303D]'
                    }`}
                  >
                    <div className="text-xs font-semibold">First Available</div>
                    <div className="text-[10px] text-[#C74B72]">Next Open Chair</div>
                  </button>

                  {STYLISTS_DATA.map((st: Stylist) => (
                    <button
                      key={st.id}
                      onClick={() => setSelectedStylistId(st.id)}
                      className={`p-3 rounded-2xl border text-center transition-all ${
                        selectedStylistId === st.id
                          ? 'border-[#C74B72] bg-[#FFF0F4] ring-2 ring-[#C74B72]/20 text-[#C74B72] font-semibold'
                          : 'border-[#FAD6DF] bg-[#FFF9FA] hover:border-[#E07A93] text-[#52303D]'
                      }`}
                    >
                      <div className="text-xs font-semibold text-[#2E141D] truncate flex items-center justify-center gap-1">
                        <span>{st.name.split(' ')[0]}</span>
                        {st.id === 'stylist-agatha' && (
                          <span className="text-[9px] text-[#C74B72] font-bold bg-[#FFEBF1] px-1 rounded">Main Top Artist</span>
                        )}
                      </div>
                      <div className="text-[10px] text-[#8A6372] truncate">{st.specialty.split(',')[0]}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Order summary row */}
              <div className="p-4 bg-gradient-to-r from-[#FFF0F4] to-[#FFF7F9] rounded-2xl border border-[#FAD6DF] flex justify-between items-center text-xs">
                <div>
                  <span className="text-[#8A6372] block">Selected Service:</span>
                  <span className="font-semibold text-[#2E141D] text-sm">{effectiveServiceName}</span>
                </div>
                <div className="text-right">
                  <span className="text-[#8A6372] block">Total Service:</span>
                  <span className="font-bold text-[#C74B72] text-sm font-mono">KES {effectivePriceKES.toLocaleString()}</span>
                  <span className="text-[10px] text-[#15803D] block font-mono">Deposit: KES {effectiveDepositKES.toLocaleString()}</span>
                </div>
              </div>

              <button
                onClick={() => setStep(2)}
                className="w-full py-3.5 text-xs sm:text-sm font-semibold text-white rose-gold-gradient-bg rounded-xl shadow-md shadow-[#C74B72]/20 hover:brightness-105 transition-all flex items-center justify-center gap-2"
              >
                <span>Continue to Date & Time</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* STEP 2: Date & Available Slots */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <label className="text-xs font-bold text-[#C74B72] uppercase tracking-wider block mb-2">
                  Pick Your Appointment Date
                </label>
                <input
                  type="date"
                  min={new Date().toISOString().split('T')[0]}
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full bg-[#FFF9FA] border border-[#FAD6DF] rounded-xl px-4 py-3 text-sm text-[#2E141D] focus:outline-none focus:border-[#C74B72] focus:ring-2 focus:ring-[#C74B72]/15"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-[#C74B72] uppercase tracking-wider block mb-2">
                  Select Available Time Slot (Real-Time Rongai Schedule)
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {availableSlots.map((slot: string) => (
                    <button
                      key={slot}
                      onClick={() => setSelectedTime(slot)}
                      className={`py-3 px-3 rounded-xl border text-center text-xs font-mono font-medium transition-all ${
                        selectedTime === slot
                          ? 'border-[#C74B72] bg-[#FFF0F4] text-[#C74B72] font-bold ring-2 ring-[#C74B72]/20 shadow-sm'
                          : 'border-[#FAD6DF] bg-[#FFF9FA] text-[#52303D] hover:border-[#E07A93]'
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-4 bg-gradient-to-r from-[#FFF0F4] to-[#FFF7F9] rounded-2xl border border-[#FAD6DF] text-xs text-[#52303D] space-y-1">
                <div className="flex items-center gap-2 text-[#2E141D] font-medium">
                  <Clock className="w-4 h-4 text-[#C74B72]" />
                  <span>Scheduled for: <strong className="text-[#C74B72] font-bold">{selectedDate} at {selectedTime}</strong></span>
                </div>
                <p className="text-[11px] text-[#8A6372]">
                  Stylist: {currentStylist ? currentStylist.name : 'First Available Master Stylist'} · Location: Ongata Rongai, Maasai Lodge (Magadi Rd)
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setStep(1)}
                  className="px-5 py-3 text-xs font-semibold text-[#52303D] bg-[#FFF5F8] border border-[#FAD6DF] rounded-xl hover:bg-[#FCE1E8]/70 transition-colors"
                >
                  Back
                </button>
                <button
                  onClick={() => setStep(3)}
                  className="flex-1 py-3 text-xs sm:text-sm font-semibold text-white rose-gold-gradient-bg rounded-xl shadow-md shadow-[#C74B72]/20 hover:brightness-105 transition-all flex items-center justify-center gap-2"
                >
                  <span>Continue to Client Details</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Client Details */}
          {step === 3 && (
            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-[#2E141D] block mb-1">
                  Full Name *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-[#C74B72] absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="e.g. Sheila Kerubo"
                    className="w-full bg-[#FFF9FA] border border-[#FAD6DF] rounded-xl pl-9 pr-3 py-2.5 text-xs text-[#2E141D] focus:outline-none focus:border-[#C74B72] focus:ring-2 focus:ring-[#C74B72]/15"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-[#2E141D] block mb-1">
                  Phone / WhatsApp Number (For Appointment Reminders) *
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-[#C74B72] absolute left-3 top-3" />
                  <input
                    type="tel"
                    required
                    value={clientPhone}
                    onChange={(e) => {
                      setClientPhone(e.target.value);
                      setMpesaNumber(e.target.value);
                    }}
                    placeholder="0710 690 669"
                    className="w-full bg-[#FFF9FA] border border-[#FAD6DF] rounded-xl pl-9 pr-3 py-2.5 text-xs text-[#2E141D] focus:outline-none focus:border-[#C74B72] focus:ring-2 focus:ring-[#C74B72]/15"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-[#2E141D] block mb-1">
                  Email Address (Optional for PDF Receipt)
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-[#C74B72] absolute left-3 top-3" />
                  <input
                    type="email"
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    placeholder="sheila@example.com"
                    className="w-full bg-[#FFF9FA] border border-[#FAD6DF] rounded-xl pl-9 pr-3 py-2.5 text-xs text-[#2E141D] focus:outline-none focus:border-[#C74B72] focus:ring-2 focus:ring-[#C74B72]/15"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-[#2E141D] block mb-1">
                  Special Hair / Nail Instructions or Style Notes
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. sensitive scalp, light bead color, specific nail length..."
                  className="w-full bg-[#FFF9FA] border border-[#FAD6DF] rounded-xl px-3 py-2 text-xs text-[#2E141D] focus:outline-none focus:border-[#C74B72] focus:ring-2 focus:ring-[#C74B72]/15"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => setStep(2)}
                  className="px-5 py-3 text-xs font-semibold text-[#52303D] bg-[#FFF5F8] border border-[#FAD6DF] rounded-xl hover:bg-[#FCE1E8]/70 transition-colors"
                >
                  Back
                </button>
                <button
                  onClick={() => {
                    if (!clientName.trim()) {
                      alert('Please provide your name to secure the appointment.');
                      return;
                    }
                    setStep(4);
                  }}
                  className="flex-1 py-3 text-xs sm:text-sm font-semibold text-white rose-gold-gradient-bg rounded-xl shadow-md shadow-[#C74B72]/20 hover:brightness-105 transition-all flex items-center justify-center gap-2"
                >
                  <span>Proceed to M-Pesa Deposit</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: Payment & Deposit Choice */}
          {step === 4 && (
            <div className="space-y-5">
              {/* Optional Deposit Banner */}
              <div className="p-3.5 bg-gradient-to-r from-[#F0FAF3] to-[#E6F8ED] border border-[#A3E0BA] rounded-2xl flex items-center justify-between text-xs text-[#166534]">
                <div className="flex items-center gap-2">
                  <span className="text-base">✨</span>
                  <span className="font-semibold">Deposit is completely optional upon booking!</span>
                </div>
                <span className="text-[11px] font-bold bg-white px-2 py-0.5 rounded-full border border-[#A3E0BA]">
                  Flexible Options
                </span>
              </div>

              {/* Payment Summary Box */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-[#FFF0F4] to-[#FFF7F9] border border-[#FAD6DF] space-y-1.5 text-xs">
                <div className="flex justify-between text-[#8A6372]">
                  <span>Total Service Cost ({effectiveServiceName}):</span>
                  <span className="font-mono text-[#2E141D] font-bold">KES {effectivePriceKES.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-[11px] text-[#8A6372]">
                  <span>Appointment:</span>
                  <span className="text-[#C74B72] font-semibold">{selectedDate} at {selectedTime}</span>
                </div>
              </div>

              {/* Payment Options Selector */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Option A: Pay at Parlour (Deposit Optional) */}
                <button
                  type="button"
                  onClick={() => setDepositChoice('pay_on_arrival')}
                  className={`p-4 rounded-2xl border text-left transition-all relative ${
                    depositChoice === 'pay_on_arrival'
                      ? 'border-[#15803D] bg-[#F2FBF5] ring-2 ring-[#15803D]/20 shadow-sm'
                      : 'border-[#FAD6DF] bg-white hover:bg-[#FFF9FA] text-[#52303D]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-bold text-[#14532D] flex items-center gap-1.5">
                      <span>🏬</span>
                      <span>Pay on Arrival</span>
                    </span>
                    <span className="text-[10px] font-bold bg-[#E8F8EC] text-[#15803D] px-2 py-0.5 rounded-full border border-[#A3E0BA]">
                      Deposit Optional
                    </span>
                  </div>
                  <p className="text-[11px] text-[#4A6B53] leading-relaxed mb-2">
                    Pay full balance in Cash or Lipa na M-Pesa when you arrive at Maasai Lodge parlour.
                  </p>
                  <div className="text-xs font-mono font-bold text-[#14532D]">
                    Due Now: <span className="text-sm font-sans font-extrabold text-[#15803D]">KES 0</span>
                  </div>
                </button>

                {/* Option B: Pay Deposit Now via M-Pesa */}
                <button
                  type="button"
                  onClick={() => setDepositChoice('pay_deposit_now')}
                  className={`p-4 rounded-2xl border text-left transition-all relative ${
                    depositChoice === 'pay_deposit_now'
                      ? 'border-[#C74B72] bg-[#FFF0F4] ring-2 ring-[#C74B72]/20 shadow-sm'
                      : 'border-[#FAD6DF] bg-white hover:bg-[#FFF9FA] text-[#52303D]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-bold text-[#C74B72] flex items-center gap-1.5">
                      <span>📱</span>
                      <span>Pay Deposit Now</span>
                    </span>
                    <span className="text-[10px] font-bold bg-[#FFF0F4] text-[#C74B72] px-2 py-0.5 rounded-full border border-[#FAD6DF]">
                      Till 542109
                    </span>
                  </div>
                  <p className="text-[11px] text-[#7A5866] leading-relaxed mb-2">
                    Pay a partial deposit now via Safaricom STK prompt to reserve priority VIP time slot.
                  </p>
                  <div className="text-xs font-mono font-bold text-[#C74B72]">
                    Deposit: <span className="text-sm font-sans font-extrabold text-[#C74B72]">KES {effectiveDepositKES.toLocaleString()}</span>
                  </div>
                </button>
              </div>

              {/* Sub-view: Pay on Arrival Confirmation */}
              {depositChoice === 'pay_on_arrival' && (
                <div className="p-4 rounded-2xl bg-[#F0FAF3] border border-[#A3E0BA] space-y-3 animate-fadeIn text-xs text-[#166534]">
                  <div className="flex items-center gap-2 font-semibold text-[#14532D]">
                    <CheckCircle2 className="w-4 h-4 text-[#15803D]" />
                    <span>Instant Booking Confirmation (No Deposit Required Today)</span>
                  </div>
                  <p className="text-[11px] leading-relaxed text-[#2C623C]">
                    Your appointment with <strong>{currentStylist ? currentStylist.name : 'Agatha Glamour'}</strong> will be secured immediately. Total balance of <strong>KES {effectivePriceKES.toLocaleString()}</strong> is payable at the salon on <strong>{selectedDate}</strong>.
                  </p>
                  <button
                    onClick={handleBookWithPayOnArrival}
                    className="w-full py-3.5 px-4 text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-[#15803D] to-[#166534] hover:brightness-105 active:scale-98 rounded-xl shadow-md shadow-[#15803D]/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Confirm Booking & Pay at Parlour (KES 0 Today)</span>
                  </button>
                </div>
              )}

              {/* Sub-view: M-Pesa STK Push */}
              {depositChoice === 'pay_deposit_now' && (
                <div className="space-y-4 animate-fadeIn">
                  {/* M-Pesa Official Credentials Card */}
                  <div className="p-4 rounded-2xl bg-[#0F2E1B] border border-[#279B48] space-y-3 text-white shadow-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-2.5 h-2.5 rounded-full bg-[#25D366] animate-pulse" />
                        <span className="font-bold text-xs uppercase tracking-wider text-[#A6E8BA]">
                          Official Lipa na M-Pesa
                        </span>
                      </div>
                      <span className="text-[10px] text-[#86D89F] font-mono">Instant STK Push</span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs text-[#C5E8D2]">
                      <div className="bg-black/30 p-2.5 rounded-xl border border-white/10">
                        <span className="text-[10px] text-[#86D89F] block font-sans">Buy Goods Till No:</span>
                        <span className="font-mono font-bold text-white text-base">542109</span>
                      </div>
                      <div className="bg-black/30 p-2.5 rounded-xl border border-white/10">
                        <span className="text-[10px] text-[#86D89F] block font-sans">Registered Merchant:</span>
                        <span className="font-semibold text-white truncate block">AGATHA GLAMOUR</span>
                      </div>
                    </div>

                    {/* STK Push Input */}
                    <div>
                      <label className="text-[11px] text-[#C5E8D2] block mb-1">
                        Safaricom M-Pesa Mobile Number:
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="tel"
                          value={mpesaNumber}
                          onChange={(e) => setMpesaNumber(e.target.value)}
                          placeholder="0710690669"
                          className="flex-1 bg-black/60 border border-[#2D7A45] rounded-xl px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-[#25D366]"
                        />
                        <button
                          onClick={handleSendStkPush}
                          disabled={isProcessingMpesa}
                          className="px-4 py-2 text-xs font-bold text-black bg-[#25D366] hover:bg-[#20BA59] rounded-xl transition-colors whitespace-nowrap active:scale-95 disabled:opacity-50"
                        >
                          {isProcessingMpesa ? 'Initiating...' : 'Send STK Prompt'}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Simulated STK Push Phone Screen Overlay */}
                  {mpesaPromptVisible && (
                    <div className="p-4 rounded-2xl bg-[#09150B] border-2 border-[#25D366] space-y-3 animate-fadeIn text-center shadow-lg">
                      <div className="text-xs font-mono text-[#86D89F] flex items-center justify-center gap-1.5">
                        <div className="w-2 h-2 rounded-full bg-[#25D366] animate-ping" />
                        <span>[SIMULATED SAFARICOM STK PROMPT ON YOUR PHONE]</span>
                      </div>
                      <div className="bg-black/80 p-3 rounded-xl text-xs font-mono text-white text-left space-y-2 border border-white/10">
                        <p>
                          Do you want to pay <strong>KES {effectiveDepositKES.toLocaleString()}</strong> to <strong>AGATHA GLAMOUR RONGAI</strong> (Till: 542109)?
                        </p>
                        <div className="space-y-1">
                          <label className="text-[10px] text-[#86D89F] block">Enter M-Pesa PIN:</label>
                          <input
                            type="password"
                            maxLength={4}
                            value={mpesaPin}
                            onChange={(e) => setMpesaPin(e.target.value)}
                            placeholder="••••"
                            className="w-32 bg-black border border-[#25D366] rounded-lg px-3 py-1.5 text-center font-mono text-sm tracking-widest text-white focus:outline-none"
                          />
                        </div>
                      </div>
                      <button
                        onClick={handleApprovePin}
                        className="w-full py-2.5 bg-[#25D366] hover:bg-[#20BA59] text-black font-bold text-xs rounded-xl transition-all shadow-md"
                      >
                        Confirm & Complete Booking with Deposit
                      </button>
                    </div>
                  )}
                </div>
              )}

              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => setStep(3)}
                  className="px-5 py-2.5 text-xs font-semibold text-[#52303D] bg-[#FFF5F8] border border-[#FAD6DF] rounded-xl hover:bg-[#FCE1E8]/70 transition-colors"
                >
                  Back
                </button>
              </div>
            </div>
          )}

          {/* STEP 5: Booking Confirmation & Digital Receipt */}
          {step === 5 && confirmedAppointment && (
            <div className="space-y-6 text-center">
              <div className="w-16 h-16 rounded-full bg-[#F0FAF3] border-2 border-[#25D366] flex items-center justify-center mx-auto text-[#25D366] shadow-sm">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div className="space-y-1">
                <span className="text-xs font-bold text-[#C74B72] uppercase tracking-widest">
                  Appointment Scheduled
                </span>
                <h3 className="font-serif text-2xl font-bold text-[#2E141D]">
                  Karibu {confirmedAppointment.clientName}!
                </h3>
                <p className="text-xs text-[#7A5866]">
                  Your glamour session has been locked on our master calendar.
                </p>
              </div>

              {/* Receipt Summary Card */}
              <div className="bg-[#FFF9FA] border border-[#FAD6DF] rounded-2xl p-4.5 text-left text-xs space-y-2.5 font-mono shadow-sm">
                <div className="flex justify-between border-b border-[#FCE1E8] pb-2 font-sans font-bold text-[#2E141D]">
                  <span>Booking Reference:</span>
                  <span className="text-[#C74B72] font-mono">{confirmedAppointment.bookingRef}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#8A6372]">Service:</span>
                  <span className="text-[#2E141D] font-sans font-medium">{confirmedAppointment.serviceName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#8A6372]">Stylist:</span>
                  <span className="text-[#2E141D] font-sans">{confirmedAppointment.stylistName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#8A6372]">Date & Time:</span>
                  <span className="text-[#C74B72] font-bold">{confirmedAppointment.date} at {confirmedAppointment.timeSlot}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#8A6372]">M-Pesa Transaction Ref:</span>
                  <span className="text-[#15803D] font-bold">{confirmedAppointment.mpesaCode}</span>
                </div>
                <div className="flex justify-between border-t border-[#FCE1E8] pt-2">
                  <span className="text-[#8A6372]">Deposit Paid:</span>
                  <span className="text-[#15803D] font-bold">KES {confirmedAppointment.depositPaidKES.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#8A6372]">Balance at Salon:</span>
                  <span className="text-[#2E141D] font-bold">KES {(confirmedAppointment.totalKES - confirmedAppointment.depositPaidKES).toLocaleString()}</span>
                </div>
              </div>

              {/* Automated Reminder Alert */}
              <div className="p-3.5 bg-[#F0FAF3] border border-[#A3E0BA] rounded-2xl text-left text-xs text-[#166534] space-y-1">
                <div className="font-semibold text-[#14532D] flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-[#15803D]" />
                  <span>Automated Reminders Enabled</span>
                </div>
                <p className="text-[11px] text-[#166534]">
                  SMS and WhatsApp reminders will automatically ping {confirmedAppointment.clientPhone} 24 hours and 2 hours prior to your slot.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <button
                  onClick={() => window.print()}
                  className="px-5 py-2.5 text-xs font-semibold text-[#52303D] bg-[#FFF5F8] border border-[#FAD6DF] rounded-xl hover:bg-[#FCE1E8]/70 transition-colors flex items-center gap-1.5"
                >
                  <Printer className="w-3.5 h-3.5 text-[#C74B72]" />
                  <span>Print Receipt</span>
                </button>

                <button
                  onClick={onClose}
                  className="px-7 py-2.5 text-xs font-semibold text-white rose-gold-gradient-bg rounded-xl hover:brightness-105 shadow-md shadow-[#C74B72]/20"
                >
                  Done
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
