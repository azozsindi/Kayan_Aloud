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

        {/* Real Live TikTok Video Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {videos.map((card, idx) => {
            const tikTokId = extractTikTokVideoId(card.url || card.videoId || '');
            const isMuted = mutedStates[card.id] ?? true;

            return (
              <div
                key={card.id || idx}
                className="group relative rounded-2xl bg-[#240F15] border-2 border-[#4A1D27] hover:border-[#E5C378] p-3 sm:p-4 transition-all duration-300 overflow-hidden flex flex-col justify-between shadow-xl hover:shadow-2xl hover:-translate-y-1"
              >
                {/* Smartphone Video Frame */}
                <div className="relative aspect-[9/14] sm:aspect-[4/5] lg:aspect-[9/13] w-full rounded-xl overflow-hidden mb-3.5 border border-[#581420]/80 bg-black shadow-inner">
                  
                  {tikTokId ? (
                    /* Real Live Official TikTok Embed Iframe Player */
                    <div className="w-full h-full relative bg-black">
                      <iframe
                        src={`https://www.tiktok.com/embed/v2/${tikTokId}`}
                        title={card.title}
                        className="w-full h-full border-0 rounded-xl"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                  ) : (
                    /* Real Live HD Video Stream with Direct Click-Through to TikTok */
                    <div
                      onClick={() => window.open(card.url || tiktokUrl, '_blank')}
                      className="relative w-full h-full cursor-pointer overflow-hidden group/vid"
                    >
                      {/* Real Live Video Footage */}
                      <video
                        src={card.videoSourceUrl || 'https://assets.mixkit.co/videos/preview/mixkit-smoke-from-an-incense-stick-41484-large.mp4'}
                        autoPlay
                        loop
                        muted={isMuted}
                        playsInline
                        className="w-full h-full object-cover transform transition-transform duration-700 group-hover/vid:scale-105"
                      />

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
                        <div className="w-13 h-13 rounded-full bg-black/40 backdrop-blur-md border border-white/60 flex items-center justify-center text-white shadow-2xl transition-all duration-300 group-hover/vid:scale-110 group-hover/vid:bg-[#581420]">
                          <Play className="w-6 h-6 fill-white translate-x-0.5" />
                        </div>
                      </div>

                      {/* Bottom Bar: Sound track name & Views counter */}
                      <div className="absolute bottom-2.5 inset-x-3 z-20 flex items-center justify-between text-[11px] text-[#FAF5EE]">
                        <div className="flex items-center gap-1.5 text-[10px] text-[#E5C378] font-medium truncate max-w-[70%]">
                          <Disc3 className="w-3.5 h-3.5 animate-spin" />
                          <span className="truncate">الصوت الأصلي - كيان العود</span>
                        </div>
                        <span className="font-mono text-[10px] font-bold text-neutral-200 bg-black/50 px-2 py-0.5 rounded backdrop-blur-xs">
                          {card.views || '45K'}
                        </span>
                      </div>
                    </div>
                  )}

                </div>

                {/* Video Title & Actions */}
                <div className="pt-1 text-right">
                  <span className="text-[10px] font-bold text-[#E5C378] block mb-1">
                    {card.category || 'مستكة وعود فاخر'}
                  </span>
                  <h3 className="text-xs sm:text-sm font-bold text-[#FAF5EE] group-hover:text-[#E5C378] transition-colors leading-relaxed line-clamp-2 font-tajawal">
                    {card.title}
                  </h3>
                  
                  <div className="mt-2.5 pt-2 border-t border-[#4A242E] flex items-center justify-between text-[11px] text-[#C49FA7]">
                    <a
                      href={card.url || tiktokUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-white hover:text-[#E5C378] font-bold transition-colors cursor-pointer bg-white/10 hover:bg-white/20 px-2.5 py-1 rounded-md"
                    >
                      <Play className="w-3 h-3 fill-current" />
                      <span>فتح المقطع على تيك توك</span>
                    </a>
                    <span className="dir-ltr text-[10px] font-bold text-[#E5C378]">@{tiktokHandle}</span>
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
