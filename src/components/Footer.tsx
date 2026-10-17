import React from 'react';
import { MessageCircle, Heart, MapPin, ExternalLink } from 'lucide-react';
import { Logo } from './Logo';

interface FooterProps {
  customLogoUrl?: string | null;
  whatsappNumber?: string;
  whatsappLink?: string;
  tiktokHandle?: string;
  tiktokUrl?: string;
  locationCity?: string;
}

export const Footer: React.FC<FooterProps> = ({
  customLogoUrl = null,
  whatsappNumber = '966503676367',
  whatsappLink = 'https://iwtsp.com/966503676367',
  tiktokHandle = 'kayan_alood',
  tiktokUrl = 'https://www.tiktok.com/@kayan_alood',
  locationCity = 'جدة، المملكة العربية السعودية'
}) => {
  return (
    <footer className="bg-[#2E1017] text-[#FAF5EE] border-t border-[#4A1D27] text-right">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          
          {/* Brand Column (5 cols) */}
          <div className="md:col-span-5 space-y-4">
            <Logo size="lg" light={true} customLogoUrl={customLogoUrl} />
            
            <p className="text-xs sm:text-sm text-[#D8BFC4] leading-relaxed max-w-sm">
              كيان العود | Kayan Aloud · مشروع سعودي ناشئ من مدينة جدة، متخصص في صناعة المستكة البلورية المسقاة بأفخر العطور، وتلبيس العود الطبيعي بالمسك الأصلي يدوياً بكل حب وإتقان.
            </p>

            <div className="flex items-center gap-2 text-xs text-[#E5C378]">
              <MapPin className="w-4 h-4 shrink-0 text-[#C59B27]" />
              <span>{locationCity}</span>
            </div>
          </div>

          {/* Quick Links Column (3 cols) */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-[#E5C378] uppercase tracking-wider">
              التشكيلة والمنتجات
            </h4>
            <ul className="space-y-2 text-xs text-[#D8BFC4]">
              <li>
                <a href="#mastic-section" className="hover:text-white transition-colors">
                  مستكة بلورية بمسك الختام
                </a>
              </li>
              <li>
                <a href="#mastic-section" className="hover:text-white transition-colors">
                  مستكة بلورية بدهن العود والعنبر
                </a>
              </li>
              <li>
                <a href="#oud-section" className="hover:text-white transition-colors">
                  عود مروكي ملبس بالمسك الأصلي
                </a>
              </li>
              <li>
                <a href="#oud-section" className="hover:text-white transition-colors">
                  عود كلمنتان بالمسك والورد
                </a>
              </li>
              <li>
                <a href="#products" className="hover:text-white transition-colors">
                  صندوق الإهداء الملكي المتكامل
                </a>
              </li>
            </ul>
          </div>

          {/* Contact & Orders Column (4 cols) */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="text-xs font-bold text-[#E5C378] uppercase tracking-wider">
              للطلب والاستفسار المباشر
            </h4>
            <p className="text-xs text-[#D8BFC4] leading-relaxed">
              يسعدنا استقبال طلباتكم وتنسيق مناسباتكم الخاصة عبر الواتساب أو الخاص في تيك توك:
            </p>

            <div className="space-y-2.5">
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 p-2.5 rounded-lg bg-[#FAF5EE]/10 hover:bg-[#FAF5EE]/15 border border-[#FAF5EE]/15 text-xs font-bold text-white transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-[#25D366]" />
                <span>واتساب مباشر: {whatsappNumber}</span>
              </a>

              <a
                href={tiktokUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 p-2.5 rounded-lg bg-[#FAF5EE]/10 hover:bg-[#FAF5EE]/15 border border-[#FAF5EE]/15 text-xs font-bold text-white transition-colors"
              >
                <ExternalLink className="w-4 h-4 text-[#E5C378]" />
                <span>تيك توك: @{tiktokHandle}</span>
              </a>
            </div>

            <div className="pt-2">
              <span className="text-[11px] text-[#A88A91] block">
                مواعيد استقبال الطلبات: على مدار الساعة طوال أيام الأسبوع
              </span>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-[#4A1D27] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#B5969E]">
          <div className="flex items-center gap-2">
            <span>جميع الحقوق محفوظة © {new Date().getFullYear()}</span>
            <span className="font-bold text-white">كيان العود · Kayan Aloud</span>
          </div>

          <div className="flex items-center gap-1 text-[11px]">
            <span>صُنع بأيدينا بكل حب في عروس البحر الأحمر جدة</span>
            <Heart className="w-3.5 h-3.5 text-[#E5C378] fill-[#E5C378]" />
          </div>
        </div>

      </div>
    </footer>
  );
};
