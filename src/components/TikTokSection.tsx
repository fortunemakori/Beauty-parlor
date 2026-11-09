import React, { useState } from 'react';
import { Language, TikTokPost } from '../types';
import { translations } from '../data/translations';
import { BRAND_ASSETS, TIKTOK_POSTS_DATA } from '../data/mockData';
import { Play, Pause, Heart, MessageCircle, Share2, Music, ExternalLink, Sparkles, CheckCircle2, Instagram } from 'lucide-react';

interface TikTokSectionProps {
  language: Language;
  onBookService: (serviceId: string) => void;
}

export const TikTokSection: React.FC<TikTokSectionProps> = ({
  language,
  onBookService,
}) => {
  const t = translations[language];
  const [playingVideoId, setPlayingVideoId] = useState<string | null>(TIKTOK_POSTS_DATA[0].id);
  const [likedPosts, setLikedPosts] = useState<Record<string, boolean>>({});

  const toggleLike = (id: string) => {
    setLikedPosts(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section id="tiktok-hub" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* TikTok Profile Header Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#FAD6DF] shadow-[0_15px_40px_rgba(244,114,152,0.12)] mb-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Avatar & Bio */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-4">
            <div className="relative">
              <div className="w-20 h-20 rounded-full p-1 bg-gradient-to-tr from-[#FE2C55] via-[#25F4EE] to-[#000000] shadow-md">
                <img
                  src={BRAND_ASSETS.logo}
                  alt="Agatha Glamour TikTok Logo"
                  className="w-full h-full rounded-full object-contain bg-white p-1"
                />
              </div>
              <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[#FE2C55] text-white flex items-center justify-center text-xs font-bold shadow-sm">
                ♪
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#2E141D]">
                  Agatha Glamour Salon
                </h3>
                <span className="p-0.5 rounded-full bg-[#20D5EC] text-white">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </span>
              </div>
              <p className="text-xs font-mono font-semibold text-[#FE2C55]">
                {BRAND_ASSETS.tiktok}
              </p>
              <p className="text-xs text-[#7A5866] max-w-md">
                {language === 'sw'
                  ? 'Saluni ya Kifahari Ongata Rongai, Maasai Lodge. Kusuka nywele, kucha za kisasa & bridal glam ✨ Karibu sana!'
                  : 'Premier Glamour Salon in Ongata Rongai, Maasai Lodge. Signature Boho Braids, Acrylic Sculpted Nails & Bridal Beats ✨'}
              </p>
            </div>
          </div>

          {/* TikTok Stats & Follow CTA */}
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="flex items-center gap-6 text-center">
              <div>
                <span className="font-serif text-lg font-bold text-[#2E141D] block">48.5K</span>
                <span className="text-[10px] uppercase tracking-wider text-[#8A6372]">Followers</span>
              </div>
              <div className="w-px h-8 bg-[#FAD6DF]" />
              <div>
                <span className="font-serif text-lg font-bold text-[#2E141D] block">920.4K</span>
                <span className="text-[10px] uppercase tracking-wider text-[#8A6372]">Likes</span>
              </div>
              <div className="w-px h-8 bg-[#FAD6DF]" />
              <div>
                <span className="font-serif text-lg font-bold text-[#2E141D] block">Maasai Lodge</span>
                <span className="text-[10px] uppercase tracking-wider text-[#8A6372]">Rongai HQ</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href={BRAND_ASSETS.tiktokUrl}
                target="_blank"
                rel="noreferrer"
                className="px-5 py-3 rounded-2xl text-xs font-bold text-white bg-black hover:bg-[#FE2C55] transition-colors shadow-md flex items-center gap-2"
              >
                <span>Follow on TikTok</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <a
                href={BRAND_ASSETS.instagramUrl}
                target="_blank"
                rel="noreferrer"
                className="px-5 py-3 rounded-2xl text-xs font-bold text-white bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F77737] hover:opacity-90 transition-opacity shadow-md flex items-center gap-2"
              >
                <Instagram className="w-3.5 h-3.5 text-white" />
                <span>Instagram</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Section Title */}
      <div className="text-center max-w-2xl mx-auto mb-8 space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFF0F4] border border-[#FAD6DF] text-xs font-semibold text-[#C74B72]">
          <Sparkles className="w-3.5 h-3.5 text-[#C74B72]" />
          <span>{t.tiktokTitle}</span>
        </div>
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#2E141D]">
          {language === 'sw' ? 'Video Zinazovuma za Urembo Saluni Kwetu' : 'Viral Salon Transformations & Reels'}
        </h2>
        <p className="text-xs sm:text-sm text-[#7A5866]">
          {t.tiktokSub}
        </p>
      </div>

      {/* Video Reels Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {TIKTOK_POSTS_DATA.map((post: TikTokPost) => {
          const isPlaying = playingVideoId === post.id;
          const isLiked = !!likedPosts[post.id];

          return (
            <div
              key={post.id}
              className="relative rounded-3xl overflow-hidden bg-black aspect-[9/16] shadow-[0_15px_35px_rgba(244,114,152,0.15)] border border-[#FAD6DF] group flex flex-col justify-between p-4"
            >
              {/* Background Thumbnail with simulated video motion */}
              <img
                src={post.videoThumb}
                alt={post.caption}
                referrerPolicy="no-referrer"
                className={`absolute inset-0 w-full h-full object-cover transition-transform duration-700 ${
                  isPlaying ? 'scale-105' : 'group-hover:scale-105'
                }`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-black/40" />

              {/* Top Bar: Handle & TikTok watermark */}
              <div className="relative z-10 flex items-center justify-between text-white text-xs">
                <span className="font-mono text-[11px] font-semibold bg-black/40 backdrop-blur-sm px-2.5 py-1 rounded-full border border-white/10">
                  {post.handle}
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#FE2C55] text-white">
                  TikTok LIVE
                </span>
              </div>

              {/* Center Play Button Overlay */}
              <div className="relative z-10 self-center my-auto">
                <button
                  onClick={() => setPlayingVideoId(isPlaying ? null : post.id)}
                  className="w-14 h-14 rounded-full bg-white/25 hover:bg-white/40 backdrop-blur-md border border-white/50 text-white flex items-center justify-center transition-transform hover:scale-110 shadow-lg cursor-pointer"
                  aria-label={isPlaying ? 'Pause video' : 'Play video'}
                >
                  {isPlaying ? (
                    <Pause className="w-6 h-6 fill-white" />
                  ) : (
                    <Play className="w-6 h-6 fill-white ml-0.5" />
                  )}
                </button>
              </div>

              {/* Right Side Social Interactions Bar */}
              <div className="absolute right-3 bottom-24 z-10 flex flex-col items-center gap-3.5 text-white">
                <button
                  onClick={() => toggleLike(post.id)}
                  className="flex flex-col items-center gap-1 group/btn cursor-pointer"
                  aria-label="Like video"
                >
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center backdrop-blur-md transition-all ${
                    isLiked ? 'bg-[#FE2C55] text-white scale-110' : 'bg-black/40 text-white hover:bg-black/60'
                  }`}>
                    <Heart className={`w-4 h-4 ${isLiked ? 'fill-white' : ''}`} />
                  </div>
                  <span className="text-[10px] font-bold drop-shadow">{post.likes}</span>
                </button>

                <div className="flex flex-col items-center gap-1">
                  <div className="w-9 h-9 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white">
                    <MessageCircle className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-bold drop-shadow">{post.comments}</span>
                </div>

                <div className="flex flex-col items-center gap-1">
                  <div className="w-9 h-9 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white">
                    <Share2 className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-bold drop-shadow">{post.shares}</span>
                </div>
              </div>

              {/* Bottom Details & Direct Book Look CTA */}
              <div className="relative z-10 space-y-2 text-white pr-12">
                <p className="text-[11px] leading-tight line-clamp-2 drop-shadow font-medium">
                  {post.caption}
                </p>

                {/* Audio track marquee simulation */}
                <div className="flex items-center gap-1.5 text-[10px] text-white/80 font-mono truncate">
                  <Music className="w-3 h-3 text-[#25F4EE] shrink-0 animate-spin" />
                  <span className="truncate">{post.audioName}</span>
                </div>

                {/* Direct 1-Click Salon Booking CTA */}
                <button
                  onClick={() => onBookService(post.serviceId)}
                  className="w-full mt-2 py-2.5 px-3 rounded-xl text-xs font-bold text-white rose-gold-gradient-bg hover:brightness-110 shadow-lg transition-transform active:scale-95 flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Book This Look</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
