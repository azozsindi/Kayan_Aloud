import React from 'react';
import { MessageCircle, ArrowLeft, Heart, MapPin, Sparkles, ShieldCheck } from 'lucide-react';
import { Logo } from './Logo';
import { WHATSAPP_DIRECT_LINK, TIKTOK_URL, TIKTOK_HANDLE } from '../data/products';

interface HeroProps {
  onExploreProducts: () => void;
  customLogoUrl?: string | null;
  whatsappLink?: string;
  tiktokHandle?: string;
  tiktokUrl?: string;
}

export const Hero: React.FC<HeroProps> = ({
  onExploreProducts,
  customLogoUrl = null,
  whatsappLink = WHATSAPP_DIRECT_LINK,
  tiktokHandle = TIKTOK_HANDLE,
  tiktokUrl = TIKTOK_URL
}) => {
  return (
    <section className="relative overflow-hidden bg-[#FAF7F2] pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-[#E8DFD3]">
      {/* Decorative Subtle Background Flourish */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#581420]/5 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#C59B27]/10 rounded-full blur-3xl -ml-20 -mb-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Main Editorial Column (7 cols on lg) */}
          <div className="lg:col-span-7 flex flex-col items-start text-right">
            
            {/* Location & Handcrafted Trust Label */}
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#8A2535] mb-4">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-[#C59B27]" />
                <span>عروس البحر الأحمر - جدة</span>
              </span>
              <span aria-hidden="true" className="text-[#C59B27]">·</span>
              <span className="flex items-center gap-1">
                <Heart className="w-3.5 h-3.5 text-[#8A2535] fill-[#8A2535]" />
                <span>صُنع بأيدينا بكل حب</span>
              </span>
            </div>

            {/* Display Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#350A11] tracking-tight leading-[1.25] text-balance mb-6 font-tajawal">
              مستكة بلورية مسقاة بروائح فاخرة وعود ملبس بالمسك الأصلي
            </h1>

            {/* Editorial Lead Paragraph */}
            <p className="text-base sm:text-lg text-[#5A4549] leading-relaxed max-w-2xl mb-8">
              في <strong className="text-[#581420] font-bold">كيان العود</strong>، نعتني بأدق تفاصيل البخور والضيافة السعودية. ننقع بلورات المستكة النقية بزيوت عطرية ساحرة، ونلبس خشب العود الطبيعي بطبقة مخملية من المسك الصافي، لتنعموا بفوحان بارد وثبات استثنائي يعكس ذوقكم الرفيع.
            </p>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto">
              {/* WhatsApp Direct Order CTA */}
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-bold text-white bg-[#581420] hover:bg-[#430D17] rounded-md transition-all shadow-md active:scale-98 whitespace-nowrap"
              >
                <MessageCircle className="w-4 h-4 text-[#25D366]" />
                <span>للطلب عبر واتساب مباشر</span>
              </a>

              {/* Explore Collection Button */}
              <button
                onClick={onExploreProducts}
                className="flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-bold text-[#581420] bg-white border border-[#581420]/30 hover:bg-[#FAF5EE] rounded-md transition-colors shadow-xs cursor-pointer whitespace-nowrap"
              >
                <span>استعراض التشكيلة</span>
                <ArrowLeft className="w-4 h-4" />
              </button>
            </div>

            {/* TikTok & Social Connection Note */}
            <div className="mt-8 pt-6 border-t border-[#E8DFD3]/80 w-full flex flex-wrap items-center gap-4 text-xs text-[#70555A]">
              <span>تابعوا كواليس التجهيز وتجارب البخور اليومية على تيك توك:</span>
              <a
                href={tiktokUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-[#581420] hover:underline inline-flex items-center gap-1 dir-ltr"
              >
                <span>@{tiktokHandle}</span>
              </a>
            </div>
          </div>

          {/* Luxury Visual Showcase Frame (5 cols on lg) */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md">
              {/* Decorative Outer Halo */}
              <div className="absolute inset-0 bg-gradient-to-tr from-[#581420]/20 to-[#C59B27]/20 rounded-3xl transform rotate-2 blur-sm" />
              
              {/* Main Luxury Presentation Card */}
              <div className="relative rounded-2xl bg-[#FAF5EE] border border-[#E0D2C2] p-6 shadow-xl overflow-hidden">
                
                {/* Emblem Badge Centered */}
                <div className="flex justify-center mb-5">
                  <Logo size="xl" customLogoUrl={customLogoUrl} />
                </div>

                <div className="text-center space-y-2 mb-6">
                  <div className="inline-block px-3 py-1 bg-[#581420]/10 text-[#581420] text-xs font-bold rounded-sm">
                    عروس البحر الأحمر · جدة
                  </div>
                  <p className="text-xs text-[#7A6166] leading-relaxed">
                    «نصنع البخور بأيدينا كما نحب أن نشمّه في بيوتنا ومجالسنا»
                  </p>
                </div>

                {/* 2 Focal Teaser Highlights */}
                <div className="grid grid-cols-2 gap-3 text-right">
                  <div className="p-3 bg-white/80 rounded-lg border border-[#E8DFD3] shadow-xs">
                    <span className="text-[11px] font-bold text-[#8A2535] block mb-1">
                      المستكة البلورية
                    </span>
                    <span className="text-[11px] text-[#554044] block leading-tight">
                      مسقاة بمسك الختام والعود لفوحان بارد وثابت
                    </span>
                  </div>
                  <div className="p-3 bg-white/80 rounded-lg border border-[#E8DFD3] shadow-xs">
                    <span className="text-[11px] font-bold text-[#8A2535] block mb-1">
                      العود الملبس بالمسك
                    </span>
                    <span className="text-[11px] text-[#554044] block leading-tight">
                      كسرات عود طبيعي مشبعة بالدهن والمسك الأبيض
                    </span>
                  </div>
                </div>

                {/* Direct Order Quick Callout */}
                <div className="mt-5 pt-4 border-t border-[#E8DFD3] flex items-center justify-between text-xs">
                  <span className="text-[#7A6166]">للطلب الخاص والتجهيز:</span>
                  <a
                    href={WHATSAPP_DIRECT_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-[#581420] hover:text-[#350A11] inline-flex items-center gap-1"
                  >
                    <span>0503676367</span>
                    <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
                  </a>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* 4-Item Craft & Trust Strip (Full-width row below hero split) */}
        <div className="mt-14 pt-8 border-t border-[#E8DFD3] grid grid-cols-2 lg:grid-cols-4 gap-6 text-right">
          
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-md bg-[#581420]/10 flex items-center justify-center shrink-0 text-[#581420]">
              <Heart className="w-5 h-5 fill-[#581420]/20" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-[#350A11] mb-0.5">صُنع بأيدينا بكل حب</h4>
              <p className="text-[11px] text-[#70555A] leading-tight">شغل يدوي متقن حبة بحبة في ورشتنا بجدة</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-md bg-[#581420]/10 flex items-center justify-center shrink-0 text-[#581420]">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-[#350A11] mb-0.5">مسك أصلي وبلورات نقية</h4>
              <p className="text-[11px] text-[#70555A] leading-tight">زيوت عطرية فاخرة وخالية من أي روائح احتراق</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-md bg-[#581420]/10 flex items-center justify-center shrink-0 text-[#581420]">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-[#350A11] mb-0.5">موقعنا في جدة</h4>
              <p className="text-[11px] text-[#70555A] leading-tight">توصيل سريع داخل جدة وشحن لكافة مناطق المملكة</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-md bg-[#581420]/10 flex items-center justify-center shrink-0 text-[#581420]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-[#350A11] mb-0.5">طلب مباشر وتغليف فاخر</h4>
              <p className="text-[11px] text-[#70555A] leading-tight">تجهيز هدايا مخصصة وطلب عبر الواتساب وتيك توك</p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
