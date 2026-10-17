import React from 'react';
import { Play, MessageCircle, ExternalLink, Heart, Sparkles } from 'lucide-react';
import { TIKTOK_HANDLE, TIKTOK_URL, WHATSAPP_DIRECT_LINK } from '../data/products';

interface TikTokBannerProps {
  tiktokHandle?: string;
  tiktokUrl?: string;
  whatsappLink?: string;
}

export const TikTokBanner: React.FC<TikTokBannerProps> = ({
  tiktokHandle = TIKTOK_HANDLE,
  tiktokUrl = TIKTOK_URL,
  whatsappLink = WHATSAPP_DIRECT_LINK
}) => {
  const videoCards = [
    {
      id: 1,
      title: 'كواليس سقاية ونقع المستكة البلورية بمسك الختام 🤍',
      views: '48.2K',
      likes: '3.9K',
      badge: 'شاهد التجهيز'
    },
    {
      id: 2,
      title: 'طريقة تلبيس العود المروكي ببودرة المسك الملكي حبة بحبة ✨',
      views: '72.4K',
      likes: '6.1K',
      badge: 'الأكثر مشاهدة'
    },
    {
      id: 3,
      title: 'تجهيز طلبات وبوكسات إهداء اليوم لأهل جدة الحبايب 🎁',
      views: '35.8K',
      likes: '2.8K',
      badge: 'تغليف الهدايا'
    }
  ];

  return (
    <section className="py-16 bg-[#201014] text-[#FAF5EE] border-b border-[#3D141E] relative overflow-hidden text-right">
      {/* Background ambient lighting */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#581420]/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-[#C59B27]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#E5C378] mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>مجتمع كيان العود على منصة تيك توك</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight font-tajawal">
              تابعونا على تيك توك <span className="dir-ltr inline-block text-[#E5C378]">@{tiktokHandle}</span>
            </h2>
            <p className="text-xs sm:text-sm text-[#D1B8BE] max-w-xl mt-2 leading-relaxed">
              نشارككم يومياً كواليس تحضير وتعتيق المستكة، وتجارب التبخير المباشرة، وتجهيز طلباتكم الفاخرة أولاً بأول.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <a
              href={tiktokUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-white bg-[#000000] hover:bg-neutral-900 border border-neutral-700 rounded-md transition-colors shadow-sm"
            >
              <span>متابعة الحساب</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-[#1F542A] bg-[#25D366] hover:bg-[#1EBE5D] rounded-md transition-colors shadow-sm"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-white text-[#25D366]" />
              <span className="text-white">طلب عبر واتساب</span>
            </a>
          </div>
        </div>

        {/* Video Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {videoCards.map((card) => (
            <a
              key={card.id}
              href={TIKTOK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative rounded-xl bg-[#2A171D] border border-[#4A242E] hover:border-[#C59B27] p-4 transition-all duration-200 overflow-hidden flex flex-col justify-between block"
            >
              {/* Top video aspect thumbnail */}
              <div className="relative aspect-[9/10] w-full rounded-lg bg-gradient-to-b from-[#3D1E26] to-[#1F0F13] flex flex-col items-center justify-center overflow-hidden mb-3 border border-[#4F2934]">
                {/* Play Button Icon */}
                <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-xs flex items-center justify-center text-white group-hover:scale-110 group-hover:bg-[#581420] transition-all shadow-lg">
                  <Play className="w-5 h-5 fill-white translate-x-0.5" />
                </div>

                <div className="absolute top-2.5 right-2.5">
                  <span className="text-[10px] font-bold px-2 py-0.5 bg-[#581420] text-[#FAF5EE] rounded-xs">
                    {card.badge}
                  </span>
                </div>

                <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between text-[11px] text-[#FAF5EE]/90">
                  <span className="flex items-center gap-1 font-mono">
                    <Heart className="w-3 h-3 text-rose-400 fill-rose-400" />
                    {card.likes}
                  </span>
                  <span className="font-mono text-neutral-300">
                    {card.views} مشاهدة
                  </span>
                </div>
              </div>

              {/* Title */}
              <div>
                <h3 className="text-xs font-bold text-[#FAF5EE] group-hover:text-[#E5C378] transition-colors leading-relaxed line-clamp-2">
                  {card.title}
                </h3>
                <span className="text-[10px] text-[#9E7A83] mt-1 block">
                  شاهد المقطع واطلب مباشرة عبر الخاص
                </span>
              </div>
            </a>
          ))}
        </div>

      </div>
    </section>
  );
};
