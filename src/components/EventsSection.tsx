import React, { useState } from 'react';
import { Language, CommunityEvent } from '../types';
import { translations } from '../data/translations';
import { EVENTS_DATA } from '../data/mockData';
import { Calendar, MapPin, Clock, Ticket, CheckCircle2, X, Heart } from 'lucide-react';

interface EventsSectionProps {
  language: Language;
}

export const EventsSection: React.FC<EventsSectionProps> = ({ language }) => {
  const [selectedEvent, setSelectedEvent] = useState<CommunityEvent | null>(null);
  const [rsvpSuccess, setRsvpSuccess] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const t = translations[language];

  const handleOpenRsvp = (event: CommunityEvent) => {
    setSelectedEvent(event);
    setRsvpSuccess(false);
  };

  const handleConfirmRsvp = (e: React.FormEvent) => {
    e.preventDefault();
    setRsvpSuccess(true);
    setTimeout(() => {
      setSelectedEvent(null);
      setRsvpSuccess(false);
      setName('');
      setPhone('');
    }, 3000);
  };

  return (
    <section id="events" className="py-16 lg:py-24 bg-[#FFF9FA] border-b border-[#FCE1E8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#C74B72] tracking-widest uppercase bg-white px-3.5 py-1.5 rounded-full border border-[#F8D2DC] shadow-xs">
            <Heart className="w-3.5 h-3.5 fill-[#E07A93] text-[#E07A93]" />
            <span>Rongai Beauty Community</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#2E141D]">
            {t.eventsTitle}
          </h2>
          <p className="text-sm text-[#7A4D5C]">
            {t.eventsSub}
          </p>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {EVENTS_DATA.map((event: CommunityEvent) => {
            const displayTitle = language === 'sw' ? event.titleSw : event.title;
            const displayDesc = language === 'sw' ? event.descriptionSw : event.description;

            return (
              <div
                key={event.id}
                className="bg-white border border-[#F8DCE2] rounded-3xl overflow-hidden hover:border-[#E07A93] transition-all duration-300 flex flex-col justify-between shadow-[0_10px_30px_-5px_rgba(224,122,147,0.1)] hover:shadow-[0_15px_40px_-5px_rgba(224,122,147,0.18)]"
              >
                <div>
                  <div className="relative aspect-[16/10] overflow-hidden bg-[#FCECEF]">
                    <img
                      src={event.image}
                      alt={displayTitle}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#2B0E17]/80 via-transparent to-transparent" />

                    <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-bold text-[#C74B72] border border-[#F8D2DC] uppercase tracking-wider shadow-xs">
                      {event.category}
                    </div>

                    <div className="absolute bottom-3 left-3 text-xs font-medium text-white flex items-center gap-1.5 bg-black/50 px-2.5 py-1 rounded-full backdrop-blur-sm">
                      <Clock className="w-3.5 h-3.5 text-[#F5BDCD]" />
                      <span>{event.time}</span>
                    </div>
                  </div>

                  <div className="p-6 space-y-4">
                    <div>
                      <div className="text-xs font-bold text-[#C74B72] uppercase tracking-wider mb-1">
                        {event.date}
                      </div>
                      <h3 className="font-serif text-lg font-bold text-[#2E141D] leading-snug">
                        {displayTitle}
                      </h3>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-[#6B4653]">
                      <MapPin className="w-3.5 h-3.5 text-[#C74B72] shrink-0" />
                      <span className="truncate">{event.location}</span>
                    </div>

                    <p className="text-xs text-[#7A4D5C] leading-relaxed line-clamp-3">
                      {displayDesc}
                    </p>

                    <div className="pt-3 border-t border-[#F8DCE2] flex items-center justify-between text-xs">
                      <div>
                        <span className="text-[10px] text-[#9E6577] font-semibold block">Entry</span>
                        <span className="font-bold text-[#C74B72] font-mono text-sm">
                          {event.priceKES === 0 ? 'Free Entry' : `KES ${event.priceKES.toLocaleString()}`}
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] text-[#9E6577] font-semibold block">Availability</span>
                        <span className="text-[#1E7E34] font-mono font-bold bg-[#E8F8EC] px-2 py-0.5 rounded-full">
                          {event.spotsLeft} spots left
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <button
                    onClick={() => handleOpenRsvp(event)}
                    className="w-full py-2.5 px-4 text-xs font-semibold text-white bg-gradient-to-r from-[#F08CA5] via-[#E07A93] to-[#C74B72] rounded-xl hover:brightness-105 shadow-md shadow-[#E07A93]/20 transition-all flex items-center justify-center gap-1.5"
                  >
                    <Ticket className="w-3.5 h-3.5 text-white" />
                    <span>{t.rsvpEvent}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* RSVP Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative w-full max-w-md bg-white border border-[#F8D2DC] rounded-3xl shadow-2xl p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-[#F8D2DC] pb-4">
              <div>
                <span className="text-[10px] font-bold text-[#C74B72] uppercase tracking-wider flex items-center gap-1">
                  <Heart className="w-3 h-3 fill-[#E07A93] text-[#E07A93]" />
                  <span>Event Registration</span>
                </span>
                <h3 className="font-serif text-lg font-bold text-[#2E141D]">
                  {selectedEvent.title}
                </h3>
                <p className="text-xs text-[#8C5A69]">{selectedEvent.date} · {selectedEvent.time}</p>
              </div>
              <button
                onClick={() => setSelectedEvent(null)}
                className="p-1 text-[#8C5A69] hover:text-[#2E141D]"
                aria-label="Close RSVP modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {rsvpSuccess ? (
              <div className="p-6 text-center space-y-3 bg-[#E8F8EC] border border-[#BDE8C8] rounded-2xl text-[#1E7E34]">
                <CheckCircle2 className="w-10 h-10 text-[#25D366] mx-auto" />
                <h4 className="font-serif text-lg font-bold text-[#1E7E34]">Spot Reserved!</h4>
                <p className="text-xs text-[#2B6E3C]">
                  Your pass has been secured. A confirmation SMS with directions to Maasai Lodge, Ongata Rongai has been queued to {phone}.
                </p>
              </div>
            ) : (
              <form onSubmit={handleConfirmRsvp} className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-[#52303D] block mb-1">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Carol Wambui"
                    className="w-full bg-[#FFF5F8] border border-[#F8D2DC] rounded-xl px-3.5 py-2.5 text-xs text-[#2E141D] focus:outline-none focus:border-[#C74B72]"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#52303D] block mb-1">
                    M-Pesa / Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="0712 345 678"
                    className="w-full bg-[#FFF5F8] border border-[#F8D2DC] rounded-xl px-3.5 py-2.5 text-xs text-[#2E141D] focus:outline-none focus:border-[#C74B72]"
                  />
                </div>

                <div className="p-3.5 bg-[#FFF5F8] rounded-2xl border border-[#FAD6DF] text-xs text-[#52303D] space-y-1">
                  <div className="flex justify-between">
                    <span>Admission Fee:</span>
                    <span className="font-bold text-[#C74B72]">
                      {selectedEvent.priceKES === 0 ? 'FREE' : `KES ${selectedEvent.priceKES.toLocaleString()}`}
                    </span>
                  </div>
                  <div className="flex justify-between text-[11px]">
                    <span className="text-[#8C5A69]">Venue:</span>
                    <span className="text-[#2E141D] font-medium">{selectedEvent.location}</span>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 px-4 text-xs font-semibold text-white bg-gradient-to-r from-[#F08CA5] via-[#E07A93] to-[#C74B72] rounded-xl hover:brightness-105 transition-all shadow-md shadow-[#E07A93]/20"
                >
                  Confirm Reservation Pass
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
