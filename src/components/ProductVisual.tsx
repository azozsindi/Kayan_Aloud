import React from 'react';
import { Product } from '../types';

interface ProductVisualProps {
  product: Product;
  className?: string;
  isDetailed?: boolean;
}

export const ProductVisual: React.FC<ProductVisualProps> = ({
  product,
  className = '',
  isDetailed = false
}) => {
  // If product has a custom uploaded image, render it with high-fidelity framing
  if (product.imageUrl) {
    return (
      <div className={`relative w-full h-full overflow-hidden flex items-center justify-center bg-[#FAF5EE] ${className}`}>
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
      </div>
    );
  }

  // Bespoke artisanal visual rendering based on product category & theme
  const renderVisualArtwork = () => {
    if (product.category === 'mastic') {
      const isAmber = product.id.includes('amber');
      const isLavender = product.id.includes('lavender');

      const primaryHue = isLavender ? '#7E57C2' : isAmber ? '#D97706' : '#C59B27';
      const bgGradientStyle = isLavender
        ? 'linear-gradient(135deg, #251A2E 0%, #352542 50%, #1F1526 100%)'
        : isAmber
        ? 'linear-gradient(135deg, #2B1B12 0%, #3D2518 50%, #1C110B 100%)'
        : 'linear-gradient(135deg, #2A171C 0%, #3B1F27 50%, #1E0F13 100%)';

      const gemColors = isAmber
        ? ['#F59E0B', '#D97706', '#FBBF24', '#D97706', '#F59E0B', '#B45309']
        : isLavender
        ? ['#DDD6FE', '#C4B5FD', '#EDE9FE', '#A78BFA', '#C4B5FD', '#DDD6FE']
        : ['#FEF3C7', '#FDE68A', '#FFFBEB', '#FCD34D', '#FEF08A', '#FDE047'];

      return (
        <div
          className="relative w-full h-full flex items-center justify-center overflow-hidden"
          style={{ background: bgGradientStyle }}
        >
          {/* Ambient Lighting & Glow */}
          <div
            className="absolute w-48 h-48 rounded-full blur-2xl opacity-30"
            style={{ backgroundColor: primaryHue }}
          />

          {/* Luxury Presentation Podium */}
          <div className="absolute bottom-4 w-4/5 h-8 bg-gradient-to-t from-black/60 to-transparent rounded-full blur-sm" />

          {/* Artisanal Glass Jar with Crystal Mastic */}
          <div className="relative z-10 flex flex-col items-center">
            {/* Soft Fragrant Smoke Wisp */}
            <div className="absolute -top-12 flex justify-center opacity-40 animate-pulse pointer-events-none">
              <svg width="120" height="70" viewBox="0 0 120 70" fill="none">
                <path
                  d="M60 65 C55 45, 75 35, 65 15 C58 2, 70 0, 72 0"
                  stroke="url(#smokeGrad)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  filter="blur(2px)"
                />
                <defs>
                  <linearGradient id="smokeGrad" x1="0%" y1="100%" x2="0%" y2="0%">
                    <stop offset="0%" stopColor="#FAF5EE" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#FAF5EE" stopOpacity="0" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            {/* Brass / Gold Jar Lid */}
            <div
              className="w-24 h-5 rounded-t-md shadow-md border-b border-[#8A6A18] flex items-center justify-center"
              style={{ background: 'linear-gradient(90deg, #D4AF37 0%, #FFF3D1 50%, #AA8220 100%)' }}
            >
              <div className="w-16 h-0.5 bg-[#8A6A18]/40 rounded-full" />
            </div>
            <div className="w-20 h-2 bg-[#AA8220]" />

            {/* Fluted Crystal Glass Jar Body */}
            <div className="relative w-32 h-36 rounded-b-2xl bg-gradient-to-b from-white/20 via-white/10 to-white/5 backdrop-blur-md border border-white/30 shadow-2xl overflow-hidden flex items-center justify-center">
              {/* Vertical Fluted Reflections */}
              <div className="absolute inset-0 flex justify-around opacity-20 pointer-events-none">
                <div className="w-1 h-full bg-white" />
                <div className="w-1.5 h-full bg-white" />
                <div className="w-1 h-full bg-white" />
                <div className="w-2 h-full bg-white" />
              </div>

              {/* Crystal Mastic Stones inside */}
              <div className="relative z-10 grid grid-cols-3 gap-1.5 p-3 scale-90">
                {[
                  { size: 'w-7 h-6', rot: 'rotate-12' },
                  { size: 'w-6 h-7', rot: '-rotate-6' },
                  { size: 'w-8 h-7', rot: 'rotate-45' },
                  { size: 'w-7 h-8', rot: '-rotate-12' },
                  { size: 'w-8 h-6', rot: 'rotate-6' },
                  { size: 'w-6 h-6', rot: '-rotate-45' }
                ].map((gem, idx) => (
                  <div
                    key={idx}
                    className={`${gem.size} ${gem.rot} rounded-sm shadow-inner border border-white/60 relative overflow-hidden flex items-center justify-center transition-transform hover:scale-110`}
                    style={{ backgroundColor: gemColors[idx] }}
                  >
                    {/* Glistening facet highlight */}
                    <div className="absolute top-0 right-0 w-3 h-3 bg-white/80 rounded-bl-sm" />
                    <div className="w-1 h-1 rounded-full bg-white/90" />
                  </div>
                ))}
              </div>

              {/* Luxury Brand Label Band on Jar */}
              <div className="absolute bottom-3 left-2 right-2 py-1 px-2 rounded-sm bg-[#581420]/95 border border-[#D4AF37]/60 text-center shadow-lg">
                <span className="text-[9px] font-bold text-[#FAF5EE] tracking-wide block font-tajawal">
                  كيان العود · مستكة بلورية
                </span>
                <span className="text-[7px] text-[#D4AF37] tracking-wider block font-serif">
                  HANDMADE IN JEDDAH
                </span>
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (product.category === 'oud') {
      const isRose = product.id.includes('rose');

      return (
        <div
          className="relative w-full h-full flex items-center justify-center overflow-hidden"
          style={{ background: 'linear-gradient(135deg, #1C1315 0%, #2A181C 50%, #120B0D 100%)' }}
        >
          {/* Warm Amber Rim Lighting */}
          <div className="absolute w-44 h-44 rounded-full bg-[#C59B27]/20 blur-3xl" />

          {/* Travertine Pedestal Shadow */}
          <div className="absolute bottom-5 w-4/5 h-10 bg-black/70 rounded-full blur-md" />

          {/* Handcrafted Oud Chips coated with pure Musk */}
          <div className="relative z-10 flex flex-col items-center">
            {/* Fragrant Smoke Tendril */}
            <div className="absolute -top-14 opacity-50 pointer-events-none">
              <svg width="100" height="80" viewBox="0 0 100 80" fill="none">
                <path
                  d="M50 75 C40 50, 60 30, 48 10 C45 3, 52 0, 54 0"
                  stroke="#FAF5EE"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  filter="blur(1.5px)"
                />
              </svg>
            </div>

            {/* Dark Natural Wood & Slate Presentation Slab */}
            <div className="relative w-44 h-28 bg-[#1B1718] rounded-xl border border-[#3E282E] shadow-2xl flex items-center justify-center p-3">
              {/* Natural Wood Grain / Texture Overlay */}
              <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:8px_8px] rounded-xl" />

              {/* Coated Oud Chips Cluster */}
              <div className="relative z-10 flex items-center justify-center gap-2">
                {/* Oud Chip 1 */}
                <div className="w-12 h-16 bg-[#2B1713] rounded-t-lg rounded-b-sm border-2 border-[#FAF5EE]/90 shadow-lg transform -rotate-12 relative overflow-hidden flex flex-col justify-between p-1">
                  {/* Coated White Musk Texture layer */}
                  <div className="absolute inset-0 bg-[#FAF7F2]/80 mix-blend-overlay" />
                  <div className="absolute inset-x-0 top-0 h-4 bg-white/70 rounded-t-sm" />
                  <div className="text-[7px] text-[#FAF5EE] font-bold z-10 text-center tracking-tighter">
                    عود طبيعي
                  </div>
                  <div className="w-full h-1 bg-[#D4AF37] rounded-full z-10" />
                </div>

                {/* Main Hero Oud Chip (Center) */}
                <div className="w-16 h-20 bg-gradient-to-b from-[#381E18] to-[#1C0E0B] rounded-lg border-2 border-[#FAF5EE] shadow-2xl transform rotate-3 relative overflow-hidden flex flex-col items-center justify-between p-1.5 ring-2 ring-[#C59B27]/40">
                  {/* White Musk Powder Dusting */}
                  <div className="absolute inset-0 bg-[radial-gradient(#FFFFFF_1.5px,transparent_1.5px)] [background-size:4px_4px] opacity-75" />
                  <div className="w-full text-center z-10">
                    <span className="text-[8px] font-bold text-white bg-[#581420]/95 px-1 py-0.5 rounded-xs block">
                      ملبس بالمسك
                    </span>
                  </div>
                  {isRose && (
                    <div className="z-10 text-[9px] text-[#F43F5E] drop-shadow-sm">
                      ❀
                    </div>
                  )}
                  <div className="text-[7px] text-[#E5C378] font-bold z-10">
                    صنع يدوي
                  </div>
                </div>

                {/* Oud Chip 3 */}
                <div className="w-11 h-14 bg-[#23120E] rounded-md border-2 border-[#FAF5EE]/90 shadow-md transform rotate-12 relative overflow-hidden flex flex-col justify-end p-1">
                  <div className="absolute inset-0 bg-[#FAF7F2]/75 mix-blend-overlay" />
                  <div className="w-full h-1 bg-white/80 rounded-full z-10" />
                </div>
              </div>

              {/* Sprinkled pure musk grains on slate */}
              <div className="absolute bottom-1 flex gap-1 items-center opacity-80">
                <span className="w-1 h-1 rounded-full bg-white shadow-xs" />
                <span className="w-1.5 h-1.5 rounded-full bg-white shadow-xs" />
                <span className="w-1 h-1 rounded-full bg-white shadow-xs" />
              </div>
            </div>

            {/* Tag Badge */}
            <div className="mt-2 text-center">
              <span className="text-[10px] text-[#E5C378] font-semibold tracking-wider font-tajawal">
                {product.name.split(' ')[0]} {product.name.split(' ')[1]}
              </span>
            </div>
          </div>
        </div>
      );
    }

    // Royal Gifting Box
    return (
      <div
        className="relative w-full h-full flex items-center justify-center overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #3D0C14 0%, #581420 50%, #24050A 100%)' }}
      >
        {/* Ambient Royal Gold Glow */}
        <div className="absolute w-56 h-56 rounded-full bg-[#E5C378]/20 blur-3xl" />

        {/* Shadow */}
        <div className="absolute bottom-4 w-4/5 h-8 bg-black/60 rounded-full blur-md" />

        {/* Royal Burgundy Box with Gold Ribbon */}
        <div className="relative z-10 w-48 h-36 rounded-xl bg-[#4A0F19] border border-[#C59B27]/60 shadow-2xl flex flex-col items-center justify-center p-3 relative overflow-hidden">
          {/* Gold Satin Ribbon Cross */}
          <div
            className="absolute inset-y-0 w-5 shadow-sm flex items-center justify-center"
            style={{ background: 'linear-gradient(90deg, #C59B27 0%, #FFF0B3 50%, #A87F17 100%)' }}
          >
            <div className="w-0.5 h-full bg-[#8A6A18]/50" />
          </div>
          <div
            className="absolute inset-x-0 h-5 shadow-sm flex items-center justify-center"
            style={{ background: 'linear-gradient(180deg, #C59B27 0%, #FFF0B3 50%, #A87F17 100%)' }}
          >
            <div className="h-0.5 w-full bg-[#8A6A18]/50" />
          </div>

          {/* Central Royal Medallion Bow */}
          <div className="relative z-20 w-14 h-14 rounded-full bg-[#FAF5EE] border-2 border-[#581420] shadow-xl flex flex-col items-center justify-center p-1">
            <div className="text-[#581420] font-bold text-[10px] font-tajawal">كيان</div>
            <div className="w-5 h-0.5 bg-[#C59B27]" />
            <div className="text-[7px] text-[#581420] font-serif">KAYAN</div>
          </div>

          {/* Subtle Corner Embossed Filigree */}
          <div className="absolute top-2 left-2 text-[#C59B27]/60 text-xs">❖</div>
          <div className="absolute top-2 right-2 text-[#C59B27]/60 text-xs">❖</div>
          <div className="absolute bottom-2 left-2 text-[#C59B27]/60 text-xs">❖</div>
          <div className="absolute bottom-2 right-2 text-[#C59B27]/60 text-xs">❖</div>
        </div>
      </div>
    );
  };

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {renderVisualArtwork()}

      {/* Subtle Bottom Vignette */}
      <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
    </div>
  );
};
