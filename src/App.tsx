import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ProductCard } from './components/ProductCard';
import { ProductModal } from './components/ProductModal';
import { CartDrawer } from './components/CartDrawer';
import { StorySection } from './components/StorySection';
import { TikTokBanner } from './components/TikTokBanner';
import { ReviewsSection } from './components/ReviewsSection';
import { FAQSection } from './components/FAQSection';
import { Footer } from './components/Footer';
import { AdminDashboard } from './components/AdminDashboard';
import {
  PRODUCTS as INITIAL_PRODUCTS,
  INITIAL_TIKTOK_VIDEOS,
  INITIAL_WHATSAPP_REVIEWS,
  INITIAL_FAQS,
  WHATSAPP_NUMBER,
  WHATSAPP_DIRECT_LINK,
  TIKTOK_HANDLE,
  TIKTOK_URL,
  LOCATION_CITY
} from './data/products';
import { Product, ProductVariant, CartItem, StoreSettings, TikTokVideoItem, WhatsAppReviewItem, FAQItem } from './types';
import { Sparkles, MessageCircle, Check, Search, ShieldAlert } from 'lucide-react';

const DEFAULT_SETTINGS: StoreSettings = {
  whatsappNumber: WHATSAPP_NUMBER,
  whatsappDirectLink: WHATSAPP_DIRECT_LINK,
  tiktokHandle: TIKTOK_HANDLE,
  tiktokUrl: TIKTOK_URL,
  locationCity: LOCATION_CITY,
  freeShippingThreshold: 250,
  shippingCost: 25,
  announcementText: 'توصيل سريع داخل جدة خلال 24 ساعة · شحن آمن لكافة مدن ومحافظات المملكة · صُنع بأيدينا بكل حب',
  customLogoUrl: null
};

