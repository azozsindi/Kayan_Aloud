import React from 'react';
import { ShoppingBag, Eye, Heart, MessageCircle } from 'lucide-react';
import { Product } from '../types';
import { ProductVisual } from './ProductVisual';

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onSelect,
  onAddToCart
}) => {
  return (
    <article className="group relative flex flex-col bg-white rounded-xl border border-[#E8DFD3] hover:border-[#C59B27]/60 shadow-xs hover:shadow-md transition-all duration-200 overflow-hidden text-right">
      
      {/* Visual Product Showcase Area */}
      <div
        onClick={() => onSelect(product)}
        className="relative w-full aspect-[4/3] overflow-hidden cursor-pointer bg-[#F5EFE6]"
      >
        <ProductVisual
          product={product}
          className="w-full h-full transition-transform duration-300 group-hover:scale-105"
        />

        {/* Single subtle tag if present */}
        {product.badge && (
          <div className="absolute top-3 right-3 z-20">
            <span className="text-[10px] font-bold tracking-wide uppercase px-2.5 py-1 bg-[#581420] text-[#FAF5EE] rounded-sm shadow-xs">
              {product.badge}
            </span>
          </div>
        )}

        {/* Quick View Overlay on Hover */}
        <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 z-20">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onSelect(product);
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#FAF5EE] text-[#581420] text-xs font-bold rounded-sm shadow-md hover:bg-white transition-colors"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>عرض التفاصيل والنوتات</span>
          </button>
        </div>
      </div>

      {/* Product Content Details */}
      <div className="p-5 flex flex-col flex-1 justify-between">
        <div>
          {/* Unboxed Quiet Category Label */}
          <div className="text-[11px] font-semibold text-[#8A2535] mb-1">
            <span>{product.categoryLabel}</span>
          </div>

          {/* Product Title */}
          <h3
            onClick={() => onSelect(product)}
            className="text-base font-bold text-[#350A11] hover:text-[#581420] transition-colors cursor-pointer line-clamp-1 mb-1 font-tajawal"
            title={product.name}
          >
            {product.name}
          </h3>

          {/* Subtitle / Key Note */}
          <p className="text-xs text-[#70555A] line-clamp-2 leading-relaxed mb-4">
            {product.subtitle}
          </p>

          {/* Scent notes summary */}
          <div className="text-[11px] text-[#8B6E73] bg-[#FAF7F2] p-2 rounded-md mb-4 border border-[#EFE7DC]">
            <span className="font-bold text-[#581420]">النفحات: </span>
            <span>{product.scentNotes.top}</span>
          </div>
        </div>

        {/* Pricing & Add To Cart Baseline */}
        <div className="pt-3 border-t border-[#F0E8DE] flex items-center justify-between gap-2">
          {/* Price */}
          <div className="flex items-baseline gap-1.5">
            <span className="text-lg font-extrabold text-[#581420] tabular-nums font-tajawal">
              {product.price}
            </span>
            <span className="text-xs font-bold text-[#8A2535]">ر.س</span>
            {product.originalPrice && (
              <span className="text-xs text-[#A89296] line-through tabular-nums mr-1">
                {product.originalPrice} ر.س
              </span>
            )}
          </div>

          {/* Quick Add To Cart Button */}
          <button
            onClick={() => onAddToCart(product)}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-white bg-[#581420] hover:bg-[#430D17] rounded-md transition-colors shadow-xs active:scale-95 cursor-pointer"
            aria-label={`إضافة ${product.name} إلى السلة`}
          >
            <ShoppingBag className="w-3.5 h-3.5 text-[#E5C378]" />
            <span>أضف للطلب</span>
          </button>
        </div>

      </div>

    </article>
  );
};
