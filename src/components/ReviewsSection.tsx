import React from 'react';
import { Star, MessageSquareQuote, CheckCircle2 } from 'lucide-react';
import { TESTIMONIALS } from '../data/products';

export const ReviewsSection: React.FC = () => {
  return (
    <section id="reviews" className="py-20 bg-[#FAF7F2] border-b border-[#E8DFD3] text-right">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#8A2535] mb-2">
            <span>آراء وتجارب حقيقية</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#350A11] tracking-tight font-tajawal mb-3">
            ماذا يقول عملاؤنا في جدة والمملكة عن كيان العود؟
          </h2>
          <p className="text-xs sm:text-sm text-[#70555A] leading-relaxed">
            ثقتكم وكلماتكم الطيبة هي وسام فخر لنا وحافز دائم لتقديم الأفضل في كل كسرة وكل بلورة نصنعها.
          </p>
        </div>

        {/* Reviews Grid */}
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

      </div>
    </section>
  );
};