export default function App() {
  // Store Products with LocalStorage persistence
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('kayan_products');
      return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
    } catch {
      return INITIAL_PRODUCTS;
    }
  });

  // Store Settings with LocalStorage persistence
  const [settings, setSettings] = useState<StoreSettings>(() => {
    try {
      const saved = localStorage.getItem('kayan_settings');
      return saved ? { ...DEFAULT_SETTINGS, ...JSON.parse(saved) } : DEFAULT_SETTINGS;
    } catch {
      return DEFAULT_SETTINGS;
    }
  });

  // Customer Shopping Cart
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('kayan_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // TikTok Videos with LocalStorage persistence
  const [tiktokVideos, setTiktokVideos] = useState<TikTokVideoItem[]>(() => {
    try {
      const saved = localStorage.getItem('kayan_tiktok_videos_v3');
      if (saved) {
        const parsed = JSON.parse(saved);
        return parsed.map((v: TikTokVideoItem) => {
          const match = v.url?.match(/\/video\/(\d+)/);
          return match ? { ...v, videoId: match[1] } : v;
        });
      }
      return INITIAL_TIKTOK_VIDEOS;
    } catch {
      return INITIAL_TIKTOK_VIDEOS;
    }
  });

  // WhatsApp Reviews with LocalStorage persistence
  const [whatsappReviews, setWhatsappReviews] = useState<WhatsAppReviewItem[]>(() => {
    try {
      const saved = localStorage.getItem('kayan_whatsapp_reviews_v2');
      return saved ? JSON.parse(saved) : INITIAL_WHATSAPP_REVIEWS;
    } catch {
      return INITIAL_WHATSAPP_REVIEWS;
    }
  });

  // FAQs with LocalStorage persistence
  const [faqs, setFaqs] = useState<FAQItem[]>(() => {
    try {
      const saved = localStorage.getItem('kayan_faqs_v1');
      return saved ? JSON.parse(saved) : INITIAL_FAQS;
    } catch {
      return INITIAL_FAQS;
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [activeCategory, setActiveCategory] = useState<'all' | 'mastic' | 'oud' | 'gifts'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync products to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('kayan_products', JSON.stringify(products));
    } catch {
      // LocalStorage fallback
    }
  }, [products]);

  // Sync settings to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('kayan_settings', JSON.stringify(settings));
    } catch {
      // LocalStorage fallback
    }
  }, [settings]);

  // Sync cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('kayan_cart', JSON.stringify(cart));
    } catch {
      // LocalStorage fallback
    }
  }, [cart]);

  // Sync TikTok videos to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('kayan_tiktok_videos_v3', JSON.stringify(tiktokVideos));
    } catch {
      // LocalStorage fallback
    }
  }, [tiktokVideos]);

  // Sync WhatsApp reviews to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('kayan_whatsapp_reviews_v2', JSON.stringify(whatsappReviews));
    } catch {
      // LocalStorage fallback
    }
  }, [whatsappReviews]);

  // Check URL (hash, pathname, query) and keyboard typing for "OUD"
  useEffect(() => {
    const checkUrlForOUD = () => {
      const hash = (window.location.hash || '').toUpperCase();
      const path = (window.location.pathname || '').toUpperCase();
      const search = (window.location.search || '').toUpperCase();

      if (hash.includes('OUD') || path.includes('OUD') || search.includes('OUD')) {
        setIsAdminOpen(true);
      }
    };

    checkUrlForOUD();
    window.addEventListener('hashchange', checkUrlForOUD);
    window.addEventListener('popstate', checkUrlForOUD);

    // Keystroke listener: if owner types "OUD" anywhere on the keyboard
    let keyBuffer = '';
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is currently typing in an input or textarea
      const target = e.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
        return;
      }

      keyBuffer += e.key.toUpperCase();
      if (keyBuffer.length > 5) {
        keyBuffer = keyBuffer.slice(-5);
      }
      if (keyBuffer.includes('OUD')) {
        setIsAdminOpen(true);
        keyBuffer = '';
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('hashchange', checkUrlForOUD);
      window.removeEventListener('popstate', checkUrlForOUD);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  const handleAddToCart = (product: Product, variant?: ProductVariant, quantity: number = 1) => {
    const selectedVariant = variant || product.variants[0];
    
    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex(
        (item) => item.product.id === product.id && item.selectedVariant.id === selectedVariant.id
      );

      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [...prevCart, { product, selectedVariant, quantity }];
      }
    });

    showToast(`تمت إضافة "${product.name}" إلى سلة الطلب`);
  };

  const handleUpdateQuantity = (index: number, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveItem(index);
    } else {
      setCart((prev) => {
        const updated = [...prev];
        updated[index].quantity = newQty;
        return updated;
      });
    }
  };

  const handleRemoveItem = (index: number) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
    showToast('تم حذف المنتج من السلة');
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const handleResetDefaults = () => {
    setProducts(INITIAL_PRODUCTS);
    setSettings(DEFAULT_SETTINGS);
    setTiktokVideos(INITIAL_TIKTOK_VIDEOS);
    setWhatsappReviews(INITIAL_WHATSAPP_REVIEWS);
    try {
      localStorage.removeItem('kayan_products');
      localStorage.removeItem('kayan_settings');
      localStorage.removeItem('kayan_tiktok_videos_v3');
      localStorage.removeItem('kayan_whatsapp_reviews_v2');
    } catch {
      // ignore
    }
    showToast('تمت استعادة الأصناف والمحادثات والإعدادات الافتراضية');
  };

  // Filter products by category & search query
  const filteredProducts = products.filter((product) => {
    const matchesCategory = activeCategory === 'all' || product.category === activeCategory;
    const matchesSearch =
      searchQuery.trim() === '' ||
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.scentNotes.top.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#221718] font-['Tajawal',sans-serif] flex flex-col antialiased">
      
      {/* Header */}
      <Header
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        customLogoUrl={settings.customLogoUrl}
        announcementText={settings.announcementText}
        whatsappLink={settings.whatsappDirectLink}
      />

      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onExploreProducts={() => {
            const el = document.getElementById('products');
            el?.scrollIntoView({ behavior: 'smooth' });
          }}
          customLogoUrl={settings.customLogoUrl}
          whatsappLink={settings.whatsappDirectLink}
          tiktokHandle={settings.tiktokHandle}
          tiktokUrl={settings.tiktokUrl}
        />

        {/* Featured Products Collection */}
        <section id="products" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-right">
          
          {/* Section Heading & Category Filter Controls */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-6 border-b border-[#E8DFD3]">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#8A2535] mb-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#C59B27]" />
                <span>تشكيلة حصرية منتقاة بعناية</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#350A11] tracking-tight font-tajawal">
                مجموعات كيان العود الفاخرة
              </h2>
              <p className="text-xs sm:text-sm text-[#70555A] mt-1">
                صُنعت يدوياً بحب في جدة لتمنحكم أطيب نفحات البخور والمسك
              </p>
            </div>

            {/* Filter Tabs (Interactive Controls) */}
            <div className="flex flex-wrap items-center gap-1.5 p-1 bg-[#FAF5EE] rounded-lg border border-[#E8DFD3] self-start md:self-auto">
              <button
                onClick={() => setActiveCategory('all')}
                className={`px-3.5 py-1.5 text-xs font-bold rounded-md transition-all whitespace-nowrap cursor-pointer ${
                  activeCategory === 'all'
                    ? 'bg-[#581420] text-white shadow-xs'
                    : 'text-[#6A5055] hover:text-[#350A11]'
                }`}
              >
                جميع المنتجات ({products.length})
              </button>
              <button
                onClick={() => setActiveCategory('mastic')}
                className={`px-3.5 py-1.5 text-xs font-bold rounded-md transition-all whitespace-nowrap cursor-pointer ${
                  activeCategory === 'mastic'
                    ? 'bg-[#581420] text-white shadow-xs'
                    : 'text-[#6A5055] hover:text-[#350A11]'
                }`}
              >
                المستكة البلورية
              </button>
              <button
                onClick={() => setActiveCategory('oud')}
                className={`px-3.5 py-1.5 text-xs font-bold rounded-md transition-all whitespace-nowrap cursor-pointer ${
                  activeCategory === 'oud'
                    ? 'bg-[#581420] text-white shadow-xs'
                    : 'text-[#6A5055] hover:text-[#350A11]'
                }`}
              >
                العود الملبس بالمسك
              </button>
              <button
                onClick={() => setActiveCategory('gifts')}
                className={`px-3.5 py-1.5 text-xs font-bold rounded-md transition-all whitespace-nowrap cursor-pointer ${
                  activeCategory === 'gifts'
                    ? 'bg-[#581420] text-white shadow-xs'
                    : 'text-[#6A5055] hover:text-[#350A11]'
                }`}
              >
                بوكسات الإهداء
              </button>
            </div>
          </div>

          {/* Search Query Input */}
          <div className="mb-8 max-w-md">
            <div className="relative">
              <input
                type="text"
                placeholder="ابحث بالاسم أو الرائحة (مسك، عنبر، مروكي، لافندر...)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full text-xs p-3 pr-10 rounded-lg bg-white border border-[#E8DFD3] focus:outline-none focus:border-[#581420] text-right"
              />
              <Search className="w-4 h-4 text-[#A88A91] absolute right-3 top-3.5" />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute left-3 top-3 text-[11px] text-[#8A2535] hover:underline"
                >
                  مسح
                </button>
              )}
            </div>
          </div>

          {/* Product Cards Grid (3 Columns on Desktop) */}
          {filteredProducts.length === 0 ? (
            <div className="py-16 text-center space-y-3 bg-white rounded-2xl border border-[#E8DFD3]">
              <p className="text-base font-bold text-[#350A11]">لا توجد نتائج مطابقة لبحثك</p>
              <p className="text-xs text-[#70555A]">جرب تغيير كلمة البحث أو تصفح كل الأقسام</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setActiveCategory('all');
                }}
                className="px-4 py-2 text-xs font-bold text-white bg-[#581420] rounded-md"
              >
                عرض كل التشكيلة
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onSelect={(p) => setSelectedProduct(p)}
                  onAddToCart={(p) => handleAddToCart(p)}
                />
              ))}
            </div>
          )}

        </section>

        {/* Dedicated Spotlight 1: المستكة البلورية المسقاة */}
        <section id="mastic-section" className="py-16 bg-[#F4EFE6] border-y border-[#E8DFD3] text-right">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 space-y-3">
                <span className="text-xs font-bold text-[#8A2535]">
                  سر النقاء والفوحان البارد
                </span>
                <h3 className="text-2xl font-extrabold text-[#350A11] font-tajawal">
                  المستكة البلورية المسقاة · إشراقة العطر في كل زاوية
                </h3>
                <p className="text-xs sm:text-sm text-[#554044] leading-relaxed max-w-2xl">
                  تتميز المستكة البلورية في كيان العود بنقائها الكريستالي العالي وقدرتها الفائقة على حبس الزيوت العطرية. لا تحترق سريعاً، بل تذوب بهدوء لتنثر في أرجاء المكان مسك الختام ودهن العود والعنبر بنقاء خالص دون أي رائحة دخان حارقة.
                </p>
              </div>
              <div className="lg:col-span-4 flex justify-start lg:justify-end">
                <button
                  onClick={() => {
                    setActiveCategory('mastic');
                    const el = document.getElementById('products');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-5 py-2.5 text-xs font-bold text-white bg-[#581420] hover:bg-[#430D17] rounded-md shadow-xs transition-colors"
                >
                  استعراض جميع أصناف المستكة
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Dedicated Spotlight 2: العود الملبس بالمسك الأصلي */}
        <section id="oud-section" className="py-16 bg-[#2B151A] text-[#FAF5EE] text-right">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 space-y-3">
                <span className="text-xs font-bold text-[#E5C378]">
                  فخامة الضيافة السعودية
                </span>
                <h3 className="text-2xl font-extrabold text-[#FAF5EE] font-tajawal">
                  العود الطبيعي الملبس بالمسك الأصلي · توليفة لا تُنسى
                </h3>
                <p className="text-xs sm:text-sm text-[#D8BFC4] leading-relaxed max-w-2xl">
                  نختار أفخر كسرات العود المروكي والكلمنتان المشبعة بالدهن، ويتم تكسيتها بأيدينا حبة بحبة بطبقة متساوية من بودرة المسك الملكي الأبيض. بمجرد وضعها على الجمر، يذوب المسك ناشراً عبقاً ناعماً يليه فوحان العود الأزرق الأصيل.
                </p>
              </div>
              <div className="lg:col-span-4 flex justify-start lg:justify-end">
                <button
                  onClick={() => {
                    setActiveCategory('oud');
                    const el = document.getElementById('products');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-5 py-2.5 text-xs font-bold text-[#350A11] bg-[#FAF5EE] hover:bg-white rounded-md shadow-xs transition-colors"
                >
                  استعراض أصناف العود الملبس
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Craftsmanship & Story Section */}
        <StorySection customLogoUrl={settings.customLogoUrl} />

        {/* TikTok Community & Videos Section */}
        <TikTokBanner
          videos={tiktokVideos}
          tiktokHandle={settings.tiktokHandle}
          tiktokUrl={settings.tiktokUrl}
          whatsappLink={settings.whatsappDirectLink}
        />

        {/* Reviews & Social Proof */}
        <ReviewsSection whatsappReviews={whatsappReviews} />

        {/* FAQs */}
        <FAQSection />
      </main>

      {/* Footer */}
      <Footer
        customLogoUrl={settings.customLogoUrl}
        whatsappNumber={settings.whatsappNumber}
        whatsappLink={settings.whatsappDirectLink}
        tiktokHandle={settings.tiktokHandle}
        tiktokUrl={settings.tiktokUrl}
        locationCity={settings.locationCity}
      />

      {/* Product Detail Modal */}
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={(product, variant, qty) => handleAddToCart(product, variant, qty)}
      />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        whatsappNumber={settings.whatsappNumber}
        whatsappLink={settings.whatsappDirectLink}
        freeShippingThreshold={settings.freeShippingThreshold}
        shippingCost={settings.shippingCost}
      />

      {/* Admin Dashboard Modal */}
      <AdminDashboard
        isOpen={isAdminOpen}
        onClose={() => {
          setIsAdminOpen(false);
          const currentUrl = window.location.href;
          if (currentUrl.toUpperCase().includes('OUD')) {
            window.history.pushState(null, '', window.location.pathname.replace(/\/OUD/i, '/') || '/');
          }
        }}
        products={products}
        onUpdateProducts={setProducts}
        settings={settings}
        onUpdateSettings={setSettings}
        onResetDefaults={handleResetDefaults}
        tiktokVideos={tiktokVideos}
        onUpdateTikTokVideos={setTiktokVideos}
        whatsappReviews={whatsappReviews}
        onUpdateWhatsAppReviews={setWhatsappReviews}
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#350A11] text-[#FAF5EE] px-4 py-3 rounded-xl shadow-2xl border border-[#C59B27]/40 flex items-center gap-2 text-xs font-bold animate-bounce">
          <Check className="w-4 h-4 text-[#E5C378]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Floating Instant WhatsApp Button */}
      <aside aria-label="زر التواصل السريع" className="fixed bottom-6 left-6 z-40">
        <a
          href={settings.whatsappDirectLink}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-2.5 bg-[#25D366] text-white p-3.5 sm:px-4 sm:py-3 rounded-full shadow-2xl hover:bg-[#1EBE5D] transition-all duration-200 hover:scale-105 active:scale-95"
          title={`تواصل مباشر عبر الواتساب (${settings.whatsappNumber})`}
        >
          <MessageCircle className="w-5 h-5 fill-white text-[#25D366]" />
          <span className="hidden sm:inline text-xs font-bold">
            مراسلة سريعة عبر واتساب
          </span>
        </a>
      </aside>

    </div>
  );
}
