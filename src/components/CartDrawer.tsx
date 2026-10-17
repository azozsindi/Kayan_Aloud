import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, MessageCircle, ShoppingBag, Gift, MapPin, Truck, CheckCircle2, Copy } from 'lucide-react';
import { CartItem, OrderCustomerInfo } from '../types';
import { WHATSAPP_NUMBER, WHATSAPP_DIRECT_LINK } from '../data/products';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (index: number, newQty: number) => void;
  onRemoveItem: (index: number) => void;
  onClearCart: () => void;
  whatsappNumber?: string;
  whatsappLink?: string;
  freeShippingThreshold?: number;
  shippingCost?: number;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  whatsappNumber = WHATSAPP_NUMBER,
  whatsappLink = WHATSAPP_DIRECT_LINK,
  freeShippingThreshold = 250,
  shippingCost = 25
}) => {
  if (!isOpen) return null;

  const [customerInfo, setCustomerInfo] = useState<OrderCustomerInfo>({
    name: '',
    phone: '',
    city: 'جدة',
    district: '',
    isGift: false,
    giftCardMessage: '',
    notes: ''
  });

  const [copiedNotice, setCopiedNotice] = useState(false);

  const subtotal = items.reduce(
    (sum, item) => sum + item.selectedVariant.price * item.quantity,
    0
  );

  const deliveryCost = subtotal >= freeShippingThreshold || subtotal === 0 ? 0 : shippingCost;
  const total = subtotal + deliveryCost;

  const generateOrderMessage = () => {
    let msg = `السلام عليكم ورحمة الله وبركاته،\nأود تأكيد طلب جديد من متجر *كيان العود*:\n\n`;
    msg += `📦 *المنتجات المطلوبة:*\n`;

    items.forEach((item, index) => {
      msg += `${index + 1}. *${item.product.name}*\n   الحجم: ${item.selectedVariant.name}\n   الكمية: ${item.quantity}\n   السعر: ${item.selectedVariant.price * item.quantity} ر.س\n`;
    });

    msg += `\n💰 *ملخص الحساب:*\n`;
    msg += `• مجموع المنتجات: ${subtotal} ر.س\n`;
    msg += `• التوصيل: ${deliveryCost === 0 ? 'مجاني (عرض التوصيل)' : `${deliveryCost} ر.س`}\n`;
    msg += `• *الإجمالي النهائي: ${total} ر.س*\n\n`;

    msg += `📍 *بيانات المستلم:*\n`;
    msg += `• الاسم: ${customerInfo.name || 'لم يحدد'}\n`;
    msg += `• رقم الجوال: ${customerInfo.phone || 'لم يحدد'}\n`;
    msg += `• المدينة: ${customerInfo.city}\n`;
    if (customerInfo.district) {
      msg += `• الحي / العنوان: ${customerInfo.district}\n`;
    }

    if (customerInfo.isGift) {
      msg += `\n🎁 *طلب إهداء وتغليف فاخر:*\n`;
      msg += `• كرت الإهداء: "${customerInfo.giftCardMessage || 'مع أطيب التمنيات'}"\n`;
    }

    if (customerInfo.notes) {
      msg += `\n📝 *ملاحظات إضافية:* ${customerInfo.notes}\n`;
    }

    msg += `\nرابط المتجر: ${whatsappLink}`;

    return msg;
  };

  const handleSendToWhatsApp = () => {
    const message = generateOrderMessage();
    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/${whatsappNumber}?text=${encoded}`, '_blank');
  };

  const handleCopyOrder = () => {
    navigator.clipboard.writeText(generateOrderMessage());
    setCopiedNotice(true);
    setTimeout(() => setCopiedNotice(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 left-0 max-w-full flex pl-0 sm:pl-10">
        <div className="w-screen max-w-md bg-[#FAF7F2] border-r border-[#E8DFD3] shadow-2xl flex flex-col text-right">
          
          {/* Header */}
          <div className="p-5 border-b border-[#E8DFD3] flex items-center justify-between bg-[#FAF5EE]">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#581420]" />
              <h2 className="text-lg font-bold text-[#350A11] font-tajawal">
                سلة الطلبات ({items.reduce((s, i) => s + i.quantity, 0)})
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-md text-[#581420] hover:bg-[#EAE0D3] transition-colors"
              aria-label="إغلاق السلة"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Content Body */}
          <div className="flex-1 overflow-y-auto p-5 space-y-6">
            {items.length === 0 ? (
              <div className="py-16 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#581420]/10 text-[#581420] mx-auto flex items-center justify-center">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <div className="space-y-1">
                  <p className="text-base font-bold text-[#350A11]">سلتك فارغة حالياً</p>
                  <p className="text-xs text-[#70555A]">
                    اختر ما يناسبك من تشكيلة المستكة البلورية والعود الملبس بالمسك
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="px-5 py-2.5 text-xs font-bold text-white bg-[#581420] rounded-md hover:bg-[#430D17] transition-colors shadow-xs"
                >
                  استعراض المنتجات
                </button>
              </div>
            ) : (
              <>
                {/* Items List */}
                <div className="space-y-3">
                  {items.map((item, idx) => (
                    <div
                      key={`${item.product.id}-${item.selectedVariant.id}-${idx}`}
                      className="p-3 bg-white rounded-xl border border-[#E8DFD3] shadow-2xs flex items-center justify-between gap-3"
                    >
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-bold text-[#350A11] truncate mb-0.5">
                          {item.product.name}
                        </h4>
                        <div className="text-[11px] text-[#8A2535]">
                          {item.selectedVariant.name}
                        </div>
                        <div className="text-xs font-extrabold text-[#581420] mt-1 tabular-nums">
                          {item.selectedVariant.price * item.quantity} ر.س
                        </div>
                      </div>

                      {/* Quantity Controls & Remove */}
                      <div className="flex items-center gap-2 shrink-0">
                        <div className="flex items-center border border-[#E8DFD3] rounded-md bg-[#FAF7F2]">
                          <button
                            onClick={() => onUpdateQuantity(idx, item.quantity - 1)}
                            className="p-1 text-[#581420] hover:bg-white transition-colors"
                            aria-label="إنقاص الكمية"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="px-2 text-xs font-bold tabular-nums">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(idx, item.quantity + 1)}
                            className="p-1 text-[#581420] hover:bg-white transition-colors"
                            aria-label="زيادة الكمية"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <button
                          onClick={() => onRemoveItem(idx)}
                          className="p-1.5 text-[#9E3E4D] hover:text-red-700 hover:bg-red-50 rounded-md transition-colors"
                          title="حذف"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}

                  <div className="flex justify-end">
                    <button
                      onClick={onClearCart}
                      className="text-[11px] text-[#8A2535] hover:underline"
                    >
                      إفراغ السلة
                    </button>
                  </div>
                </div>

                {/* Customer Details Form */}
                <div className="bg-white rounded-xl border border-[#E8DFD3] p-4 space-y-3">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#581420]">
                    <MapPin className="w-3.5 h-3.5 text-[#C59B27]" />
                    <span>بيانات التوصيل في جدة وباقي المناطق</span>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-[#554044] mb-1">
                      الاسم الكريم:
                    </label>
                    <input
                      type="text"
                      placeholder="مثال: فهد الحربي"
                      value={customerInfo.name}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
                      className="w-full text-xs p-2.5 rounded-md border border-[#E8DFD3] bg-[#FAF7F2] focus:outline-none focus:border-[#581420]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[11px] font-semibold text-[#554044] mb-1">
                        رقم الجوال:
                      </label>
                      <input
                        type="tel"
                        placeholder="05XXXXXXXX"
                        value={customerInfo.phone}
                        onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                        className="w-full text-xs p-2.5 rounded-md border border-[#E8DFD3] bg-[#FAF7F2] focus:outline-none focus:border-[#581420] text-left dir-ltr"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-[#554044] mb-1">
                        المدينة:
                      </label>
                      <select
                        value={customerInfo.city}
                        onChange={(e) => setCustomerInfo({ ...customerInfo, city: e.target.value })}
                        className="w-full text-xs p-2.5 rounded-md border border-[#E8DFD3] bg-[#FAF7F2] focus:outline-none focus:border-[#581420]"
                      >
                        <option value="جدة">جدة (توصيل فوري)</option>
                        <option value="مكة المكرمة">مكة المكرمة</option>
                        <option value="الرياض">الرياض</option>
                        <option value="المدينة المنورة">المدينة المنورة</option>
                        <option value="الدمام / الخبر">المنطقة الشرقية</option>
                        <option value="الطائف">الطائف</option>
                        <option value="أخرى">مدينة أخرى بالمملكة</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-[#554044] mb-1">
                      الحي / العنوان بالتفصيل:
                    </label>
                    <input
                      type="text"
                      placeholder="مثال: حي الروضة - شارع الكيال"
                      value={customerInfo.district}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, district: e.target.value })}
                      className="w-full text-xs p-2.5 rounded-md border border-[#E8DFD3] bg-[#FAF7F2] focus:outline-none focus:border-[#581420]"
                    />
                  </div>

                  {/* Gift Packaging Checkbox */}
                  <div className="pt-2 border-t border-[#F0E8DE]">
                    <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-[#581420]">
                      <input
                        type="checkbox"
                        checked={customerInfo.isGift}
                        onChange={(e) => setCustomerInfo({ ...customerInfo, isGift: e.target.checked })}
                        className="rounded text-[#581420] focus:ring-[#581420]"
                      />
                      <Gift className="w-3.5 h-3.5 text-[#C59B27]" />
                      <span>هل هذا الطلب إهداء؟ (تغليف وكرت إهداء مجاناً)</span>
                    </label>

                    {customerInfo.isGift && (
                      <div className="mt-2 pl-2">
                        <textarea
                          placeholder="اكتب عبارة الإهداء المرغوبة على الكرت..."
                          value={customerInfo.giftCardMessage}
                          onChange={(e) => setCustomerInfo({ ...customerInfo, giftCardMessage: e.target.value })}
                          rows={2}
                          className="w-full text-xs p-2 rounded-md border border-[#E8DFD3] bg-[#FAF7F2] focus:outline-none focus:border-[#581420]"
                        />
                      </div>
                    )}
                  </div>

                  {/* Additional Notes */}
                  <div>
                    <label className="block text-[11px] font-semibold text-[#554044] mb-1">
                      ملاحظات خاصة للطلب (اختياري):
                    </label>
                    <input
                      type="text"
                      placeholder="مثال: وقت الاستلام المناسب، زيادة مسك..."
                      value={customerInfo.notes}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, notes: e.target.value })}
                      className="w-full text-xs p-2 rounded-md border border-[#E8DFD3] bg-[#FAF7F2] focus:outline-none focus:border-[#581420]"
                    />
                  </div>
                </div>

                {/* Free Delivery Banner if applicable */}
                {subtotal >= freeShippingThreshold ? (
                  <div className="flex items-center gap-2 p-3 bg-emerald-50 text-emerald-800 rounded-lg text-xs font-bold border border-emerald-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>مبارك! طلبك مؤهل للشحن والتوصيل المجاني</span>
                  </div>
                ) : (
                  <div className="p-2.5 bg-[#FAF5EE] rounded-lg text-[11px] text-[#70555A] border border-[#E8DFD3] flex items-center justify-between">
                    <span>أضف بقيمة {freeShippingThreshold - subtotal} ر.س للحصول على شحن مجاني</span>
                    <Truck className="w-4 h-4 text-[#C59B27]" />
                  </div>
                )}
              </>
            )}
          </div>

          {/* Checkout Footer Action */}
          {items.length > 0 && (
            <div className="p-5 border-t border-[#E8DFD3] bg-[#FAF5EE] space-y-3">
              {/* Calculations summary */}
              <div className="space-y-1.5 text-xs text-[#554044]">
                <div className="flex justify-between">
                  <span>مجموع المنتجات:</span>
                  <span className="font-bold tabular-nums">{subtotal} ر.س</span>
                </div>
                <div className="flex justify-between">
                  <span>رسوم التوصيل:</span>
                  <span className="font-bold tabular-nums">
                    {deliveryCost === 0 ? 'مجاني' : `${deliveryCost} ر.س`}
                  </span>
                </div>
                <div className="flex justify-between pt-2 border-t border-[#E8DFD3] text-sm font-extrabold text-[#350A11]">
                  <span>الإجمالي النهائي:</span>
                  <span className="text-base text-[#581420] tabular-nums">{total} ر.س</span>
                </div>
              </div>

              {/* Main Order via WhatsApp Button */}
              <button
                onClick={handleSendToWhatsApp}
                className="w-full py-3.5 px-4 text-xs font-bold text-white bg-[#25D366] hover:bg-[#1EBE5D] rounded-md transition-all shadow-md active:scale-98 flex items-center justify-center gap-2 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>إرسال وتأكيد الطلب عبر الواتساب</span>
              </button>

              {/* Copy order backup */}
              <div className="flex items-center justify-between text-[11px] text-[#70555A] pt-1">
                <span>سيفتح الواتساب مباشرة برقم {WHATSAPP_NUMBER}</span>
                <button
                  onClick={handleCopyOrder}
                  className="flex items-center gap-1 text-[#8A2535] hover:underline"
                >
                  <Copy className="w-3 h-3" />
                  <span>{copiedNotice ? 'تم نسخ الطلب!' : 'نسخ نص الطلب'}</span>
                </button>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};
