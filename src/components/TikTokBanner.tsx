import React, { useState } from 'react';
import { Play, MessageCircle, ExternalLink, Sparkles, Disc3, Volume2, VolumeX } from 'lucide-react';
import { TIKTOK_HANDLE, TIKTOK_URL, WHATSAPP_DIRECT_LINK, INITIAL_TIKTOK_VIDEOS } from '../data/products';
import { TikTokVideoItem } from '../types';

interface TikTokBannerProps {
  videos?: TikTokVideoItem[];
  tiktokHandle?: string;
  tiktokUrl?: string;
  whatsappLink?: string;
}

export const TikTokBanner: React.FC<TikTokBannerProps> = ({
  videos = INITIAL_TIKTOK_VIDEOS,
  tiktokHandle = TIKTOK_HANDLE,
  tiktokUrl = TIKTOK_URL,
  whatsappLink = WHATSAPP_DIRECT_LINK
}) => {
  const [mutedStates, setMutedStates] = useState<Record<string, boolean>>({});

  // Helper to extract TikTok Video ID from various link formats
  const extractTikTokVideoId = (inputUrl: string) => {
    if (!inputUrl) return null;
    // Check standard /video/1234567890
    const match = inputUrl.match(/\/video\/(\d+)/);
    if (match) return match[1];

    // Check data-video-id="1234567890"
    const embedMatch = inputUrl.match(/data-video-id=["'](\d+)["']/);
    if (embedMatch) return embedMatch[1];

    // Check if input is just the numeric ID
    if (/^\d{15,22}$/.test(inputUrl.trim())) {
      return inputUrl.trim();
    }

    return null;
  };

  const toggleSound = (e: React.MouseEvent, videoId: string) => {
    e.stopPropagation();
    e.preventDefault();
    setMutedStates((prev) => ({
      ...prev,
      [videoId]: prev[videoId] === undefined ? false : !prev[videoId]
    }));
  };

  return (
    <section className="py-14 sm:py-20 bg-[#17090D] text-[#FAF5EE] border-b border-[#3D141E] relative overflow-hidden text-right">
      {/* Background ambient lighting */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#581420]/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-[#C59B27]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-12">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold text-[#E5C378] mb-2 px-2.5 py-1 rounded bg-[#581420]/60 border border-[#E5C378]/30">
              <Sparkles className="w-3.5 h-3.5 text-[#E5C378]" />
              <span>فيديوهات حية ومباشرة من تيك توك</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight font-tajawal">
              فيديوهات المتجر على تيك توك <span className="dir-ltr inline-block text-[#E5C378]">@{tiktokHandle}</span>
            </h2>
            <p className="text-xs sm:text-sm text-[#D8BFC4] max-w-xl mt-2 leading-relaxed">
              شاهد مقاطع حية لكواليس سقاية المستكة، وتلبيس خشب العود بالمسك الصافي، وتغليف بوكسات الضيافة.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <a
              href={tiktokUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-white bg-black hover:bg-neutral-900 border border-neutral-700 rounded-lg transition-all shadow-md active:scale-95"
            >
              <span>متابعة حساب تيك توك</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-white bg-[#25D366] hover:bg-[#1EBE5D] rounded-lg transition-all shadow-md active:scale-95"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-white" />
              <span>طلب خاص عبر واتساب</span>
            </a>
          </div>
        </div>

        {/* Real Live TikTok Video Cards Grid: 3 Side-by-Side Horizontally */}
        <div className="grid grid-cols-3 gap-2 sm:gap-4 md:gap-6 max-w-5xl mx-auto">
          {videos.slice(0, 3).map((card, idx) => {
            const tikTokId = extractTikTokVideoId(card.url || card.videoId || '');
            const isMuted = mutedStates[card.id] ?? true;

            return (
              <div
                key={card.id || idx}
                className="group relative rounded-xl bg-[#240F15] border border-[#4A1D27] hover:border-[#E5C378] p-1.5 sm:p-3 transition-all duration-300 overflow-hidden flex flex-col justify-between shadow-lg hover:shadow-xl hover:-translate-y-1"
              >
                {/* Smartphone Video Frame */}
                <div className="relative aspect-[9/14] w-full rounded-lg overflow-hidden mb-2 border border-[#581420]/80 bg-black shadow-inner">
                  
                  {tikTokId ? (
                    /* Pure Single Video Player (No related clips or social feeds) */
                    <div className="w-full h-full relative bg-black overflow-hidden rounded-lg">
                      <iframe
                        src={`https://www.tiktok.com/player/v1/${tikTokId}`}
                        title={card.title}
                        className="w-full h-full border-0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                        scrolling="no"
                      />
                    </div>
                  ) : (
                    /* Real Live HD Video Stream with Direct Click-Through to TikTok */
                    <div
                      onClick={() => window.open(card.url || tiktokUrl, '_blank')}
                      className="relative w-full h-full cursor-pointer overflow-hidden group/vid"
                    >
                      {/* Real Video or Rich Live TikTok Card Preview */}
                      {card.videoSourceUrl ? (
                        <video
                          src={card.videoSourceUrl}
                          autoPlay
                          loop
                          muted={isMuted}
                          playsInline
                          className="w-full h-full object-cover transform transition-transform duration-700 group-hover/vid:scale-105"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-b from-[#351019] via-[#220B11] to-[#120509] flex flex-col items-center justify-center p-3 relative overflow-hidden">
                          {/* Ambient Golden Amber Glow */}
                          <div className="absolute w-32 h-32 rounded-full bg-[#E5C378]/20 blur-2xl" />
                          
                          {/* Subtle Smoke Wisp */}
                          <div className="w-16 h-12 opacity-60 mb-2">
                            <svg viewBox="0 0 60 40" fill="none" className="w-full h-full">
                              <path d="M15 35 C25 20, 20 10, 35 15 C45 20, 40 5, 50 0" stroke="#FAF5EE" strokeWidth="2.5" strokeLinecap="round" filter="blur(1px)" />
                            </svg>
                          </div>

                          {/* TikTok Brand Watermark Badge */}
                          <div className="relative z-10 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/60 border border-[#E5C378]/30 shadow-md">
                            <span className="w-2 h-2 rounded-full bg-[#25F4EE] animate-ping" />
                            <span className="text-[10px] font-bold text-white tracking-wide">TikTok Video</span>
                          </div>
                        </div>
                      )}

                      {/* Dark Vignette Overlay for Readability */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/35 pointer-events-none" />

                      {/* Top Overlay: Category Badge & Sound Control */}
                      <div className="absolute top-3 inset-x-3 flex items-center justify-between z-20">
                        <span className="text-[10px] font-extrabold px-2.5 py-1 bg-[#581420]/90 text-[#FAF5EE] rounded-sm shadow-md border border-[#E5C378]/40">
                          {card.badge || 'فيديو حي'}
                        </span>
                        
                        <button
                          type="button"
                          onClick={(e) => toggleSound(e, card.id)}
                          className="p-1.5 rounded-full bg-black/60 text-white hover:text-[#E5C378] backdrop-blur-xs transition-colors"
                          title={isMuted ? 'تشغيل الصوت' : 'كتم الصوت'}
                        >
                          {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-[#E5C378]" />}
                        </button>
                      </div>

                      {/* Central Floating TikTok Play Badge */}
                      <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
                        <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-black/45 backdrop-blur-md border border-white/60 flex items-center justify-center text-white shadow-xl transition-all duration-300 group-hover/vid:scale-110 group-hover/vid:bg-[#581420]">
                          <Play className="w-4 h-4 sm:w-5 sm:h-5 fill-white translate-x-0.5" />
                        </div>
                      </div>

                      {/* Bottom Bar: Sound track name & Views counter */}
                      <div className="absolute bottom-2 inset-x-2.5 z-20 flex items-center justify-between text-[10px] text-[#FAF5EE]">
                        <div className="flex items-center gap-1 text-[9px] text-[#E5C378] font-medium truncate max-w-[65%]">
                          <Disc3 className="w-3 h-3 animate-spin shrink-0" />
                          <span className="truncate">كيان العود</span>
                        </div>
                        <span className="font-mono text-[9px] font-bold text-neutral-200 bg-black/60 px-1.5 py-0.5 rounded backdrop-blur-xs">
                          {card.views || '45K'}
                        </span>
                      </div>
                    </div>
                  )}

                </div>

                {/* Video Title & Actions */}
                <div className="pt-1 text-right flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[8px] sm:text-[10px] font-bold text-[#E5C378] block mb-0.5">
                      {card.category || 'مستكة وعود فاخر'}
                    </span>
                    <h3 className="text-[11px] sm:text-xs md:text-sm font-bold text-[#FAF5EE] group-hover:text-[#E5C378] transition-colors leading-snug line-clamp-2 font-tajawal min-h-[28px] sm:min-h-[34px]">
                      {card.title}
                    </h3>
                  </div>
                  
                  <div className="mt-2 pt-2 border-t border-[#4A242E] flex items-center justify-between text-[10px] text-[#C49FA7]">
                    <a
                      href={card.url || tiktokUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-white hover:text-[#E5C378] font-bold transition-colors cursor-pointer bg-white/10 hover:bg-white/20 px-1.5 sm:px-2.5 py-1 rounded text-[9px] sm:text-[11px]"
                    >
                      <Play className="w-2.5 h-2.5 fill-current" />
                      <span>مشاهدة</span>
                    </a>
                    <span className="dir-ltr text-[8px] sm:text-[10px] font-bold text-[#E5C378] truncate max-w-[45%]">@{tiktokHandle}</span>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
