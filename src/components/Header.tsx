import React, { useState } from 'react';
import { ShoppingBag, MessageCircle, Menu, X } from 'lucide-react';
import { Logo } from './Logo';

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
  customLogoUrl?: string | null;
  announcementText?: string;
  whatsappLink?: string;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  onOpenCart,
  customLogoUrl = null,
  announcementText = 'توصيل سريع داخل جدة خلال 24 ساعة · شحن آمن لكافة مدن ومحافظات المملكة · صُنع بأيدينا بكل حب',
  whatsappLink = 'https://iwtsp.com/966503676367'
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Top Quiet Announcement Bar */}
      <aside aria-label="شريط الإعلانات" className="bg-[#581420] text-[#FAF5EE] text-xs py-2 px-4 border-b border-[#3D0C14] text-center font-medium">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#E5C378]" />
          <span>{announcementText}</span>
        </div>
      </aside>

      {/* Top Bar Contract: Zone 1 (Brand) - Zone 2 (4-5 Nav Links) - Zone 3 (1-2 Primary Actions) */}
      <header className="sticky top-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#E8DFD3] transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-8">
          
          {/* Zone 1: Brand Wordmark & Crest */}
          <a href="#" className="whitespace-nowrap shrink-0 hover:opacity-95 transition-opacity" aria-label="كيان العود - الصفحة الرئيسية">
            <Logo size="md" customLogoUrl={customLogoUrl} />
          </a>

          {/* Zone 2: 4-5 Concise Single-Line Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-semibold text-[#543D42]">
            <a href="#products" className="hover:text-[#581420] transition-colors whitespace-nowrap shrink-0">
              تشكيلة المنتجات
            </a>
            <a href="#mastic-section" className="hover:text-[#581420] transition-colors whitespace-nowrap shrink-0">
              المستكة البلورية
            </a>
            <a href="#oud-section" className="hover:text-[#581420] transition-colors whitespace-nowrap shrink-0">
              العود الملبس بالمسك
            </a>
            <a href="#story" className="hover:text-[#581420] transition-colors whitespace-nowrap shrink-0">
              حكايتنا في جدة
            </a>
            <a href="#reviews" className="hover:text-[#581420] transition-colors whitespace-nowrap shrink-0">
              تجارب العملاء
            </a>
            <a href="#faq" className="hover:text-[#581420] transition-colors whitespace-nowrap shrink-0">
              الأسئلة الشائعة
            </a>
          </nav>

          {/* Zone 3: Primary Actions (Direct WhatsApp & Cart) */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Direct WhatsApp Action */}
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-2 px-3.5 py-2 text-xs font-bold text-[#581420] bg-[#FAF5EE] border border-[#581420]/20 rounded-md hover:bg-[#581420] hover:text-[#FAF5EE] transition-colors whitespace-nowrap shrink-0 shadow-xs"
              title="مراسلة عبر الواتساب المباشر"
            >
              <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
              <span>طلب خاص عبر واتساب</span>
            </a>

            {/* Cart Trigger */}
            <button
              onClick={onOpenCart}
              className="relative flex items-center gap-2.5 px-4 py-2.5 text-xs font-bold text-white bg-[#581420] hover:bg-[#430D17] rounded-md transition-all shadow-sm active:scale-95 whitespace-nowrap shrink-0 cursor-pointer"
              aria-label="عرض سلة الطلبات"
            >
              <ShoppingBag className="w-4 h-4 text-[#E5C378]" />
              <span className="hidden md:inline">سلة الطلب</span>
              {cartCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-[#E5C378] text-[#581420] text-xs font-extrabold flex items-center justify-center tabular-nums">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-[#581420] hover:bg-[#EFE7DC] rounded-md transition-colors"
              aria-label="القائمة"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#FAF5EE] border-b border-[#E8DFD3] px-6 py-4 space-y-3">
            <a
              href="#products"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm font-semibold text-[#543D42] hover:text-[#581420]"
            >
              تشكيلة المنتجات
            </a>
            <a
              href="#mastic-section"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm font-semibold text-[#543D42] hover:text-[#581420]"
            >
              المستكة البلورية المسقاة
            </a>
            <a
              href="#oud-section"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm font-semibold text-[#543D42] hover:text-[#581420]"
            >
              العود الملبس بالمسك الأصلي
            </a>
            <a
              href="#story"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm font-semibold text-[#543D42] hover:text-[#581420]"
            >
              حكايتنا في جدة
            </a>
            <a
              href="#reviews"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm font-semibold text-[#543D42] hover:text-[#581420]"
            >
              آراء وتجارب العملاء
            </a>
            <a
              href="#faq"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm font-semibold text-[#543D42] hover:text-[#581420]"
            >
              الأسئلة الشائعة
            </a>

            <div className="pt-2 border-t border-[#E8DFD3]">
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-2.5 text-xs font-bold text-white bg-[#25D366] rounded-md shadow-xs"
              >
                <MessageCircle className="w-4 h-4" />
                <span>محادثة واتساب مباشرة</span>
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
