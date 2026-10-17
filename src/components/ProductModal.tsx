import React, { useState } from 'react';
import { X, ShoppingBag, MessageCircle, Heart, Sparkles, Check, Flame } from 'lucide-react';
import { Product, ProductVariant } from '../types';
import { ProductVisual } from './ProductVisual';
import { WHATSAPP_NUMBER } from '../data/products';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, variant: ProductVariant, quantity: number) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  onClose,
  onAddToCart
}) => {
  if (!product) return null;

  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(
    product.variants[0]
  );
  const [quantity, setQuantity] = useState(1);
  const [addedAnimation, setAddedAnimation] = useState(false);

  const handleAddToCart = () => {
    onAddToCart(product, selectedVariant, quantity);
    setAddedAnimation(true);
    setTimeout(() => {
      setAddedAnimation(false);
      onClose();
    }, 600);
  };

  const handleDirectWhatsApp = () => {
    const text = encodeURIComponent(
      `السلام عليكم ورحمة الله وبركاته،\nأود الاستفسار والطلب المباشر من متجر كيان العود:\n\n*المنتج:* ${product.name}\n*الحجم:* ${selectedVariant.name}\n*الكمية:* ${quantity}\n*السعر:* ${selectedVariant.price * quantity} ر.س\n\nفضلاً إفادتي بتأكيد التوفر والتوصيل في جدة/المملكة.`
    );
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, '_blank');
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-xs overflow-y-auto animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl bg-[#FAF7F2] rounded-2xl border border-[#E8DFD3] shadow-2xl overflow-hidden my-8 text-right"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 left-4 z-30 p-2 text-[#581420] bg-white/90 hover:bg-white rounded-full shadow-md transition-colors"
          aria-label="إغلاق النافذة"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12">
          
          {/* Visual Artwork Column */}
          <div className="md:col-span-5 relative min-h-[280px] md:min-h-full bg-[#FAF5EE]">
            <ProductVisual product={product} className="w-full h-full" isDetailed={true} />
            {product.badge && (
              <div className="absolute top-4 right-4 z-20">
                <span className="text-xs font-bold px-3 py-1 bg-[#581420] text-[#FAF5EE] rounded-sm shadow-md">
                  {product.badge}
                </span>
              </div>
            )}
          </div>

          {/* Details & Purchase Module */}
          <div className="md:col-span-7 p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div>
              {/* Category & Handmade Trust */}
              <div className="flex items-center gap-2 text-xs font-semibold text-[#8A2535] mb-2">
                <span>{product.categoryLabel}</span>
                <span aria-hidden="true">·</span>
                <span className="flex items-center gap-1 text-[#C59B27]">
                  <Heart className="w-3 h-3 fill-[#C59B27]" />
                  <span>صُنع بأيدينا بكل حب في جدة</span>
                </span>
              </div>

              {/* Title & Subtitle */}
              <h2 className="text-2xl font-extrabold text-[#350A11] mb-2 font-tajawal">
                {product.name}
              </h2>
              <p className="text-sm text-[#70555A] leading-relaxed mb-4">
                {product.description}
              </p>

              {/* Fragrance Pyramid Notes */}
              <div className="bg-white rounded-xl border border-[#E8DFD3] p-4 space-y-2 mb-4">
                <div className="text-xs font-bold text-[#581420] flex items-center gap-1 mb-1">
                  <Sparkles className="w-3.5 h-3.5 text-[#C59B27]" />
                  <span>الهرم العطري والنوتات المميزة</span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-[11px] text-center">
                  <div className="p-2 bg-[#FAF7F2] rounded-md">
                    <span className="font-bold text-[#8A2535] block mb-0.5">القمة</span>
                    <span className="text-[#554044] block">{product.scentNotes.top}</span>
                  </div>
                  <div className="p-2 bg-[#FAF7F2] rounded-md">
                    <span className="font-bold text-[#8A2535] block mb-0.5">القلب</span>
                    <span className="text-[#554044] block">{product.scentNotes.heart}</span>
                  </div>
                  <div className="p-2 bg-[#FAF7F2] rounded-md">
                    <span className="font-bold text-[#8A2535] block mb-0.5">القاعدة</span>
                    <span className="text-[#554044] block">{product.scentNotes.base}</span>
                  </div>
                </div>
              </div>

              {/* Crafting & Usage Guide Accordion / Strip */}
              <div className="p-3 bg-[#FAF5EE] rounded-lg border border-[#E8DFD3] text-xs text-[#554044] space-y-1.5">
                <div className="flex items-center gap-1.5 font-bold text-[#581420]">
                  <Flame className="w-3.5 h-3.5 text-[#C59B27]" />
                  <span>نصيحة التبخير للحصول على أعلى فوحان:</span>
                </div>
                <p className="text-[11px] leading-relaxed text-[#70555A]">
                  {product.usageInstructions}
                </p>
              </div>

              {/* Variant Selector */}
              {product.variants.length > 1 && (
                <div className="mt-4">
                  <label className="block text-xs font-bold text-[#350A11] mb-2">
                    اختر الحجم والوزن:
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {product.variants.map((variant) => (
                      <button
                        key={variant.id}
                        onClick={() => setSelectedVariant(variant)}
                        className={`p-2.5 text-xs text-right rounded-lg border transition-all cursor-pointer ${
                          selectedVariant.id === variant.id
                            ? 'bg-[#581420] text-white border-[#581420] shadow-xs'
                            : 'bg-white text-[#554044] border-[#E8DFD3] hover:border-[#581420]/40'
                        }`}
                      >
                        <div className="font-bold">{variant.name}</div>
                        <div className={`text-[11px] mt-0.5 ${selectedVariant.id === variant.id ? 'text-[#E5C378]' : 'text-[#8A2535]'}`}>
                          {variant.price} ر.س
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Purchase Bar */}
            <div className="pt-4 border-t border-[#E8DFD3] space-y-3">
              <div className="flex items-center justify-between">
                {/* Quantity Controls */}
                <div className="flex items-center border border-[#E8DFD3] rounded-md bg-white">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-1.5 text-sm font-bold text-[#581420] hover:bg-[#FAF5EE] transition-colors"
                  >
                    -
                  </button>
                  <span className="px-3 py-1.5 text-xs font-bold tabular-nums">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-1.5 text-sm font-bold text-[#581420] hover:bg-[#FAF5EE] transition-colors"
                  >
                    +
                  </button>
                </div>

                {/* Total Price */}
                <div className="text-left">
                  <span className="text-xs text-[#70555A] block">الإجمالي:</span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-extrabold text-[#581420] tabular-nums">
                      {selectedVariant.price * quantity}
                    </span>
                    <span className="text-xs font-bold text-[#8A2535]">ر.س</span>
                  </div>
                </div>
              </div>

              {/* Dual Actions: Cart & WhatsApp */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  onClick={handleAddToCart}
                  className={`flex items-center justify-center gap-2 py-3 px-4 text-xs font-bold rounded-md transition-all shadow-sm cursor-pointer ${
                    addedAnimation
                      ? 'bg-emerald-700 text-white'
                      : 'bg-[#581420] hover:bg-[#430D17] text-white active:scale-98'
                  }`}
                >
                  {addedAnimation ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-300" />
                      <span>تمت الإضافة للسلة!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4 text-[#E5C378]" />
                      <span>إضافة لسلة الطلب</span>
                    </>
                  )}
                </button>

                <button
                  onClick={handleDirectWhatsApp}
                  className="flex items-center justify-center gap-2 py-3 px-4 text-xs font-bold text-[#1E5631] bg-[#E8F8EE] border border-[#25D366]/40 hover:bg-[#D5F2DE] rounded-md transition-colors cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 text-[#25D366]" />
                  <span>طلب مباشر عبر واتساب</span>
                </button>
              </div>

            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
