import React, { useState } from 'react';
import { Star, MessageCircle, CheckCircle2, Maximize2, X, CheckCheck, Sparkles, Image as ImageIcon } from 'lucide-react';
import { TESTIMONIALS, INITIAL_WHATSAPP_REVIEWS } from '../data/products';
import { WhatsAppReviewItem } from '../types';

interface ReviewsSectionProps {
  whatsappReviews?: WhatsAppReviewItem[];
}

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({
  whatsappReviews = INITIAL_WHATSAPP_REVIEWS
}) => {
  const [activeTab, setActiveTab] = useState<'screenshots' | 'written'>('screenshots');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<WhatsAppReviewItem | null>(null);

  return (
    <section id="reviews" className="py-16 sm:py-24 bg-[#FAF7F2] border-b border-[#E8DFD3] text-right relative overflow-hidden">
      
      {/* Lightbox Modal for Fullscreen Chat Screenshot */}
      {selectedItem && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fade-in"
          onClick={() => setSelectedItem(null)}
        >
          <div
            className="relative max-w-lg w-full bg-[#EFEAE2] rounded-2xl overflow-hidden shadow-2xl border border-[#C59B27]/40 flex flex-col max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header mimicking WhatsApp Chat bar */}
            <div className="bg-[#075E54] text-white p-3 sm:p-4 flex items-center justify-between shadow-md">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#128C7E] flex items-center justify-center text-white font-bold text-sm shadow-inner">
                  {selectedItem.customerName.charAt(0)}
                </div>
                <div>
                  <h3 className="text-sm font-bold flex items-center gap-1.5">
                    <span>{selectedItem.customerName}</span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#25D366]" />
                  </h3>
                  <span className="text-[11px] text-[#A7D9D3] block">
                    {selectedItem.city} · {selectedItem.productName}
                  </span>
                </div>
              </div>

              <button
                onClick={() => setSelectedItem(null)}
                className="p-1.5 text-white/80 hover:text-white rounded-full hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-4 sm:p-6 overflow-y-auto bg-[radial-gradient(#E0D8CC_1px,transparent_1px)] [background-size:16px_16px] flex flex-col justify-center items-center">
              {selectedItem.imageUrl ? (
                <div className="w-full flex flex-col items-center gap-3">
                  <div className="w-full rounded-xl overflow-hidden shadow-lg border border-neutral-300 bg-[#ECE5DD] flex items-center justify-center p-1">
                    <img
                      src={selectedItem.imageUrl}
                      alt={selectedItem.customerName}
                      className="w-full h-auto object-contain max-h-[65vh] rounded-lg"
                    />
                  </div>
                  {selectedItem.textSnippet && (
                    <div className="w-full bg-white/95 rounded-xl p-3 sm:p-4 border border-[#D1D7DB] shadow-xs text-xs sm:text-sm text-[#111B21] leading-relaxed">
                      <span className="font-bold text-[#128C7E] block mb-1 text-xs">نص المحادثة:</span>
                      «{selectedItem.textSnippet}»
                    </div>
                  )}
                </div>
              ) : (
                /* High-fidelity WhatsApp Message Bubble */
                <div className="w-full max-w-md bg-white rounded-2xl rounded-tr-xs p-4 sm:p-5 shadow-md border border-[#D1D7DB] relative space-y-3">
                  <div className="flex items-center justify-between border-b border-[#F0F2F5] pb-2">
                    <span className="text-[11px] font-bold text-[#128C7E]">رسالة واتساب واردة</span>
                    <span className="text-[10px] text-neutral-400">{selectedItem.date || 'اليوم'}</span>
                  </div>
                  
                  <p className="text-sm sm:text-base text-[#111B21] leading-relaxed font-tajawal">
                    {selectedItem.textSnippet}
                  </p>

                  <div className="flex items-center justify-end gap-1.5 pt-1 text-[10px] text-neutral-400">
                    <span>تم التوصيل</span>
                    <CheckCheck className="w-4 h-4 text-[#34B7F1]" />
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="bg-[#F0F2F5] p-3 text-center border-t border-[#E0E0E0] text-xs text-[#554044]">
              <span>محادثة موثقة لعملاء متجر كيان العود 🤍</span>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#8A2535] bg-[#581420]/10 px-3 py-1 rounded-full border border-[#8A2535]/20 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#C59B27]" />
            <span>آراء وتجارب عملاء حقيقية</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#350A11] tracking-tight font-tajawal mb-3">
            ماذا يقول عملاؤنا في جدة والمملكة عن كيان العود؟
          </h2>
          <p className="text-xs sm:text-sm text-[#70555A] leading-relaxed">
            ثقتكم وكلماتكم الطيبة هي وسام فخر لنا وحافز دائم لتقديم الأفضل في كل كسرة وكل بلورة نصنعها بحب.
          </p>

          {/* Tab Switcher: Screenshots vs Written */}
          <div className="inline-flex p-1 bg-[#FAF5EE] rounded-xl border border-[#E8DFD3] mt-6 shadow-xs">
            <button
              onClick={() => setActiveTab('screenshots')}
              className={`flex items-center gap-2 px-4 sm:px-6 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'screenshots'
                  ? 'bg-[#581420] text-white shadow-sm'
                  : 'text-[#70555A] hover:text-[#350A11]'
              }`}
            >
              <MessageCircle className="w-4 h-4 text-[#25D366]" />
              <span>محادثات الواتساب ({whatsappReviews.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('written')}
              className={`flex items-center gap-2 px-4 sm:px-6 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'written'
                  ? 'bg-[#581420] text-white shadow-sm'
                  : 'text-[#70555A] hover:text-[#350A11]'
              }`}
            >
              <Star className="w-4 h-4 text-[#C59B27]" />
              <span>التقييمات المكتوبة ({TESTIMONIALS.length})</span>
            </button>
          </div>
        </div>

        {/* TAB 1: WHATSAPP CHAT SCREENSHOTS & BUBBLES */}
        {activeTab === 'screenshots' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {whatsappReviews.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedItem(item)}
                className="group relative bg-[#F7F5F0] hover:bg-[#FAF7F2] rounded-2xl border-2 border-[#E8DFD3] hover:border-[#C59B27] p-4 transition-all duration-300 shadow-xs hover:shadow-xl hover:-translate-y-1 cursor-pointer flex flex-col justify-between"
              >
                {/* Smartphone WhatsApp Card Frame */}
                <div className="relative rounded-xl overflow-hidden bg-white border border-[#E0D8CC] p-3 shadow-inner mb-3">
                  {/* WhatsApp Mini Header */}
                  <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#F0F2F5]">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-[#128C7E] text-white text-[10px] font-bold flex items-center justify-center shrink-0">
                        {item.customerName.charAt(0)}
                      </div>
                      <div className="leading-tight">
                        <span className="text-[11px] font-bold text-[#111B21] block line-clamp-1">
                          {item.customerName}
                        </span>
                        <span className="text-[9px] text-[#25D366] font-semibold">متصل الآن</span>
                      </div>
                    </div>
                    <span className="text-[9px] text-neutral-400 font-mono">{item.date || 'اليوم'}</span>
                  </div>

                  {/* Screenshot Image or Realistic Chat Bubble */}
                  {item.imageUrl ? (
                    <div className="space-y-2">
                      <div className="relative aspect-[4/5] rounded-lg overflow-hidden bg-[#ECE5DD] border border-[#D1D7DB] flex items-center justify-center p-0.5">
                        <img
                          src={item.imageUrl}
                          alt={item.customerName}
                          className="w-full h-full object-contain transform transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <span className="p-2 rounded-full bg-white text-[#581420] shadow-md flex items-center gap-1.5 text-[11px] font-bold px-3">
                            <Maximize2 className="w-3.5 h-3.5 text-[#C59B27]" />
                            <span>تكبير المحادثة</span>
                          </span>
                        </div>
                      </div>
                      {item.textSnippet && (
                        <p className="line-clamp-2 text-[10px] text-[#4A373A] bg-[#FAF5EE] p-1.5 rounded border border-[#E8DFD3] font-tajawal">
                          «{item.textSnippet}»
                        </p>
                      )}
                    </div>
                  ) : (
                    <div className="bg-[#DCF8C6]/60 rounded-xl rounded-tr-xs p-3 text-[11px] text-[#111B21] leading-relaxed relative border border-[#CDECC0]">
                      <p className="line-clamp-4 font-tajawal">
                        «{item.textSnippet}»
                      </p>
                      <div className="flex items-center justify-end gap-1 mt-1.5 text-[9px] text-neutral-500">
                        <span>قراءة</span>
                        <CheckCheck className="w-3.5 h-3.5 text-[#34B7F1]" />
                      </div>
                    </div>
                  )}

                  {/* Enlarge Hint Overlay */}
                  <div className="mt-2 pt-2 border-t border-[#F0F2F5] flex items-center justify-between text-[10px] text-[#8A2535]">
                    <span className="flex items-center gap-1 font-semibold group-hover:text-[#581420] transition-colors">
                      <Maximize2 className="w-3 h-3 text-[#C59B27]" />
                      <span>اضغط لتكبير المحادثة</span>
                    </span>
                    <span className="text-[9px] text-neutral-400">واتساب</span>
                  </div>
                </div>

                {/* Customer Details Footer */}
                <div className="pt-2 border-t border-[#E8DFD3] flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-[#350A11] flex items-center gap-1">
                      <span>{item.customerName}</span>
                      <CheckCircle2 className="w-3 h-3 text-emerald-600 inline" />
                    </h4>
                    <span className="text-[10px] text-[#8A2535] block">{item.city}</span>
                  </div>
                  <span className="text-[9px] font-bold text-[#581420] bg-white px-2 py-0.5 rounded border border-[#E8DFD3] truncate max-w-[45%]">
                    {item.productName}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 2: WRITTEN TESTIMONIALS */}
        {activeTab === 'written' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {TESTIMONIALS.map((t) => (
              <div
                key={t.id}
                className="bg-white rounded-xl border border-[#E8DFD3] p-5 shadow-xs flex flex-col justify-between"
              >
                <div>
                  {/* 5 Stars */}
                  <div className="flex items-center gap-1 text-[#C59B27] mb-3">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-[#C59B27]" />
                    ))}
                  </div>

                  {/* Testimonial Quote */}
                  <p className="text-xs text-[#4A373A] leading-relaxed mb-4">
                    «{t.text}»
                  </p>
                </div>

                {/* Author & City */}
                <div className="pt-3 border-t border-[#F0E8DE] flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-[#350A11] flex items-center gap-1">
                      <span>{t.name}</span>
                      <CheckCircle2 className="w-3 h-3 text-emerald-600 inline" />
                    </h4>
                    <span className="text-[10px] text-[#8A2535]">{t.city}</span>
                  </div>
                  <div className="text-[10px] text-[#70555A] bg-[#FAF7F2] px-2 py-0.5 rounded-sm">
                    {t.product}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};
