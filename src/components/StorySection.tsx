import React from 'react';
import { Heart, MapPin, Sparkles, CheckCircle2 } from 'lucide-react';
import { Logo } from './Logo';

interface StorySectionProps {
  customLogoUrl?: string | null;
}

export const StorySection: React.FC<StorySectionProps> = ({ customLogoUrl = null }) => {
  return (
    <section id="story" className="py-20 bg-[#FAF5EE] border-b border-[#E8DFD3] relative overflow-hidden text-right">
      {/* Decorative ambient background */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-80 h-80 bg-[#581420]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Visual Showcase Card */}
          <div className="lg:col-span-5 flex justify-center order-2 lg:order-1">
            <div className="relative w-full max-w-md bg-white rounded-2xl border border-[#E8DFD3] p-8 shadow-xl overflow-hidden">
              <div className="flex flex-col items-center text-center space-y-4">
                <Logo size="lg" customLogoUrl={customLogoUrl} />
                
                <div className="space-y-1">
                  <h3 className="text-xl font-extrabold text-[#350A11] font-tajawal">
                    كيان العود · ورشة جدة
                  </h3>
                  <p className="text-xs text-[#8A2535] font-semibold">
                    حرفة يدوية، نقاوة مطلقة، وحب للبخور الأصيل
                  </p>
                </div>

                <div className="w-full pt-4 border-t border-[#F0E8DE] space-y-3 text-right">
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#C59B27] shrink-0 mt-0.5" />
                    <p className="text-xs text-[#554044] leading-relaxed">
                      <strong>نقع وتعتيق لأكثر من 21 يوماً:</strong> تتشرب بلورات المستكة زيوت المسك والعنبر حتى الأعماق لتفوح ببطء وبدون احتراق.
                    </p>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#C59B27] shrink-0 mt-0.5" />
                    <p className="text-xs text-[#554044] leading-relaxed">
                      <strong>تكسية يدوية حبة بحبة:</strong> كل كسرة عود مروكي تُكسى بمسك الطهارة والمسك الملكي الأبيض الصافي بأيدينا.
                    </p>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#C59B27] shrink-0 mt-0.5" />
                    <p className="text-xs text-[#554044] leading-relaxed">
                      <strong>من جدة لكل بيوت المملكة:</strong> تغليف فاخر يُشرفك أمام ضيوفك ويصلك أينما كنت.
                    </p>
                  </div>
                </div>

                <div className="w-full p-3 bg-[#FAF7F2] rounded-lg border border-[#E8DFD3] text-center">
                  <span className="text-[11px] font-bold text-[#581420]">
                    «رائحة تترك أثراً، وبخور يعانق الروح»
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Editorial Story Text */}
          <div className="lg:col-span-7 space-y-6 order-1 lg:order-2">
            
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#8A2535]">
              <Sparkles className="w-3.5 h-3.5 text-[#C59B27]" />
              <span>أصالة الحرفة وحكاية البداية</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#350A11] tracking-tight leading-tight font-tajawal">
              صُنِع بأيدينا بكل حب .. حكايتنا في كيان العود
            </h2>

            <div className="space-y-4 text-sm sm:text-base text-[#5A4549] leading-relaxed">
              <p>
                انطلقت فكرة <strong className="text-[#581420]">كيان العود</strong> من شغف حقيقي بتراث الطيب والضيافة الحجازية العريقة في مدينة جدة. لاحظنا أن كثيراً من بخور المستكة والعود المتوفر في الأسواق إما سريع الاحتراق أو مشوب بروائح كيميائية تفقد البخور هدوءه وجماله.
              </p>
              <p>
                لذا قررنا أن نصنع الفرق بأنفسنا؛ اخترنا أجود بلورات المستكة الحجرية النقية، وابتكرنا خلطاتنا الخاصة المسقاة بأفخر الزيوت الملكية (مسك الختام، العنبر الأشهب، دهن الورد، والعود المعتق)، وعمدنا إلى تكسية خشب العود الطبيعي بالمسك الأبيض الصافي في تجربة عطرية حصرية تأسر الحواس.
              </p>
              <p>
                كل علبة وكل كسرة تخرج من أيدينا هي رسالة حب وتقدير لكل من يقدّر الفخامة، لتكون ضيافتكم دوماً عامرة بأجمل العطور.
              </p>
            </div>

            <div className="pt-4 flex flex-wrap items-center gap-6 text-xs font-bold text-[#581420]">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#C59B27]" />
                <span>جدة - المملكة العربية السعودية</span>
              </div>
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-[#8A2535] fill-[#8A2535]" />
                <span>مشروع سعودي محلي بأيدينا 100%</span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
