import React, { useState } from 'react';
import { Language, Appointment } from './types';
import { INITIAL_APPOINTMENTS, BRAND_ASSETS } from './data/mockData';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { QuickSalonAccess } from './components/QuickSalonAccess';
import { TikTokSection } from './components/TikTokSection';
import { BeforeAfterSlider } from './components/BeforeAfterSlider';
import { ShadeFinder } from './components/ShadeFinder';
import { StylistDirectory } from './components/StylistDirectory';
import { EventsSection } from './components/EventsSection';
import { ReviewsSection } from './components/ReviewsSection';
import { ContactLocation } from './components/ContactLocation';
import { Footer } from './components/Footer';
import { KidsSection } from './components/KidsSection';
import { BookingModal } from './components/BookingModal';
import { ClientDashboardModal } from './components/ClientDashboardModal';
import { Sparkles, Heart, Star, Calendar, Phone, MessageCircle, Instagram } from 'lucide-react';
import {
  saveAppointmentToFirestore,
  updateAppointmentInFirestore,
  subscribeToAppointments,
} from './lib/firebase';
import {
  saveAppointmentToSupabase,
  updateAppointmentInSupabase,
  subscribeToSupabaseAppointments,
  isSupabaseConfigured,
} from './lib/supabase';

export default function App() {
  const [language, setLanguage] = useState<Language>('en');
  const [appointments, setAppointments] = useState<Appointment[]>(INITIAL_APPOINTMENTS);

  // Synchronize appointments with Firestore and Supabase in real-time
  React.useEffect(() => {
    // 1. Cloud Firestore Real-time Listener
    const unsubscribeFirestore = subscribeToAppointments(
      (firestoreAppointments) => {
        if (firestoreAppointments && firestoreAppointments.length > 0) {
          const firestoreIds = new Set(firestoreAppointments.map((a) => a.id));
          const nonDuplicatedInitial = INITIAL_APPOINTMENTS.filter((a) => !firestoreIds.has(a.id));
          setAppointments([...firestoreAppointments, ...nonDuplicatedInitial]);
        }
      },
      (err) => {
        console.warn('Realtime appointments subscription fallback:', err);
      }
    );

    // 2. Supabase Real-time Listener (when configured)
    let unsubscribeSupabase = () => {};
    if (isSupabaseConfigured()) {
      unsubscribeSupabase = subscribeToSupabaseAppointments((supabaseAppointments) => {
        if (supabaseAppointments && supabaseAppointments.length > 0) {
          const supabaseIds = new Set(supabaseAppointments.map((a) => a.id));
          const nonDuplicatedInitial = INITIAL_APPOINTMENTS.filter((a) => !supabaseIds.has(a.id));
          setAppointments([...supabaseAppointments, ...nonDuplicatedInitial]);
        }
      });
    }

    return () => {
      unsubscribeFirestore();
      unsubscribeSupabase();
    };
  }, []);

  // Modals state
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [preSelectedServiceId, setPreSelectedServiceId] = useState<string | undefined>();
  const [preSelectedStylistId, setPreSelectedStylistId] = useState<string | undefined>();
  const [bookingInitialNotes, setBookingInitialNotes] = useState<string>('');

  const [dashboardModalOpen, setDashboardModalOpen] = useState(false);

  // Handlers
  const handleOpenBooking = (serviceId?: string, stylistId?: string, notes?: string) => {
    setPreSelectedServiceId(serviceId);
    setPreSelectedStylistId(stylistId);
    setBookingInitialNotes(notes || '');
    setBookingModalOpen(true);
  };

  const handleBookingConfirmed = async (newAppointment: Appointment) => {
    // Optimistic UI update
    setAppointments([newAppointment, ...appointments]);

    // Persist to Cloud Firestore database
    try {
      await saveAppointmentToFirestore(newAppointment);
    } catch (e) {
      console.error('Failed to sync appointment to Firestore:', e);
    }

    // Persist to Supabase if configured
    if (isSupabaseConfigured()) {
      try {
        await saveAppointmentToSupabase(newAppointment);
      } catch (e) {
        console.error('Failed to sync appointment to Supabase:', e);
      }
    }
  };

  const handleCancelAppointment = async (id: string) => {
    // Optimistic UI update
    setAppointments(appointments.map(apt => 
      apt.id === id ? { ...apt, status: 'cancelled' as const } : apt
    ));

    // Update in Firestore
    try {
      await updateAppointmentInFirestore(id, { status: 'cancelled' });
    } catch (e) {
      console.error('Failed to update appointment cancellation in Firestore:', e);
    }

    // Update in Supabase if configured
    if (isSupabaseConfigured()) {
      try {
        await updateAppointmentInSupabase(id, { status: 'cancelled' });
      } catch (e) {
        console.error('Failed to update appointment cancellation in Supabase:', e);
      }
    }
  };

  const handleBookMatchedLook = (details: { serviceId: string; notes: string }) => {
    handleOpenBooking(details.serviceId, undefined, details.notes);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFF0F5] via-[#FFF8FA] to-[#FFEBF1] text-[#2E141D] flex flex-col font-sans selection:bg-[#F3B6C6] selection:text-[#4A1525]">
      {/* Navigation */}
      <Navbar
        language={language}
        onLanguageChange={setLanguage}
        onOpenBooking={() => handleOpenBooking()}
        onOpenDashboard={() => setDashboardModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          language={language}
          onOpenBooking={() => handleOpenBooking()}
          onOpenShadeFinder={() => {
            document.getElementById('shade-finder')?.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* 1-Click Simple Salon Services Access */}
        <QuickSalonAccess
          language={language}
          onBookService={(serviceId: string) => handleOpenBooking(serviceId)}
        />

        {/* Meet the Parlour's Main Top Artist: Agatha */}
        <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#FAD6DF] shadow-[0_15px_40px_rgba(244,114,152,0.12)] relative overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              {/* Agatha Portrait & Rate Card Preview */}
              <div className="md:col-span-5 relative space-y-4">
                <div className="relative aspect-[3/4] rounded-3xl overflow-hidden border-2 border-[#FAD6DF] shadow-md bg-[#FFF0F4] group">
                  <img
                    src={BRAND_ASSETS.agathaProfile}
                    alt="Agatha - Parlour's Main Top Artist"
                    className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  
                  {/* Top Instagram shortcut */}
                  <a
                    href={BRAND_ASSETS.instagramUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="absolute top-3.5 right-3.5 px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-[#FAD6DF] text-xs font-bold text-[#C74B72] hover:bg-[#C74B72] hover:text-white transition-all shadow-sm flex items-center gap-1.5"
                  >
                    <Instagram className="w-3.5 h-3.5" />
                    <span>{BRAND_ASSETS.instagramHandle}</span>
                  </a>

                  {/* Bottom title pill */}
                  <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md rounded-2xl p-3 border border-[#FCE1E8] shadow-sm text-center">
                    <span className="font-serif text-lg font-bold text-[#2E141D] block">Agatha</span>
                    <span className="text-xs text-[#C74B72] font-semibold">Parlour's Main Top Beauty Artist</span>
                  </div>
                </div>

                {/* Actual Uploaded Rate Card Image Badge */}
                <div className="bg-[#FFF9FA] border border-[#FAD6DF] rounded-2xl p-3 flex items-center gap-3 shadow-xs">
                  <img
                    src={BRAND_ASSETS.agathaPricingCard}
                    alt="Agatha Official Price Card"
                    className="w-20 h-14 object-cover rounded-xl border border-[#FAD6DF] shadow-xs"
                  />
                  <div className="text-left text-xs">
                    <span className="font-bold text-[#C74B72] block uppercase tracking-wider text-[10px]">
                      Verified Rate Card
                    </span>
                    <span className="text-[#2E141D] font-medium block">
                      Personal Ksh 10K · Pro Ksh 20K
                    </span>
                    <span className="text-[11px] text-[#15803D] font-mono font-bold">
                      0710.690.669
                    </span>
                  </div>
                </div>
              </div>

              {/* Story, Official Rates & Welcome */}
              <div className="md:col-span-7 space-y-4">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFF0F4] border border-[#FAD6DF] text-xs font-bold text-[#C74B72]">
                  <Heart className="w-3.5 h-3.5 fill-[#E07A93] text-[#E07A93]" />
                  <span>Meet The Main Top Artist Behind The Glamour</span>
                </div>

                <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#2E141D] leading-tight">
                  {language === 'sw'
                    ? 'Karibu Agatha Glamour Ongata Rongai'
                    : 'A Warm Welcome to Agatha Glamour Maasai Lodge'}
                </h2>

                <p className="text-sm text-[#7A4D5C] leading-relaxed">
                  {language === 'sw'
                    ? '"Kama msanii mkuu wa saluni, nia yangu imekuwa kuunda nafasi salama, ya kifahari na yenye amani kwa wanawake na watoto wote wa Ongata Rongai. Kuanzia ususi usio na maumivu wa kichwa hadi kucha zilizochongwa kwa ustadi na makeup inayodumu siku nzima, kila mteja ni kama familia."'
                    : '"As the parlour\'s main top artist, my mission is to provide every client with a pampered, royal experience right here at Maasai Lodge, Ongata Rongai. Whether you are stepping in for tension-free Bohemian braids, custom stiletto nail art, little princess hair, or signature makeup, you will leave feeling renewed and radiant."'}
                </p>

                {/* Official Makeup Rates Card */}
                <div className="p-4.5 rounded-2xl bg-gradient-to-r from-[#FFF5F8] to-[#FFF0F4] border-2 border-[#FAD6DF] space-y-2.5 shadow-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#C74B72] uppercase tracking-wider">
                      Official Agatha Glamour Rates
                    </span>
                    <span className="text-[11px] text-[#15803D] font-bold bg-[#F0FAF3] px-2.5 py-0.5 rounded-full border border-[#A3E0BA]">
                      Available Now
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                    <div className="bg-white p-3.5 rounded-xl border border-[#FAD6DF]">
                      <span className="text-[11px] text-[#7A4D5C] block font-medium">Personal Makeup</span>
                      <span className="font-serif text-2xl font-bold text-[#2E141D] font-mono">Ksh. 10,000</span>
                      <span className="text-[10px] text-[#8C5A69] block mt-0.5">Birthdays, dinners & soft glam</span>
                    </div>

                    <div className="bg-white p-3.5 rounded-xl border border-[#FAD6DF]">
                      <span className="text-[11px] text-[#7A4D5C] block font-medium">Professional Makeup</span>
                      <span className="font-serif text-2xl font-bold text-[#C74B72] font-mono">Ksh. 20,000</span>
                      <span className="text-[10px] text-[#8C5A69] block mt-0.5">Editorial, camera & full glamour</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-2 pt-1 text-xs">
                    <span className="text-[#2E141D] font-semibold flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-[#C74B72]" />
                      <span>Call or WhatsApp me Now to Book: <strong className="font-mono text-[#C74B72]">0710.690.669</strong></span>
                    </span>

                    <a
                      href="https://wa.me/254710690669?text=Hello%20Agatha,%20I%20would%20like%20to%20book%20a%20Personal%20or%20Professional%20Makeup%20session%20with%20you!"
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#15803D] hover:underline"
                    >
                      <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
                      <span>Chat on WhatsApp</span>
                    </a>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-1">
                  <div className="p-3 rounded-2xl bg-[#FFF9FA] border border-[#FAD6DF] text-center">
                    <span className="font-serif text-xl font-bold text-[#C74B72] block">8+</span>
                    <span className="text-[11px] text-[#7A4D5C]">Years Mastery</span>
                  </div>
                  <div className="p-3 rounded-2xl bg-[#FFF9FA] border border-[#FAD6DF] text-center">
                    <span className="font-serif text-xl font-bold text-[#C74B72] block">4,500+</span>
                    <span className="text-[11px] text-[#7A4D5C]">Clients Styled</span>
                  </div>
                  <div className="p-3 rounded-2xl bg-[#FFF9FA] border border-[#FAD6DF] text-center">
                    <span className="font-serif text-xl font-bold text-[#C74B72] block">4.99 ★</span>
                    <span className="text-[11px] text-[#7A4D5C]">Client Rating</span>
                  </div>
                </div>

                <div className="pt-2 flex flex-wrap gap-3">
                  <button
                    onClick={() => handleOpenBooking('srv-makeup', 'stylist-agatha')}
                    className="px-6 py-3 rounded-2xl text-xs font-bold text-white rose-gold-gradient-bg hover:brightness-105 shadow-md shadow-[#C74B72]/20 transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>Book Makeup Session with Agatha</span>
                  </button>

                  <a
                    href="tel:0710690669"
                    className="px-4 py-3 rounded-2xl text-xs font-bold text-[#2E141D] bg-white border border-[#FAD6DF] hover:border-[#E07A93] hover:bg-[#FFF5F8] transition-all flex items-center gap-2"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#C74B72]" />
                    <span>Call 0710.690.669</span>
                  </a>

                  <a
                    href={BRAND_ASSETS.instagramUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-3 rounded-2xl text-xs font-bold text-white bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F77737] hover:opacity-90 transition-all flex items-center gap-2 shadow-xs"
                  >
                    <Instagram className="w-3.5 h-3.5 text-white" />
                    <span>{BRAND_ASSETS.instagramHandle}</span>
                  </a>

                  <a
                    href="#tiktok-hub"
                    className="px-4 py-3 rounded-2xl text-xs font-bold text-[#2E141D] bg-white border border-[#FAD6DF] hover:border-[#E07A93] hover:bg-[#FFF5F8] transition-all flex items-center gap-2"
                  >
                    <span>Agatha on TikTok</span>
                    <span className="text-[#FE2C55]">♪</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Viral TikTok Hub for Salon Transformations */}
        <TikTokSection
          language={language}
          onBookService={(serviceId: string) => handleOpenBooking(serviceId)}
        />

        {/* Dedicated Kids Section: Painless Braiding, Mini Mani & Gentle Hair Care */}
        <KidsSection
          language={language}
          onBookService={(serviceId: string) => handleOpenBooking(serviceId)}
        />

        {/* Interactive Before & After Visual Slider */}
        <BeforeAfterSlider
          language={language}
          onBookService={(serviceId?: string) => handleOpenBooking(serviceId)}
        />

        {/* Interactive Virtual Shade & Style Finder */}
        <ShadeFinder
          language={language}
          onBookMatchedLook={handleBookMatchedLook}
        />

        {/* Stylist Profiles & Real-Time Availability */}
        <StylistDirectory
          language={language}
          onBookWithStylist={(stylistId: string) => handleOpenBooking(undefined, stylistId)}
        />

        {/* Rongai Community Events & Beauty Mixers */}
        <EventsSection
          language={language}
        />

        {/* Customer Reviews & Social Proof */}
        <ReviewsSection
          language={language}
        />

        {/* Location Map, Phone & Interactive FAQ */}
        <ContactLocation
          language={language}
        />
      </main>

      {/* Floating Salon Booking Shortcut */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => handleOpenBooking()}
          className="group px-5 py-3.5 rounded-full text-xs sm:text-sm font-bold text-white rose-gold-gradient-bg shadow-2xl shadow-[#C74B72]/40 hover:scale-105 active:scale-95 transition-all flex items-center gap-2.5 border-2 border-white/60 cursor-pointer"
        >
          <Sparkles className="w-4 h-4 text-white group-hover:rotate-12 transition-transform" />
          <span>Book Salon (1-Click)</span>
        </button>
      </div>

      {/* Footer */}
      <Footer />

      {/* Modals & Portals */}
      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        preSelectedServiceId={preSelectedServiceId}
        preSelectedStylistId={preSelectedStylistId}
        initialNotes={bookingInitialNotes}
        onBookingConfirmed={handleBookingConfirmed}
        language={language}
      />

      <ClientDashboardModal
        isOpen={dashboardModalOpen}
        onClose={() => setDashboardModalOpen(false)}
        appointments={appointments}
        onCancelAppointment={handleCancelAppointment}
        language={language}
      />
    </div>
  );
}
