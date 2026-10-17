import React, { useState, useRef } from 'react';
import {
  Lock,
  LogOut,
  Package,
  Image as ImageIcon,
  Settings,
  Plus,
  Edit2,
  Trash2,
  Save,
  X,
  Upload,
  RotateCcw,
  CheckCircle,
  Eye,
  Sparkles,
  Phone,
  MessageCircle,
  MapPin,
  Truck,
  AlertTriangle,
  Copy,
  Layers,
  Check,
  Percent,
  Play,
  Video,
  ExternalLink
} from 'lucide-react';
import { Product, ProductVariant, StoreSettings, TikTokVideoItem, WhatsAppReviewItem } from '../types';
import { INITIAL_WHATSAPP_REVIEWS } from '../data/products';
import { Logo } from './Logo';

interface AdminDashboardProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onUpdateProducts: (newProducts: Product[]) => void;
  settings: StoreSettings;
  onUpdateSettings: (newSettings: StoreSettings) => void;
  onResetDefaults: () => void;
  tiktokVideos: TikTokVideoItem[];
  onUpdateTikTokVideos: (newVideos: TikTokVideoItem[]) => void;
  whatsappReviews: WhatsAppReviewItem[];
  onUpdateWhatsAppReviews: (newReviews: WhatsAppReviewItem[]) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  isOpen,
  onClose,
  products,
  onUpdateProducts,
  settings,
  onUpdateSettings,
  onResetDefaults,
  tiktokVideos,
  onUpdateTikTokVideos,
  whatsappReviews,
  onUpdateWhatsAppReviews
}) => {
  // Authentication PIN state (Strictly A0897 with no public hints)
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [enteredPin, setEnteredPin] = useState('');
  const [pinError, setPinError] = useState(false);
  const [adminPin, setAdminPin] = useState(() => {
    return localStorage.getItem('kayan_admin_pin') || 'A0897';
  });

  // Active Tab
  const [activeTab, setActiveTab] = useState<'products' | 'tiktok' | 'reviews' | 'logo' | 'settings'>('products');

  // Product Edit / Create state
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isCreatingNew, setIsCreatingNew] = useState(false);

  // TikTok Video Edit state
  const [editingVideo, setEditingVideo] = useState<TikTokVideoItem | null>(null);
  const [isCreatingNewVideo, setIsCreatingNewVideo] = useState(false);

  // WhatsApp Review Edit state
  const [editingReview, setEditingReview] = useState<WhatsAppReviewItem | null>(null);
  const [isCreatingNewReview, setIsCreatingNewReview] = useState(false);
  const reviewImageInputRef = useRef<HTMLInputElement>(null);

  // Success Notice Toast
  const [notice, setNotice] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const productImageInputRef = useRef<HTMLInputElement>(null);
  const videoThumbnailInputRef = useRef<HTMLInputElement>(null);

  const showNotice = (msg: string) => {
    setNotice(msg);
    setTimeout(() => setNotice(null), 3000);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (enteredPin === adminPin) {
      setIsAuthenticated(true);
      setPinError(false);
      setEnteredPin('');
    } else {
      setPinError(true);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    onClose();
  };

  // Product Actions
  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;

    if (isCreatingNew) {
      onUpdateProducts([editingProduct, ...products]);
      showNotice(`تمت إضافة صنف "${editingProduct.name}" بنجاح`);
    } else {
      onUpdateProducts(
        products.map((p) => (p.id === editingProduct.id ? editingProduct : p))
      );
      showNotice(`تم تحديث صنف "${editingProduct.name}" بنجاح`);
    }

    setEditingProduct(null);
    setIsCreatingNew(false);
  };

  const handleDeleteProduct = (productId: string, productName: string) => {
    if (window.confirm(`هل أنت متأكد من رغبتك بحذف صنف "${productName}"؟`)) {
      onUpdateProducts(products.filter((p) => p.id !== productId));
      showNotice(`تم حذف الصنف "${productName}"`);
    }
  };

  const handleDuplicateProduct = (product: Product) => {
    const duplicated: Product = {
      ...product,
      id: `${product.id}-${Date.now()}`,
      name: `${product.name} (نسخة جديدة)`,
      badge: 'جديد'
    };
    onUpdateProducts([duplicated, ...products]);
    showNotice(`تم تكرار الصنف "${product.name}" بنجاح`);
  };

  const handleCreateNewClick = () => {
    const newProd: Product = {
      id: `prod-${Date.now()}`,
      name: '',
      subtitle: '',
      category: 'mastic',
      categoryLabel: 'مستكة بلورية مسقاة',
      badge: 'جديد',
      price: 120,
      originalPrice: 150,
      description: '',
      craftingDetails: 'صُنعت يدوياً بكل حب في ورشتنا بجدة.',
      usageInstructions: 'توضع على جمر هادئ لفوحان ممتد وثابت.',
      scentNotes: {
        top: '',
        heart: '',
        base: ''
      },
      variants: [
        { id: `var-1-${Date.now()}`, name: 'علبة فاخرة (100 غرام)', weight: '100 غرام', price: 120 }
      ],
      colorTheme: 'from-[#FAF5EE] to-[#EFE4D6]',
      imageUrl: '',
      inStock: true
    };
    setEditingProduct(newProd);
    setIsCreatingNew(true);
  };

  // Product Image Upload
  const handleProductImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && editingProduct) {
      if (file.size > 8 * 1024 * 1024) {
        alert('حجم الصورة كبير جداً، يرجى اختيار صورة أقل من 8 ميجابايت.');
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64 = event.target?.result as string;
        setEditingProduct({
          ...editingProduct,
          imageUrl: base64
        });
        showNotice('تم رفع صورة الصنف بنجاح!');
      };
      reader.readAsDataURL(file);
    }
  };

  // Variant Actions
  const handleAddVariant = () => {
    if (!editingProduct) return;
    const newVar: ProductVariant = {
      id: `var-${Date.now()}`,
      name: 'حجم إضافي (50 غرام)',
      weight: '50 غرام',
      price: Math.max(10, editingProduct.price - 40)
    };
    setEditingProduct({
      ...editingProduct,
      variants: [...editingProduct.variants, newVar]
    });
  };

  const handleUpdateVariant = (index: number, field: keyof ProductVariant, value: any) => {
    if (!editingProduct) return;
    const updated = editingProduct.variants.map((v, i) =>
      i === index ? { ...v, [field]: value } : v
    );
    setEditingProduct({
      ...editingProduct,
      variants: updated
    });
  };

  const handleRemoveVariant = (index: number) => {
    if (!editingProduct) return;
    if (editingProduct.variants.length <= 1) {
      alert('يجب أن يحتوي الصنف على حجم واحد على الأقل.');
      return;
    }
    setEditingProduct({
      ...editingProduct,
      variants: editingProduct.variants.filter((_, i) => i !== index)
    });
  };

  // TikTok Video Actions
  const handleSaveVideo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingVideo) return;

    if (isCreatingNewVideo) {
      onUpdateTikTokVideos([editingVideo, ...tiktokVideos]);
      showNotice(`تمت إضافة فيديو تيك توك بنجاح`);
    } else {
      onUpdateTikTokVideos(
        tiktokVideos.map((v) => (v.id === editingVideo.id ? editingVideo : v))
      );
      showNotice(`تم تحديث فيديو تيك توك بنجاح`);
    }

    setEditingVideo(null);
    setIsCreatingNewVideo(false);
  };

  const handleDeleteVideo = (videoId: string, title: string) => {
    if (window.confirm(`هل أنت متأكد من حذف مقطع "${title}"؟`)) {
      onUpdateTikTokVideos(tiktokVideos.filter((v) => v.id !== videoId));
      showNotice('تم حذف المقطع بنجاح');
    }
  };

  const handleCreateNewVideo = () => {
    const newVid: TikTokVideoItem = {
      id: `vid-${Date.now()}`,
      title: '',
      category: 'كواليس التجهيز',
      badge: 'جديد',
      url: settings.tiktokUrl || 'https://www.tiktok.com/@kayan_alood',
      views: '10K',
      likes: '1.2K'
    };
    setEditingVideo(newVid);
    setIsCreatingNewVideo(true);
  };

  const handleVideoThumbnailUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && editingVideo) {
      if (file.size > 8 * 1024 * 1024) {
        alert('حجم الصورة كبير جداً، يرجى اختيار صورة أقل من 8 ميجابايت.');
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64 = event.target?.result as string;
        setEditingVideo({
          ...editingVideo,
          customThumbnailUrl: base64
        });
        showNotice('تم رفع غلاف الفيديو بنجاح!');
      };
      reader.readAsDataURL(file);
    }
  };

  // Logo Upload Actions
  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 6 * 1024 * 1024) {
        alert('حجم الصورة كبير جداً، يرجى اختيار صورة أقل من 6 ميجابايت.');
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64 = event.target?.result as string;
        onUpdateSettings({ ...settings, customLogoUrl: base64 });
        showNotice('تم رفع واعتماد الشعار الجديد بنجاح في كامل الموقع!');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleResetToDefaultLogo = () => {
    onUpdateSettings({ ...settings, customLogoUrl: null });
    showNotice('تمت استعادة الشعار الأصلي المعتمد لكيان العود');
  };

  // Canvas image compression helper to keep storage compact & ultra-fast
  const compressImage = (file: File, maxWidth = 1000, quality = 0.85): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        const img = new Image();
        img.src = e.target?.result as string;
        img.onload = () => {
          let width = img.width;
          let height = img.height;
          if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          }
          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          if (!ctx) {
            resolve(img.src);
            return;
          }
          ctx.drawImage(img, 0, 0, width, height);
          resolve(canvas.toDataURL('image/jpeg', quality));
        };
        img.onerror = reject;
      };
      reader.onerror = reject;
    });
  };

  // WhatsApp Review Actions
  const handleSaveReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingReview) return;

    if (isCreatingNewReview) {
      onUpdateWhatsAppReviews([editingReview, ...whatsappReviews]);
      showNotice(`تمت إضافة محادثة العميل "${editingReview.customerName}" بنجاح`);
    } else {
      onUpdateWhatsAppReviews(
        whatsappReviews.map((r) => (r.id === editingReview.id ? editingReview : r))
      );
      showNotice(`تم تحديث محادثة العميل "${editingReview.customerName}" بنجاح`);
    }

    setEditingReview(null);
    setIsCreatingNewReview(false);
  };

  const handleDeleteReview = (reviewId: string, name: string) => {
    if (window.confirm(`هل أنت متأكد من حذف محادثة "${name}"؟`)) {
      onUpdateWhatsAppReviews(whatsappReviews.filter((r) => r.id !== reviewId));
      showNotice('تم حذف المحادثة بنجاح');
    }
  };

  const handleCreateNewReview = () => {
    const newRev: WhatsAppReviewItem = {
      id: `wa-${Date.now()}`,
      customerName: '',
      city: 'جدة',
      productName: 'مستكة بلورية بمسك الختام',
      textSnippet: '',
      date: 'اليوم، 10:00 م'
    };
    setEditingReview(newRev);
    setIsCreatingNewReview(true);
  };

  const handleReviewImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && editingReview) {
      if (file.size > 10 * 1024 * 1024) {
        alert('حجم الصورة كبير جداً، يرجى اختيار صورة أقل من 10 ميجابايت.');
        return;
      }
      try {
        const compressed = await compressImage(file, 1000, 0.85);
        setEditingReview({
          ...editingReview,
          imageUrl: compressed
        });
        showNotice('تم رفع سكرين شوت المحادثة بنجاح!');
      } catch {
        alert('حدث خطأ أثناء معالجة الصورة، يرجى المحاولة مرة أخرى.');
      }
    }
  };

  const handleResetWhatsAppReviews = () => {
    if (window.confirm('هل تود استعادة محادثات الواتساب الافتراضية؟')) {
      onUpdateWhatsAppReviews(INITIAL_WHATSAPP_REVIEWS);
      showNotice('تمت استعادة محادثات الواتساب الافتراضية');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-xs flex items-center justify-center p-2 sm:p-6 text-right">
      <div className="relative w-full max-w-5xl bg-[#FAF7F2] rounded-2xl border border-[#E8DFD3] shadow-2xl overflow-hidden flex flex-col max-h-[94vh]">
        
        {/* Notice Toast */}
        {notice && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50 bg-[#350A11] text-[#FAF5EE] px-4 py-2 rounded-lg shadow-xl border border-[#C59B27] flex items-center gap-2 text-xs font-bold animate-fade-in">
            <CheckCircle className="w-4 h-4 text-[#E5C378]" />
            <span>{notice}</span>
          </div>
        )}

        {/* Top Admin Header Bar */}
        <div className="p-4 sm:p-5 bg-[#581420] text-[#FAF5EE] flex items-center justify-between border-b border-[#3D0C14]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#FAF5EE] p-0.5 flex items-center justify-center shrink-0">
              <Logo size="sm" customLogoUrl={settings.customLogoUrl} />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold flex items-center gap-2">
                <span>لوحة تحكم كيان العود</span>
                <span className="text-[10px] bg-[#E5C378] text-[#581420] px-2 py-0.5 rounded font-extrabold">
                  إدارة المتجر والفيديوهات
                </span>
              </h2>
              <p className="text-[11px] text-[#D8BFC4]">
                تعديل الأصناف، الصور، الأسعار، وفيديوهات تيك توك
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold bg-white/10 hover:bg-white/20 rounded-md transition-colors"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>معاينة المتجر</span>
            </button>
            <button
              onClick={handleLogout}
              className="p-1.5 text-[#D8BFC4] hover:text-white rounded-md transition-colors"
              title="خروج"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* LOGIN GATE SCREEN */}
        {!isAuthenticated ? (
          <div className="p-8 sm:p-14 flex flex-col items-center justify-center space-y-6 max-w-md mx-auto text-center">
            <div className="w-16 h-16 rounded-full bg-[#581420]/10 text-[#581420] flex items-center justify-center">
              <Lock className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <h3 className="text-lg font-bold text-[#350A11]">
                تسجيل الدخول للوحة التحكم
              </h3>
              <p className="text-xs text-[#70555A]">
                يرجى إدخال رمز المرور الخاص بإدارة متجر كيان العود
              </p>
            </div>

            <form onSubmit={handleLogin} className="w-full space-y-4">
              <div>
                <input
                  type="password"
                  maxLength={20}
                  placeholder="رمز المرور"
                  value={enteredPin}
                  onChange={(e) => {
                    setEnteredPin(e.target.value);
                    setPinError(false);
                  }}
                  className="w-full p-3 text-center text-lg font-mono tracking-widest rounded-lg border border-[#E8DFD3] bg-white focus:outline-none focus:border-[#581420]"
                  autoFocus
                />
                {pinError && (
                  <p className="text-xs text-red-600 mt-1 font-semibold">
                    رمز المرور غير صحيح، يرجى المحاولة مرة أخرى
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 text-xs font-bold text-white bg-[#581420] hover:bg-[#430D17] rounded-md transition-all shadow-md cursor-pointer"
              >
                دخول للوحة الإدارة
              </button>
            </form>
          </div>
        ) : (
          /* AUTHENTICATED ADMIN CONSOLE */
          <div className="flex-1 overflow-hidden flex flex-col md:flex-row">
            
            {/* Sidebar Navigation */}
            <div className="w-full md:w-60 bg-[#FAF5EE] border-b md:border-b-0 md:border-l border-[#E8DFD3] p-3 sm:p-4 flex md:flex-col gap-1 overflow-x-auto md:overflow-visible shrink-0">
              <button
                onClick={() => {
                  setActiveTab('products');
                  setEditingProduct(null);
                  setEditingVideo(null);
                }}
                className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-lg text-xs font-bold transition-colors whitespace-nowrap cursor-pointer ${
                  activeTab === 'products'
                    ? 'bg-[#581420] text-white shadow-xs'
                    : 'text-[#554044] hover:bg-[#EAE0D3]'
                }`}
              >
                <Package className="w-4 h-4" />
                <span>الأصناف والمنتجات ({products.length})</span>
              </button>

              <button
                onClick={() => {
                  setActiveTab('tiktok');
                  setEditingProduct(null);
                  setEditingVideo(null);
                }}
                className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-lg text-xs font-bold transition-colors whitespace-nowrap cursor-pointer ${
                  activeTab === 'tiktok'
                    ? 'bg-[#581420] text-white shadow-xs'
                    : 'text-[#554044] hover:bg-[#EAE0D3]'
                }`}
              >
                <Play className="w-4 h-4 text-[#E5C378]" />
                <span>فيديوهات تيك توك ({tiktokVideos.length})</span>
              </button>

              <button
                onClick={() => {
                  setActiveTab('reviews');
                  setEditingProduct(null);
                  setEditingVideo(null);
                  setEditingReview(null);
                }}
                className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-lg text-xs font-bold transition-colors whitespace-nowrap cursor-pointer ${
                  activeTab === 'reviews'
                    ? 'bg-[#581420] text-white shadow-xs'
                    : 'text-[#554044] hover:bg-[#EAE0D3]'
                }`}
              >
                <MessageCircle className="w-4 h-4 text-[#25D366]" />
                <span>محادثات الواتساب ({whatsappReviews.length})</span>
              </button>

              <button
                onClick={() => {
                  setActiveTab('logo');
                  setEditingProduct(null);
                  setEditingVideo(null);
                }}
                className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-lg text-xs font-bold transition-colors whitespace-nowrap cursor-pointer ${
                  activeTab === 'logo'
                    ? 'bg-[#581420] text-white shadow-xs'
                    : 'text-[#554044] hover:bg-[#EAE0D3]'
                }`}
              >
                <ImageIcon className="w-4 h-4" />
                <span>الشعار والهوية</span>
              </button>

              <button
                onClick={() => {
                  setActiveTab('settings');
                  setEditingProduct(null);
                  setEditingVideo(null);
                }}
                className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-lg text-xs font-bold transition-colors whitespace-nowrap cursor-pointer ${
                  activeTab === 'settings'
                    ? 'bg-[#581420] text-white shadow-xs'
                    : 'text-[#554044] hover:bg-[#EAE0D3]'
                }`}
              >
                <Settings className="w-4 h-4" />
                <span>إعدادات التواصل والمتجر</span>
              </button>

              <div className="md:mt-auto pt-2 border-t border-[#E8DFD3] flex flex-col gap-1">
                <button
                  onClick={() => setIsAuthenticated(false)}
                  className="flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold text-[#8A2535] hover:bg-red-50 transition-colors"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>تسجيل الخروج</span>
                </button>
              </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6">
              
              {/* TAB 1: PRODUCTS MANAGEMENT */}
              {activeTab === 'products' && (
                <div className="space-y-6">
                  {/* Top Action Bar */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E8DFD3]">
                    <div>
                      <h3 className="text-lg font-bold text-[#350A11]">
                        قائمة أصناف ومنتجات كيان العود
                      </h3>
                      <p className="text-xs text-[#70555A]">
                        تحكم كامل بالصور، الأسعار، الأحجام، الشرح، والنوتات العطرية
                      </p>
                    </div>

                    <button
                      onClick={handleCreateNewClick}
                      className="flex items-center justify-center gap-1.5 px-4 py-2.5 text-xs font-bold text-white bg-[#581420] hover:bg-[#430D17] rounded-md transition-all shadow-xs cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                      <span>إضافة صنف جديد</span>
                    </button>
                  </div>

                  {/* Product Form Modal (Full Control for Editing or Creating) */}
                  {editingProduct && (
                    <div className="bg-white rounded-xl border-2 border-[#581420] p-4 sm:p-6 shadow-xl space-y-6 animate-fade-in">
                      <div className="flex items-center justify-between border-b border-[#F0E8DE] pb-3">
                        <div className="flex items-center gap-2">
                          <Package className="w-5 h-5 text-[#581420]" />
                          <h4 className="text-sm sm:text-base font-bold text-[#581420]">
                            {isCreatingNew ? 'إضافة صنف جديد' : `تعديل الصنف: ${editingProduct.name}`}
                          </h4>
                        </div>
                        <button
                          onClick={() => setEditingProduct(null)}
                          className="p-1 text-[#70555A] hover:text-black rounded"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>

                      <form onSubmit={handleSaveProduct} className="space-y-6">
                        
                        {/* 1. PRODUCT IMAGE UPLOAD / URL SECTION */}
                        <div className="bg-[#FAF7F2] p-4 rounded-xl border border-[#E8DFD3] space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-[#581420] flex items-center gap-1.5">
                              <ImageIcon className="w-4 h-4 text-[#C59B27]" />
                              <span>صورة الصنف (رفع من الجوال/الكمبيوتر أو رابط مباشر):</span>
                            </span>
                            {editingProduct.imageUrl && (
                              <button
                                type="button"
                                onClick={() => setEditingProduct({ ...editingProduct, imageUrl: '' })}
                                className="text-[11px] text-red-600 hover:underline"
                              >
                                إزالة الصورة واستعادة الرسم الافتراضي
                              </button>
                            )}
                          </div>

                          <div className="flex flex-col sm:flex-row gap-4 items-center">
                            {/* Image Preview Box */}
                            <div className="w-28 h-28 rounded-xl border-2 border-dashed border-[#C59B27] bg-white overflow-hidden flex items-center justify-center shrink-0 relative group">
                              {editingProduct.imageUrl ? (
                                <img
                                  src={editingProduct.imageUrl}
                                  alt="معاينة الصنف"
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <div className="text-center p-2 text-[#8A6A18]">
                                  <ImageIcon className="w-8 h-8 mx-auto opacity-40 mb-1" />
                                  <span className="text-[9px] block">رسم افتراضي مدمج</span>
                                </div>
                              )}
                            </div>

                            {/* Upload Controls */}
                            <div className="flex-1 w-full space-y-2">
                              <input
                                ref={productImageInputRef}
                                type="file"
                                accept="image/*"
                                onChange={handleProductImageUpload}
                                className="hidden"
                              />

                              <button
                                type="button"
                                onClick={() => productImageInputRef.current?.click()}
                                className="w-full py-2.5 px-3 text-xs font-bold text-white bg-[#581420] hover:bg-[#430D17] rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                              >
                                <Upload className="w-4 h-4 text-[#E5C378]" />
                                <span>رفع صورة الصنف من الجوال / الكمبيوتر</span>
                              </button>

                              <div className="text-center text-[10px] text-[#A88A91]">أو</div>

                              <input
                                type="url"
                                placeholder="أو الصق رابط صورة مباشرة هنا (URL)..."
                                value={editingProduct.imageUrl || ''}
                                onChange={(e) => setEditingProduct({ ...editingProduct, imageUrl: e.target.value })}
                                className="w-full text-xs p-2.5 rounded-lg border border-[#E8DFD3] bg-white focus:outline-none focus:border-[#581420] text-left dir-ltr"
                              />
                            </div>
                          </div>
                        </div>

                        {/* 2. BASIC INFO & PRICING */}
                        <div className="space-y-4">
                          <h5 className="text-xs font-bold text-[#350A11] border-b border-[#F0E8DE] pb-1.5">
                            البيانات الأساسية والأسعار:
                          </h5>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                              <label className="block text-xs font-bold text-[#554044] mb-1">
                                اسم الصنف:
                              </label>
                              <input
                                type="text"
                                required
                                placeholder="مثال: مستكة بلورية مسقاة بمسك الختام الملكي"
                                value={editingProduct.name}
                                onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                                className="w-full text-xs p-2.5 rounded-md border border-[#E8DFD3] bg-[#FAF7F2] focus:outline-none focus:border-[#581420]"
                              />
                            </div>

                            <div>
                              <label className="block text-xs font-bold text-[#554044] mb-1">
                                السطر التعريفي (وصف قصير):
                              </label>
                              <input
                                type="text"
                                required
                                placeholder="مثال: بلورات نقية مسقاة بزيوت عطرية فاخرة تدوم طويلاً"
                                value={editingProduct.subtitle}
                                onChange={(e) => setEditingProduct({ ...editingProduct, subtitle: e.target.value })}
                                className="w-full text-xs p-2.5 rounded-md border border-[#E8DFD3] bg-[#FAF7F2] focus:outline-none focus:border-[#581420]"
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                            <div>
                              <label className="block text-xs font-bold text-[#554044] mb-1">
                                القسم:
                              </label>
                              <select
                                value={editingProduct.category}
                                onChange={(e) => {
                                  const cat = e.target.value as 'mastic' | 'oud' | 'gifts';
                                  const label =
                                    cat === 'mastic'
                                      ? 'مستكة بلورية مسقاة'
                                      : cat === 'oud'
                                      ? 'عود ملبس بالمسك'
                                      : 'بوكسات وباقات إهداء';
                                  setEditingProduct({
                                    ...editingProduct,
                                    category: cat,
                                    categoryLabel: label
                                  });
                                }}
                                className="w-full text-xs p-2.5 rounded-md border border-[#E8DFD3] bg-[#FAF7F2] focus:outline-none focus:border-[#581420]"
                              >
                                <option value="mastic">مستكة بلورية مسقاة</option>
                                <option value="oud">عود ملبس بالمسك</option>
                                <option value="gifts">بوكسات وباقات إهداء</option>
                              </select>
                            </div>

                            <div>
                              <label className="block text-xs font-bold text-[#554044] mb-1">
                                السعر الحالي (ر.س):
                              </label>
                              <input
                                type="number"
                                required
                                min={1}
                                value={editingProduct.price}
                                onChange={(e) => {
                                  const p = Number(e.target.value);
                                  const updatedVariants = editingProduct.variants.map((v, i) =>
                                    i === 0 ? { ...v, price: p } : v
                                  );
                                  setEditingProduct({ ...editingProduct, price: p, variants: updatedVariants });
                                }}
                                className="w-full text-xs p-2.5 rounded-md border border-[#E8DFD3] bg-[#FAF7F2] focus:outline-none focus:border-[#581420] font-bold text-[#581420]"
                              />
                            </div>

                            <div>
                              <label className="block text-xs font-bold text-[#554044] mb-1">
                                السعر قبل الخصم (اختياري):
                              </label>
                              <input
                                type="number"
                                min={0}
                                placeholder="مثال: 150"
                                value={editingProduct.originalPrice || ''}
                                onChange={(e) =>
                                  setEditingProduct({
                                    ...editingProduct,
                                    originalPrice: e.target.value ? Number(e.target.value) : undefined
                                  })
                                }
                                className="w-full text-xs p-2.5 rounded-md border border-[#E8DFD3] bg-[#FAF7F2] focus:outline-none focus:border-[#581420]"
                              />
                            </div>

                            <div>
                              <label className="block text-xs font-bold text-[#554044] mb-1">
                                شارة العرض:
                              </label>
                              <input
                                type="text"
                                placeholder="مثال: الأكثر طلباً / جديد"
                                value={editingProduct.badge || ''}
                                onChange={(e) => setEditingProduct({ ...editingProduct, badge: e.target.value })}
                                className="w-full text-xs p-2.5 rounded-md border border-[#E8DFD3] bg-[#FAF7F2] focus:outline-none focus:border-[#581420]"
                              />
                            </div>
                          </div>
                        </div>

                        {/* 3. DYNAMIC SIZES & VARIANTS MANAGER */}
                        <div className="bg-[#FAF5EE] p-4 rounded-xl border border-[#E8DFD3] space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-[#581420] flex items-center gap-1.5">
                              <Layers className="w-4 h-4 text-[#C59B27]" />
                              <span>الأحجام والأوزان والأسعار المتاحة للزبون:</span>
                            </span>
                            <button
                              type="button"
                              onClick={handleAddVariant}
                              className="flex items-center gap-1 text-[11px] font-bold text-[#581420] bg-white px-2.5 py-1 rounded border border-[#E8DFD3] hover:bg-[#581420] hover:text-white transition-colors"
                            >
                              <Plus className="w-3.5 h-3.5" />
                              <span>إضافة حجم آخر</span>
                            </button>
                          </div>

                          <div className="space-y-2">
                            {editingProduct.variants.map((v, idx) => (
                              <div
                                key={v.id || idx}
                                className="grid grid-cols-1 sm:grid-cols-12 gap-2 bg-white p-2.5 rounded-lg border border-[#E8DFD3] items-center"
                              >
                                <div className="sm:col-span-5">
                                  <label className="block text-[10px] text-[#70555A]">اسم الحجم/الوصف:</label>
                                  <input
                                    type="text"
                                    value={v.name}
                                    onChange={(e) => handleUpdateVariant(idx, 'name', e.target.value)}
                                    placeholder="مثال: علبة فاخرة (100 غرام)"
                                    className="w-full text-xs p-1.5 rounded border border-[#E8DFD3] bg-[#FAF7F2]"
                                  />
                                </div>

                                <div className="sm:col-span-3">
                                  <label className="block text-[10px] text-[#70555A]">الوزن:</label>
                                  <input
                                    type="text"
                                    value={v.weight}
                                    onChange={(e) => handleUpdateVariant(idx, 'weight', e.target.value)}
                                    placeholder="100 غرام / أوقية"
                                    className="w-full text-xs p-1.5 rounded border border-[#E8DFD3] bg-[#FAF7F2]"
                                  />
                                </div>

                                <div className="sm:col-span-3">
                                  <label className="block text-[10px] text-[#70555A]">السعر (ر.س):</label>
                                  <input
                                    type="number"
                                    min={1}
                                    value={v.price}
                                    onChange={(e) => handleUpdateVariant(idx, 'price', Number(e.target.value))}
                                    className="w-full text-xs p-1.5 rounded border border-[#E8DFD3] bg-[#FAF7F2] font-bold text-[#581420]"
                                  />
                                </div>

                                <div className="sm:col-span-1 flex justify-end pt-3 sm:pt-0">
                                  <button
                                    type="button"
                                    onClick={() => handleRemoveVariant(idx)}
                                    className="p-1.5 text-red-600 hover:bg-red-50 rounded"
                                    title="حذف هذا الحجم"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* 4. DESCRIPTION & NOTES */}
                        <div className="space-y-4">
                          <h5 className="text-xs font-bold text-[#350A11] border-b border-[#F0E8DE] pb-1.5">
                            الشرح التفصيلي والهرم العطري:
                          </h5>

                          <div>
                            <label className="block text-xs font-bold text-[#554044] mb-1">
                              الشرح الكامل للصنف ومميزاته:
                            </label>
                            <textarea
                              rows={3}
                              value={editingProduct.description}
                              onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                              placeholder="اكتب شرحاً مفصلاً يصف جمال الرائحة والخلطة..."
                              className="w-full text-xs p-2.5 rounded-md border border-[#E8DFD3] bg-[#FAF7F2] focus:outline-none focus:border-[#581420] leading-relaxed"
                            />
                          </div>

                          {/* Scent notes pyramid */}
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-[#FAF7F2] p-3 rounded-lg border border-[#E8DFD3]">
                            <div>
                              <label className="block text-[11px] font-bold text-[#581420] mb-1">
                                قمة العطر (الافتتاحية):
                              </label>
                              <input
                                type="text"
                                placeholder="مثال: مسك الختام المنعش"
                                value={editingProduct.scentNotes.top}
                                onChange={(e) =>
                                  setEditingProduct({
                                    ...editingProduct,
                                    scentNotes: { ...editingProduct.scentNotes, top: e.target.value }
                                  })
                                }
                                className="w-full text-xs p-2 rounded border border-[#E8DFD3] bg-white"
                              />
                            </div>

                            <div>
                              <label className="block text-[11px] font-bold text-[#581420] mb-1">
                                قلب العطر:
                              </label>
                              <input
                                type="text"
                                placeholder="مثال: قطرات العنبر الأشهب"
                                value={editingProduct.scentNotes.heart}
                                onChange={(e) =>
                                  setEditingProduct({
                                    ...editingProduct,
                                    scentNotes: { ...editingProduct.scentNotes, heart: e.target.value }
                                  })
                                }
                                className="w-full text-xs p-2 rounded border border-[#E8DFD3] bg-white"
                              />
                            </div>

                            <div>
                              <label className="block text-[11px] font-bold text-[#581420] mb-1">
                                قاعدة العطر (الثبات):
                              </label>
                              <input
                                type="text"
                                placeholder="مثال: بخور المستكة والعود الطبيعي"
                                value={editingProduct.scentNotes.base}
                                onChange={(e) =>
                                  setEditingProduct({
                                    ...editingProduct,
                                    scentNotes: { ...editingProduct.scentNotes, base: e.target.value }
                                  })
                                }
                                className="w-full text-xs p-2 rounded border border-[#E8DFD3] bg-white"
                              />
                            </div>
                          </div>

                          {/* Usage and Crafting Guide */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                              <label className="block text-xs font-bold text-[#554044] mb-1">
                                طريقة التبخير والاستخدام:
                              </label>
                              <input
                                type="text"
                                value={editingProduct.usageInstructions}
                                onChange={(e) => setEditingProduct({ ...editingProduct, usageInstructions: e.target.value })}
                                className="w-full text-xs p-2.5 rounded-md border border-[#E8DFD3] bg-[#FAF7F2]"
                              />
                            </div>

                            <div>
                              <label className="block text-xs font-bold text-[#554044] mb-1">
                                تفاصيل الصنعة والتعتيق:
                              </label>
                              <input
                                type="text"
                                value={editingProduct.craftingDetails}
                                onChange={(e) => setEditingProduct({ ...editingProduct, craftingDetails: e.target.value })}
                                className="w-full text-xs p-2.5 rounded-md border border-[#E8DFD3] bg-[#FAF7F2]"
                              />
                            </div>
                          </div>
                        </div>

                        {/* Form Action Buttons */}
                        <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#F0E8DE]">
                          <button
                            type="button"
                            onClick={() => setEditingProduct(null)}
                            className="px-5 py-2.5 text-xs font-semibold text-[#70555A] hover:bg-[#FAF5EE] rounded-lg transition-colors"
                          >
                            إلغاء
                          </button>
                          <button
                            type="submit"
                            className="flex items-center gap-2 px-6 py-2.5 text-xs font-bold text-white bg-[#581420] hover:bg-[#430D17] rounded-lg shadow-md cursor-pointer transition-all active:scale-98"
                          >
                            <Save className="w-4 h-4 text-[#E5C378]" />
                            <span>حفظ الصنف وتطبيقه في المتجر</span>
                          </button>
                        </div>
                      </form>
                    </div>
                  )}

                  {/* Products Table / Cards List */}
                  <div className="space-y-3">
                    {products.map((product) => (
                      <div
                        key={product.id}
                        className="bg-white rounded-xl border border-[#E8DFD3] p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-[#581420]/40 transition-all shadow-xs"
                      >
                        <div className="flex items-center gap-3.5">
                          {/* Image Thumbnail */}
                          <div className="w-14 h-14 rounded-lg bg-[#FAF5EE] border border-[#E8DFD3] overflow-hidden flex items-center justify-center shrink-0">
                            {product.imageUrl ? (
                              <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
                            ) : (
                              <Package className="w-6 h-6 text-[#581420]/50" />
                            )}
                          </div>

                          <div className="space-y-1">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="text-xs sm:text-sm font-bold text-[#350A11]">
                                {product.name}
                              </span>
                              {product.badge && (
                                <span className="text-[10px] font-bold px-2 py-0.5 bg-[#581420] text-[#FAF5EE] rounded">
                                  {product.badge}
                                </span>
                              )}
                            </div>
                            <p className="text-[11px] text-[#70555A] line-clamp-1">
                              {product.subtitle}
                            </p>
                            <div className="flex items-center gap-3 text-xs text-[#8A2535] font-semibold pt-0.5 flex-wrap">
                              <span>القسم: {product.categoryLabel}</span>
                              <span>·</span>
                              <span className="text-[#581420] font-extrabold tabular-nums">
                                السعر: {product.price} ر.س
                              </span>
                              {product.originalPrice && (
                                <span className="text-neutral-400 line-through text-[11px]">
                                  {product.originalPrice} ر.س
                                </span>
                              )}
                              <span>·</span>
                              <span className="text-[11px] text-[#554044]">
                                {product.variants.length} أحجام متاحة
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                          <button
                            onClick={() => {
                              setEditingProduct(product);
                              setIsCreatingNew(false);
                            }}
                            className="flex items-center gap-1 px-3.5 py-2 text-xs font-bold text-[#581420] bg-[#FAF5EE] hover:bg-[#581420] hover:text-white rounded-lg transition-colors border border-[#E8DFD3]"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                            <span>تعديل</span>
                          </button>

                          <button
                            onClick={() => handleDuplicateProduct(product)}
                            className="p-2 text-[#554044] hover:bg-[#FAF5EE] rounded-lg transition-colors"
                            title="تكرار الصنف"
                          >
                            <Copy className="w-4 h-4" />
                          </button>

                          <button
                            onClick={() => handleDeleteProduct(product.id, product.name)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="حذف الصنف"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 2: TIKTOK VIDEOS MANAGEMENT */}
              {activeTab === 'tiktok' && (
                <div className="space-y-6">
                  {/* Top Action Bar */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E8DFD3]">
                    <div>
                      <h3 className="text-lg font-bold text-[#350A11] flex items-center gap-2">
                        <Play className="w-5 h-5 text-[#581420]" />
                        <span>إدارة فيديوهات تيك توك المعروضة</span>
                      </h3>
                      <p className="text-xs text-[#70555A]">
                        تعديل روابط المقاطع المباشرة، الأوصاف، التصنيفات، وأغلفة الفيديوهات
                      </p>
                    </div>

                    <button
                      onClick={handleCreateNewVideo}
                      className="flex items-center justify-center gap-1.5 px-4 py-2.5 text-xs font-bold text-white bg-[#581420] hover:bg-[#430D17] rounded-md transition-all shadow-xs cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                      <span>إضافة فيديو جديد</span>
                    </button>
                  </div>

                  {/* Video Edit Form */}
                  {editingVideo && (
                    <div className="bg-white rounded-xl border-2 border-[#581420] p-4 sm:p-6 shadow-xl space-y-4 animate-fade-in">
                      <div className="flex items-center justify-between border-b border-[#F0E8DE] pb-3">
                        <h4 className="text-sm sm:text-base font-bold text-[#581420]">
                          {isCreatingNewVideo ? 'إضافة فيديو تيك توك جديد' : `تعديل الفيديو: ${editingVideo.title || 'مقطع تيك توك'}`}
                        </h4>
                        <button
                          onClick={() => setEditingVideo(null)}
                          className="p-1 text-[#70555A] hover:text-black rounded"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>

                      <form onSubmit={handleSaveVideo} className="space-y-4">
                        <div>
                          <label className="block text-xs font-bold text-[#554044] mb-1">
                            رابط المقطع على تيك توك (URL):
                          </label>
                          <input
                            type="url"
                            required
                            placeholder="مثال: https://www.tiktok.com/@kayan_alood/video/7345678901234567890"
                            value={editingVideo.url}
                            onChange={(e) => {
                              const inputVal = e.target.value;
                              const match = inputVal.match(/\/video\/(\d+)/);
                              setEditingVideo({
                                ...editingVideo,
                                url: inputVal,
                                videoId: match ? match[1] : undefined
                              });
                            }}
                            className="w-full text-xs p-2.5 rounded-lg border border-[#E8DFD3] bg-[#FAF7F2] font-mono dir-ltr text-left focus:outline-none focus:border-[#581420]"
                          />
                          {editingVideo.videoId && (
                            <div className="mt-1.5 p-2 bg-[#2D161F] text-[#FAF5EE] rounded border border-[#E5C378]/30 flex items-center justify-between text-[11px]">
                              <span className="text-[#E5C378] font-bold">✓ تم ربط مشغل تيك توك الفردي بنجاح</span>
                              <span className="font-mono text-[10px] text-neutral-300">ID: {editingVideo.videoId}</span>
                            </div>
                          )}
                          <span className="text-[10px] text-[#8A2535] mt-1 block">
                            * سيتم تشغيل هذا المقطع فقط بمفرده بشكل نقي بدون أي فيديوهات أخرى أو إعلانات تحته.
                          </span>
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-[#554044] mb-1">
                            أو رابط فيديو حي مباشر (MP4 اختياري):
                          </label>
                          <input
                            type="url"
                            placeholder="مثال: https://.../video.mp4"
                            value={editingVideo.videoSourceUrl || ''}
                            onChange={(e) => setEditingVideo({ ...editingVideo, videoSourceUrl: e.target.value })}
                            className="w-full text-xs p-2.5 rounded-lg border border-[#E8DFD3] bg-[#FAF7F2] font-mono dir-ltr text-left focus:outline-none focus:border-[#581420]"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-[#554044] mb-1">
                            الوصف المكتوب وعنوان الفيديو:
                          </label>
                          <textarea
                            rows={2}
                            required
                            placeholder="مثال: كواليس سقاية ونقع المستكة البلورية بمسك الختام الملكي 🤍"
                            value={editingVideo.title}
                            onChange={(e) => setEditingVideo({ ...editingVideo, title: e.target.value })}
                            className="w-full text-xs p-2.5 rounded-lg border border-[#E8DFD3] bg-[#FAF7F2] focus:outline-none focus:border-[#581420]"
                          />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          <div>
                            <label className="block text-xs font-bold text-[#554044] mb-1">
                              التصنيف (مثال: المستكة البلورية):
                            </label>
                            <input
                              type="text"
                              value={editingVideo.category}
                              onChange={(e) => setEditingVideo({ ...editingVideo, category: e.target.value })}
                              className="w-full text-xs p-2.5 rounded-lg border border-[#E8DFD3] bg-[#FAF7F2]"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-bold text-[#554044] mb-1">
                              الشارة (مثال: الأكثر تداولاً):
                            </label>
                            <input
                              type="text"
                              value={editingVideo.badge}
                              onChange={(e) => setEditingVideo({ ...editingVideo, badge: e.target.value })}
                              className="w-full text-xs p-2.5 rounded-lg border border-[#E8DFD3] bg-[#FAF7F2]"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-bold text-[#554044] mb-1">
                              عدد المشاهدات التقريبي:
                            </label>
                            <input
                              type="text"
                              value={editingVideo.views || '50K'}
                              onChange={(e) => setEditingVideo({ ...editingVideo, views: e.target.value })}
                              className="w-full text-xs p-2.5 rounded-lg border border-[#E8DFD3] bg-[#FAF7F2]"
                            />
                          </div>
                        </div>

                        {/* Optional Custom Cover Upload */}
                        <div className="bg-[#FAF7F2] p-3 rounded-lg border border-[#E8DFD3] space-y-2">
                          <label className="block text-[11px] font-bold text-[#581420]">
                            غلاف مخصص للفيديو (اختياري):
                          </label>
                          <div className="flex items-center gap-3">
                            <input
                              ref={videoThumbnailInputRef}
                              type="file"
                              accept="image/*"
                              onChange={handleVideoThumbnailUpload}
                              className="hidden"
                            />
                            <button
                              type="button"
                              onClick={() => videoThumbnailInputRef.current?.click()}
                              className="px-3 py-1.5 text-xs font-bold text-[#581420] bg-white border border-[#E8DFD3] rounded hover:bg-[#581420] hover:text-white transition-colors"
                            >
                              اختيار صورة غلاف من الجهاز
                            </button>
                            {editingVideo.customThumbnailUrl && (
                              <button
                                type="button"
                                onClick={() => setEditingVideo({ ...editingVideo, customThumbnailUrl: '' })}
                                className="text-xs text-red-600 hover:underline"
                              >
                                حذف الغلاف
                              </button>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center justify-end gap-2 pt-3 border-t border-[#F0E8DE]">
                          <button
                            type="button"
                            onClick={() => setEditingVideo(null)}
                            className="px-4 py-2 text-xs font-semibold text-[#70555A] hover:bg-[#FAF5EE] rounded"
                          >
                            إلغاء
                          </button>
                          <button
                            type="submit"
                            className="px-5 py-2 text-xs font-bold text-white bg-[#581420] hover:bg-[#430D17] rounded shadow cursor-pointer flex items-center gap-1.5"
                          >
                            <Save className="w-3.5 h-3.5 text-[#E5C378]" />
                            <span>حفظ الفيديو</span>
                          </button>
                        </div>
                      </form>
                    </div>
                  )}

                  {/* Videos List */}
                  <div className="space-y-3">
                    {tiktokVideos.map((video) => (
                      <div
                        key={video.id}
                        className="bg-white rounded-xl border border-[#E8DFD3] p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-[#581420]/40 transition-all shadow-xs"
                      >
                        <div className="space-y-1 flex-1">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold px-2 py-0.5 bg-[#581420] text-[#FAF5EE] rounded text-[10px]">
                              {video.badge}
                            </span>
                            <span className="text-xs text-[#8A2535] font-semibold">
                              {video.category}
                            </span>
                          </div>
                          <h4 className="text-xs sm:text-sm font-bold text-[#350A11]">
                            {video.title}
                          </h4>
                          <p className="text-[11px] text-[#70555A] font-mono dir-ltr text-right truncate max-w-lg">
                            {video.url}
                          </p>
                        </div>

                        <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                          <a
                            href={video.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 text-[#581420] hover:bg-[#FAF5EE] rounded-lg transition-colors border border-[#E8DFD3]"
                            title="معاينة في تيك توك"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>

                          <button
                            onClick={() => {
                              setEditingVideo(video);
                              setIsCreatingNewVideo(false);
                            }}
                            className="flex items-center gap-1 px-3.5 py-2 text-xs font-bold text-[#581420] bg-[#FAF5EE] hover:bg-[#581420] hover:text-white rounded-lg transition-colors border border-[#E8DFD3]"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                            <span>تعديل</span>
                          </button>

                          <button
                            onClick={() => handleDeleteVideo(video.id, video.title)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="حذف الفيديو"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB: WHATSAPP REVIEWS & SCREENSHOTS */}
              {activeTab === 'reviews' && (
                <div className="space-y-6">
                  {/* Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#E8DFD3]">
                    <div>
                      <h3 className="text-lg font-bold text-[#350A11] flex items-center gap-2">
                        <span>محادثات وتقييمات العملاء (واتساب)</span>
                        <span className="text-xs bg-[#25D366]/20 text-[#075E54] px-2 py-0.5 rounded-full font-bold">
                          {whatsappReviews.length} محادثات
                        </span>
                      </h3>
                      <p className="text-xs text-[#70555A] mt-0.5">
                        ارفع صور سكرين شوت حقيقية لرسائل ومحادثات العملاء على واتساب التي يمدحون فيها المنتجات والتوصيل، أو عدّل الأسماء والنصوص.
                      </p>
                    </div>

                    {!editingReview && (
                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={handleResetWhatsAppReviews}
                          className="flex items-center gap-1 px-3 py-2 text-xs font-semibold text-[#8A2535] bg-white border border-[#E8DFD3] hover:bg-[#FAF5EE] rounded-lg transition-colors cursor-pointer"
                          title="استعادة المحادثات الافتراضية"
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                          <span className="hidden sm:inline">استعادة الافتراضي</span>
                        </button>

                        <button
                          onClick={handleCreateNewReview}
                          className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-[#581420] hover:bg-[#430D17] rounded-lg shadow-sm transition-all cursor-pointer"
                        >
                          <Plus className="w-4 h-4" />
                          <span>إضافة محادثة عميل جديدة</span>
                        </button>
                      </div>
                    )}
                  </div>

                  {/* EDIT / CREATE FORM */}
                  {editingReview ? (
                    <form onSubmit={handleSaveReview} className="bg-white rounded-2xl border border-[#E8DFD3] p-4 sm:p-6 shadow-sm space-y-6 animate-fade-in">
                      <div className="flex items-center justify-between border-b border-[#F0E8DE] pb-4">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-[#25D366]/15 flex items-center justify-center text-[#075E54]">
                            <MessageCircle className="w-4 h-4" />
                          </div>
                          <div>
                            <h4 className="text-sm font-bold text-[#350A11]">
                              {isCreatingNewReview ? 'إضافة محادثة عميل جديدة' : `تعديل محادثة: ${editingReview.customerName || 'عميل'}`}
                            </h4>
                            <p className="text-[11px] text-[#70555A]">
                              ارفع صورة سكرين شوت من واتساب أو اكتب تفاصيل رسالة المديح
                            </p>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => {
                            setEditingReview(null);
                            setIsCreatingNewReview(false);
                          }}
                          className="p-1 text-neutral-400 hover:text-neutral-700 rounded-lg hover:bg-neutral-100"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>

                      {/* SECTION 1: SCREENSHOT UPLOAD */}
                      <div className="bg-[#FAF7F2] rounded-xl border border-[#E8DFD3] p-4 sm:p-5 space-y-4">
                        <div className="flex items-center justify-between">
                          <label className="text-xs font-bold text-[#350A11] flex items-center gap-2">
                            <ImageIcon className="w-4 h-4 text-[#8A2535]" />
                            <span>صورة سكرين شوت محادثة الواتساب (لإبراز المديح الحقيقي)</span>
                          </label>
                          <span className="text-[10px] text-[#70555A]">
                            تظهر صورة المحادثة مباشرة للعملاء مع إمكانية التكبير
                          </span>
                        </div>

                        <input
                          ref={reviewImageInputRef}
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleReviewImageUpload}
                        />

                        {editingReview.imageUrl ? (
                          <div className="flex flex-col sm:flex-row items-center gap-4 bg-white p-4 rounded-xl border border-[#E0D8CC]">
                            {/* Preview */}
                            <div className="relative w-32 h-44 sm:w-36 sm:h-48 rounded-lg overflow-hidden border border-[#D1D7DB] shadow-md bg-neutral-100 shrink-0">
                              <img
                                src={editingReview.imageUrl}
                                alt={editingReview.customerName}
                                className="w-full h-full object-cover"
                              />
                              <div className="absolute top-1 right-1 bg-[#25D366] text-white text-[9px] px-1.5 py-0.5 rounded font-bold shadow-xs">
                                تم الرفع ✓
                              </div>
                            </div>

                            {/* Controls */}
                            <div className="flex-1 space-y-2 text-center sm:text-right w-full">
                              <span className="text-xs font-bold text-[#350A11] block">
                                تم حفظ صورة المحادثة بنجاح
                              </span>
                              <p className="text-[11px] text-[#70555A] leading-relaxed">
                                ستظهر هذه الصورة في كارت التقييمات في المتجر، وعند النقر عليها سيتم تكبيرها بدقة عالية للزوار كإثبات موثق.
                              </p>

                              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-2">
                                <button
                                  type="button"
                                  onClick={() => reviewImageInputRef.current?.click()}
                                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-[#581420] bg-[#FAF5EE] hover:bg-[#581420] hover:text-white rounded-lg border border-[#E8DFD3] transition-colors cursor-pointer"
                                >
                                  <Upload className="w-3.5 h-3.5" />
                                  <span>تغيير الصورة من الجوال/الكمبيوتر</span>
                                </button>

                                <button
                                  type="button"
                                  onClick={() => setEditingReview({ ...editingReview, imageUrl: undefined })}
                                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                  <span>إزالة الصورة والاعتماد على النص</span>
                                </button>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="space-y-3">
                            <div
                              onClick={() => reviewImageInputRef.current?.click()}
                              className="border-2 border-dashed border-[#C59B27]/50 hover:border-[#581420] bg-white hover:bg-[#FAF5EE] rounded-xl p-6 sm:p-8 text-center cursor-pointer transition-all group flex flex-col items-center justify-center space-y-2"
                            >
                              <div className="w-12 h-12 rounded-full bg-[#25D366]/10 text-[#075E54] flex items-center justify-center group-hover:scale-110 transition-transform">
                                <Upload className="w-6 h-6 text-[#25D366]" />
                              </div>
                              <div className="space-y-1">
                                <span className="text-xs sm:text-sm font-bold text-[#350A11] block">
                                  انقر هنا لرفع سكرين شوت محادثة الواتساب من الجوال أو الكمبيوتر
                                </span>
                                <span className="text-[11px] text-[#70555A] block">
                                  اختر صورة المحادثة (PNG, JPG) وسيتم ضغطها وتجهيزها تلقائياً للمتجر
                                </span>
                              </div>
                            </div>

                            {/* Direct URL input fallback */}
                            <div className="flex items-center gap-2">
                              <input
                                type="text"
                                placeholder="أو الصق رابط صورة سكرين شوت مباشر (URL) مثل: https://..."
                                value={editingReview.imageUrl || ''}
                                onChange={(e) => setEditingReview({ ...editingReview, imageUrl: e.target.value })}
                                className="flex-1 text-xs p-2.5 rounded-lg border border-[#E8DFD3] bg-white dir-ltr text-left"
                              />
                            </div>
                          </div>
                        )}
                      </div>

                      {/* SECTION 2: CUSTOMER & PRODUCT DETAILS */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-[#554044] mb-1">
                            اسم العميل / العميلة: <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="مثال: أم ريان الغامدي"
                            value={editingReview.customerName}
                            onChange={(e) => setEditingReview({ ...editingReview, customerName: e.target.value })}
                            className="w-full text-xs p-2.5 rounded-lg border border-[#E8DFD3] bg-white focus:outline-none focus:border-[#581420]"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-[#554044] mb-1">
                            المدينة والحي: <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="مثال: جدة - حي الشاطئ أو الرياض"
                            value={editingReview.city}
                            onChange={(e) => setEditingReview({ ...editingReview, city: e.target.value })}
                            className="w-full text-xs p-2.5 rounded-lg border border-[#E8DFD3] bg-white focus:outline-none focus:border-[#581420]"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-[#554044] mb-1">
                            اسم المنتج أو الطلب: <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="مثال: مستكة بلورية بمسك الختام"
                            value={editingReview.productName}
                            onChange={(e) => setEditingReview({ ...editingReview, productName: e.target.value })}
                            className="w-full text-xs p-2.5 rounded-lg border border-[#E8DFD3] bg-white focus:outline-none focus:border-[#581420]"
                          />
                        </div>
                      </div>

                      {/* SECTION 3: TIME / DATE */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-[#554044] mb-1">
                            تاريخ أو توقيت المحادثة:
                          </label>
                          <input
                            type="text"
                            placeholder="مثال: اليوم، 10:24 م أو أمس"
                            value={editingReview.date || ''}
                            onChange={(e) => setEditingReview({ ...editingReview, date: e.target.value })}
                            className="w-full text-xs p-2.5 rounded-lg border border-[#E8DFD3] bg-white focus:outline-none focus:border-[#581420]"
                          />
                        </div>
                      </div>

                      {/* SECTION 4: TEXT SNIPPET */}
                      <div>
                        <label className="block text-xs font-bold text-[#554044] mb-1">
                          نص رسالة ومديح العميل: <span className="text-red-500">*</span>
                        </label>
                        <textarea
                          required
                          rows={4}
                          placeholder="اكتب ما قاله العميل في المحادثة..."
                          value={editingReview.textSnippet}
                          onChange={(e) => setEditingReview({ ...editingReview, textSnippet: e.target.value })}
                          className="w-full text-xs p-3 rounded-lg border border-[#E8DFD3] bg-white focus:outline-none focus:border-[#581420] leading-relaxed font-tajawal"
                        />
                        <p className="text-[10px] text-[#70555A] mt-1">
                          يظهر هذا النص في بطاقة المحادثة أو كشرح توضيحي للمحادثة.
                        </p>
                      </div>

                      {/* BUTTONS */}
                      <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#F0E8DE]">
                        <button
                          type="button"
                          onClick={() => {
                            setEditingReview(null);
                            setIsCreatingNewReview(false);
                          }}
                          className="px-4 py-2 text-xs font-semibold text-[#70555A] hover:bg-neutral-100 rounded-lg transition-colors cursor-pointer"
                        >
                          إلغاء
                        </button>

                        <button
                          type="submit"
                          className="flex items-center gap-1.5 px-6 py-2.5 text-xs font-bold text-white bg-[#581420] hover:bg-[#430D17] rounded-lg shadow-md transition-all cursor-pointer"
                        >
                          <Save className="w-4 h-4" />
                          <span>حفظ محادثة العميل</span>
                        </button>
                      </div>
                    </form>
                  ) : (
                    /* LIST OF REVIEWS */
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {whatsappReviews.map((rev) => (
                        <div
                          key={rev.id}
                          className="bg-white rounded-xl border border-[#E8DFD3] p-4 flex flex-col justify-between shadow-xs hover:shadow-md transition-all space-y-3"
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex items-center gap-2.5">
                              <div className="w-9 h-9 rounded-full bg-[#128C7E] text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-inner">
                                {rev.customerName.charAt(0) || 'ع'}
                              </div>
                              <div>
                                <h4 className="text-xs font-bold text-[#350A11] flex items-center gap-1.5">
                                  <span>{rev.customerName}</span>
                                  <CheckCircle className="w-3.5 h-3.5 text-[#25D366]" />
                                </h4>
                                <span className="text-[10px] text-[#8A2535]">
                                  {rev.city} · {rev.productName}
                                </span>
                              </div>
                            </div>

                            {rev.imageUrl ? (
                              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                                <ImageIcon className="w-3 h-3" />
                                <span>سكرين شوت مرفق</span>
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[#075E54] bg-[#25D366]/10 px-2 py-0.5 rounded border border-[#25D366]/30">
                                <MessageCircle className="w-3 h-3" />
                                <span>نص محادثة</span>
                              </span>
                            )}
                          </div>

                          {/* Preview image if present */}
                          {rev.imageUrl && (
                            <div className="relative h-32 w-full rounded-lg overflow-hidden border border-[#D1D7DB] bg-neutral-50 flex items-center justify-center">
                              <img
                                src={rev.imageUrl}
                                alt={rev.customerName}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          )}

                          {/* Snippet */}
                          <div className="bg-[#FAF7F2] p-2.5 rounded-lg border border-[#F0E8DE] text-[11px] text-[#4A373A] leading-relaxed line-clamp-3">
                            «{rev.textSnippet}»
                          </div>

                          {/* Footer and Actions */}
                          <div className="flex items-center justify-between pt-2 border-t border-[#F0E8DE] text-xs">
                            <span className="text-[10px] text-neutral-400 font-mono">
                              {rev.date || 'اليوم'}
                            </span>

                            <div className="flex items-center gap-1.5">
                              <button
                                type="button"
                                onClick={() => {
                                  setEditingReview(rev);
                                  setIsCreatingNewReview(false);
                                }}
                                className="flex items-center gap-1 px-3 py-1.5 text-xs font-bold text-[#581420] bg-[#FAF5EE] hover:bg-[#581420] hover:text-white rounded-md transition-colors border border-[#E8DFD3] cursor-pointer"
                              >
                                <Edit2 className="w-3.5 h-3.5" />
                                <span>تعديل / رفع صورة</span>
                              </button>

                              <button
                                type="button"
                                onClick={() => handleDeleteReview(rev.id, rev.customerName)}
                                className="p-1.5 text-red-600 hover:bg-red-50 rounded-md transition-colors cursor-pointer"
                                title="حذف المحادثة"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* TAB 3: LOGO MANAGEMENT */}
              {activeTab === 'logo' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-bold text-[#350A11]">
                      إدارة شعار وهويّة كيان العود
                    </h3>
                    <p className="text-xs text-[#70555A]">
                      يمكنك رفع ملف الشعار الخاص بك من جوالك أو كمبيوترك في أي وقت أو استعادة الشعار الأصلي
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Current Logo Preview */}
                    <div className="bg-white rounded-xl border border-[#E8DFD3] p-6 flex flex-col items-center justify-center space-y-4 shadow-xs">
                      <span className="text-xs font-bold text-[#8A2535]">
                        الشعار المعروض حالياً في المتجر:
                      </span>

                      <div className="w-36 h-36 rounded-full bg-[#FAF5EE] border border-[#E8DFD3] p-2 flex items-center justify-center shadow-inner">
                        <Logo size="xl" customLogoUrl={settings.customLogoUrl} />
                      </div>

                      <div className="text-center space-y-1">
                        <span className="text-xs font-bold text-[#350A11] block">
                          {settings.customLogoUrl ? 'شعار مخصص تم رفعه' : 'الشعار الأصلي الافتراضي (SVG)'}
                        </span>
                        <span className="text-[11px] text-[#70555A] block">
                          يظهر في الهيدر، الهيرو، الفوتر، وأيقونة المتصفح
                        </span>
                      </div>
                    </div>

                    {/* Logo Upload & Reset Controls */}
                    <div className="bg-white rounded-xl border border-[#E8DFD3] p-6 flex flex-col justify-between space-y-4 shadow-xs">
                      <div className="space-y-3">
                        <h4 className="text-sm font-bold text-[#581420]">
                          رفع وتغيير الشعار:
                        </h4>
                        <p className="text-xs text-[#70555A] leading-relaxed">
                          اختر ملف الشعار (صيغة PNG، JPG، SVG) من جهازك وسيتم تطبيقه فوراً وحفظه لجميع زوار المتجر:
                        </p>

                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/*"
                          onChange={handleLogoUpload}
                          className="hidden"
                        />

                        <button
                          onClick={() => fileInputRef.current?.click()}
                          className="w-full py-3 px-4 text-xs font-bold text-white bg-[#581420] hover:bg-[#430D17] rounded-lg transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer"
                        >
                          <Upload className="w-4 h-4 text-[#E5C378]" />
                          <span>اختيار ملف الشعار من الجهاز</span>
                        </button>
                      </div>

                      {settings.customLogoUrl && (
                        <div className="pt-4 border-t border-[#F0E8DE]">
                          <button
                            onClick={handleResetToDefaultLogo}
                            className="w-full py-2.5 px-3 text-xs font-bold text-[#8A2535] bg-red-50 hover:bg-red-100 rounded-lg transition-colors flex items-center justify-center gap-1.5"
                          >
                            <RotateCcw className="w-3.5 h-3.5" />
                            <span>استعادة الشعار الأصلي الافتراضي</span>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 4: STORE SETTINGS */}
              {activeTab === 'settings' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-bold text-[#350A11]">
                      إعدادات التواصل والتوصيل
                    </h3>
                    <p className="text-xs text-[#70555A]">
                      تعديل رقم الواتساب، حساب تيك توك، رسوم الشحن، وشريط الإعلانات
                    </p>
                  </div>

                  <div className="bg-white rounded-xl border border-[#E8DFD3] p-5 space-y-4 shadow-xs">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-[#554044] mb-1">
                          رقم الواتساب للطلبات (مع رمز الدولة):
                        </label>
                        <input
                          type="text"
                          value={settings.whatsappNumber}
                          onChange={(e) => onUpdateSettings({ ...settings, whatsappNumber: e.target.value })}
                          className="w-full text-xs p-2.5 rounded-md border border-[#E8DFD3] bg-[#FAF7F2] font-mono dir-ltr text-left"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-[#554044] mb-1">
                          رابط الواتساب المباشر:
                        </label>
                        <input
                          type="text"
                          value={settings.whatsappDirectLink}
                          onChange={(e) => onUpdateSettings({ ...settings, whatsappDirectLink: e.target.value })}
                          className="w-full text-xs p-2.5 rounded-md border border-[#E8DFD3] bg-[#FAF7F2] font-mono dir-ltr text-left"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-[#554044] mb-1">
                          معرّف تيك توك:
                        </label>
                        <input
                          type="text"
                          value={settings.tiktokHandle}
                          onChange={(e) => onUpdateSettings({ ...settings, tiktokHandle: e.target.value })}
                          className="w-full text-xs p-2.5 rounded-md border border-[#E8DFD3] bg-[#FAF7F2] font-mono dir-ltr text-left"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-[#554044] mb-1">
                          رابط صفحة تيك توك:
                        </label>
                        <input
                          type="text"
                          value={settings.tiktokUrl}
                          onChange={(e) => onUpdateSettings({ ...settings, tiktokUrl: e.target.value })}
                          className="w-full text-xs p-2.5 rounded-md border border-[#E8DFD3] bg-[#FAF7F2] font-mono dir-ltr text-left"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-[#554044] mb-1">
                          رسوم التوصيل (ر.س):
                        </label>
                        <input
                          type="number"
                          value={settings.shippingCost}
                          onChange={(e) => onUpdateSettings({ ...settings, shippingCost: Number(e.target.value) })}
                          className="w-full text-xs p-2.5 rounded-md border border-[#E8DFD3] bg-[#FAF7F2]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-[#554044] mb-1">
                          حد الشحن المجاني (ر.س):
                        </label>
                        <input
                          type="number"
                          value={settings.freeShippingThreshold}
                          onChange={(e) => onUpdateSettings({ ...settings, freeShippingThreshold: Number(e.target.value) })}
                          className="w-full text-xs p-2.5 rounded-md border border-[#E8DFD3] bg-[#FAF7F2]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#554044] mb-1">
                        نص شريط الإعلانات العلوي:
                      </label>
                      <input
                        type="text"
                        value={settings.announcementText}
                        onChange={(e) => onUpdateSettings({ ...settings, announcementText: e.target.value })}
                        className="w-full text-xs p-2.5 rounded-md border border-[#E8DFD3] bg-[#FAF7F2]"
                      />
                    </div>

                    {/* Change PIN Section */}
                    <div className="pt-4 border-t border-[#F0E8DE] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div>
                        <span className="text-xs font-bold text-[#350A11] block">
                          تغيير رمز المرور الخاص بلوحة الإدارة:
                        </span>
                        <span className="text-[11px] text-[#70555A]">
                          رمز الدخول الحالي: <code className="font-mono">{adminPin}</code>
                        </span>
                      </div>
                      <button
                        onClick={() => {
                          const newP = prompt('أدخل رمز المرور الجديد:', adminPin);
                          if (newP && newP.trim().length >= 4) {
                            setAdminPin(newP.trim());
                            localStorage.setItem('kayan_admin_pin', newP.trim());
                            showNotice('تم تحديث رمز المرور بنجاح');
                          }
                        }}
                        className="px-3 py-1.5 text-xs font-bold text-[#581420] bg-[#FAF5EE] border border-[#E8DFD3] rounded hover:bg-[#581420] hover:text-white transition-colors"
                      >
                        تغيير الرمز
                      </button>
                    </div>

                    <div className="pt-4 border-t border-[#F0E8DE] flex justify-between items-center">
                      <button
                        onClick={() => {
                          if (window.confirm('هل تود استعادة جميع المنتجات والإعدادات الافتراضية؟')) {
                            onResetDefaults();
                            showNotice('تمت استعادة الإعدادات والمنتجات الافتراضية');
                          }
                        }}
                        className="text-xs text-red-600 hover:underline flex items-center gap-1"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>استعادة المنتجات والبيانات الأصلية</span>
                      </button>

                      <button
                        onClick={() => showNotice('تم حفظ الإعدادات بنجاح')}
                        className="px-5 py-2 text-xs font-bold text-white bg-[#581420] hover:bg-[#430D17] rounded-md shadow-xs cursor-pointer"
                      >
                        حفظ الإعدادات
                      </button>
                    </div>
                  </div>
                </div>
              )}

            </div>
          </div>
        )}

      </div>
    </div>
  );
};
