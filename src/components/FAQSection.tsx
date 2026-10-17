import React, { useState } from 'react';
import { ChevronDown, MessageCircle, HelpCircle } from 'lucide-react';
import { FAQS, WHATSAPP_DIRECT_LINK } from '../data/products';

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 bg-[#FAF5EE] border-b border-[#E8DFD3] text-right">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#8A2535] mb-2">
            <HelpCircle className="w-3.5 h-3.5 text-[#C59B27]" />
            <span>إجابات وافية</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#350A11] tracking-tight font-tajawal mb-2">
            الأسئلة الشائعة
          </h2>
          <p className="text-xs sm:text-sm text-[#70555A]">
            كل ما تود معرفته عن مستكة كيان العود، العود الملبس، وطرق التوصيل والطلب
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="bg-white rounded-xl border border-[#E8DFD3] overflow-hidden transition-colors"
              >
                <button
                  onClick={() => toggle(index)}
                  className="w-full p-4 sm:p-5 text-right flex items-center justify-between gap-4 cursor-pointer hover:bg-[#FAF7F2] transition-colors"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm font-bold text-[#350A11] leading-relaxed">
                    {faq.question}
                  </span>
                  <div className={`w-7 h-7 rounded-full bg-[#FAF5EE] flex items-center justify-center text-[#581420] transition-transform duration-200 shrink-0 ${isOpen ? 'rotate-180' : ''}`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-[#554044] leading-relaxed border-t border-[#F0E8DE]/80 bg-[#FAF7F2]/50">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Extra Question Assistance CTA */}
        <div className="mt-10 p-6 bg-white rounded-xl border border-[#E8DFD3] text-center space-y-3">
          <p className="text-xs font-semibold text-[#70555A]">
            لديك استفسار خاص أو ترغب بتجهيز توزيعات لمناسبتك السعيدة؟
          </p>
          <a
            href={WHATSAPP_DIRECT_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-white bg-[#581420] hover:bg-[#430D17] rounded-md transition-colors shadow-xs"
          >
            <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
            <span>تواصل معنا مباشرة عبر الواتساب</span>
          </a>
        </div>

      </div>
    </section>
  );
};
