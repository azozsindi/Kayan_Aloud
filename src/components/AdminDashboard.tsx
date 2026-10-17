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
  Copy
} from 'lucide-react';
import { Product, ProductVariant, StoreSettings } from '../types';
import { Logo } from './Logo';

interface AdminDashboardProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onUpdateProducts: (newProducts: Product[]) => void;
  settings: StoreSettings;
  onUpdateSettings: (newSettings: StoreSettings) => void;
  onResetDefaults: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  isOpen,
  onClose,
  products,
  onUpdateProducts,
  settings,
  onUpdateSettings,
  onResetDefaults
}) => {
  // Authentication PIN state (Strictly A0897 with no public hints)
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [enteredPin, setEnteredPin] = useState('');
  const [pinError, setPinError] = useState(false);
  const [adminPin, setAdminPin] = useState(() => {
    return localStorage.getItem('kayan_admin_pin') || 'A0897';
  });

  // Active Tab
  const [activeTab, setActiveTab] = useState<'products' | 'logo' | 'settings' | 'backup'>('products');

  // Product Edit / Create state
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isCreatingNew, setIsCreatingNew] = useState(false);

  // Success Notice Toast
  const [notice, setNotice] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

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
      price: 100,
      description: '',
      craftingDetails: 'صُنعت يدوياً بكل حب في ورشتنا بجدة.',
      usageInstructions: 'توضع على جمر هادئ لفوحان ممتد وثابت.',
      scentNotes: {
        top: '',
        heart: '',
        base: ''
      },
      variants: [
        { id: `var-1-${Date.now()}`, name: 'علبة فاخرة (100 غرام)', weight: '100 غرام', price: 100 }
      ],
      colorTheme: 'from-[#FAF5EE] to-[#EFE4D6]'
    };
    setEditingProduct(newProd);
    setIsCreatingNew(true);
  };

  // Logo Upload Actions
  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('حجم الصورة كبير جداً، يرجى اختيار صورة أقل من 5 ميجابايت.');
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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 text-right">
      <div className="relative w-full max-w-5xl bg-[#FAF7F2] rounded-2xl border border-[#E8DFD3] shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        
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
                  الإدارة الخاصة
                </span>
              </h2>
              <p className="text-[11px] text-[#D8BFC4]">
                تعديل الأصناف، الأسعار، الشعار، وإعدادات الواتساب وتيك توك
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
                  setActiveTab('logo');
                  setEditingProduct(null);
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
                        قائمة أصناف كيان العود
                      </h3>
                      <p className="text-xs text-[#70555A]">
                        يمكنك إضافة صنف جديد، تعديل الأسعار، تغيير الأحجام، أو الحذف
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

                  {/* Product Form Modal (if editing or creating) */}
                  {editingProduct && (
                    <div className="bg-white rounded-xl border border-[#C59B27] p-5 shadow-lg space-y-4">
                      <div className="flex items-center justify-between border-b border-[#F0E8DE] pb-3">
                        <h4 className="text-sm font-bold text-[#581420]">
                          {isCreatingNew ? 'إضافة صنف جديد لكيان العود' : `تعديل صنف: ${editingProduct.name}`}
                        </h4>
                        <button
                          onClick={() => setEditingProduct(null)}
                          className="p-1 text-[#70555A] hover:text-black"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>

                      <form onSubmit={handleSaveProduct} className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-xs font-bold text-[#554044] mb-1">
                              اسم الصنف:
                            </label>
                            <input
                              type="text"
                              required
                              placeholder="مثال: مستكة بلورية مسقاة بمسك الختام"
                              value={editingProduct.name}
                              onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                              className="w-full text-xs p-2.5 rounded-md border border-[#E8DFD3] bg-[#FAF7F2] focus:outline-none focus:border-[#581420]"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-bold text-[#554044] mb-1">
                              الوصف القصير (السطر التعريفي):
                            </label>
                            <input
                              type="text"
                              required
                              placeholder="مثال: بلورات نقية مسقاة بزيوت عطرية فاخرة"
                              value={editingProduct.subtitle}
                              onChange={(e) => setEditingProduct({ ...editingProduct, subtitle: e.target.value })}
                              className="w-full text-xs p-2.5 rounded-md border border-[#E8DFD3] bg-[#FAF7F2] focus:outline-none focus:border-[#581420]"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
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
                              السعر الأساسي (ر.س):
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
                              className="w-full text-xs p-2.5 rounded-md border border-[#E8DFD3] bg-[#FAF7F2] focus:outline-none focus:border-[#581420]"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-bold text-[#554044] mb-1">
                              شارة المنتج (اختياري):
                            </label>
                            <input
                              type="text"
                              placeholder="مثال: الأكثر طلباً / جديد / إصدار خاص"
                              value={editingProduct.badge || ''}
                              onChange={(e) => setEditingProduct({ ...editingProduct, badge: e.target.value })}
                              className="w-full text-xs p-2.5 rounded-md border border-[#E8DFD3] bg-[#FAF7F2] focus:outline-none focus:border-[#581420]"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-[#554044] mb-1">
                            الوصف الكامل والتفاصيل:
                          </label>
                          <textarea
                            rows={3}
                            value={editingProduct.description}
                            onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                            className="w-full text-xs p-2.5 rounded-md border border-[#E8DFD3] bg-[#FAF7F2] focus:outline-none focus:border-[#581420]"
                          />
                        </div>

                        {/* Scent notes */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-[#FAF7F2] p-3 rounded-lg border border-[#E8DFD3]">
                          <div>
                            <label className="block text-[11px] font-bold text-[#581420] mb-1">
                              قمة العطر:
                            </label>
                            <input
                              type="text"
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
                              قاعدة العطر:
                            </label>
                            <input
                              type="text"
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

                        <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#F0E8DE]">
                          <button
                            type="button"
                            onClick={() => setEditingProduct(null)}
                            className="px-4 py-2 text-xs font-semibold text-[#70555A] hover:bg-[#FAF5EE] rounded-md transition-colors"
                          >
                            إلغاء
                          </button>
                          <button
                            type="submit"
                            className="flex items-center gap-1.5 px-5 py-2 text-xs font-bold text-white bg-[#581420] hover:bg-[#430D17] rounded-md shadow-xs cursor-pointer"
                          >
                            <Save className="w-3.5 h-3.5 text-[#E5C378]" />
                            <span>حفظ التعديلات</span>
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
                        className="bg-white rounded-xl border border-[#E8DFD3] p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-[#581420]/30 transition-colors shadow-2xs"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-[#350A11]">
                              {product.name}
                            </span>
                            {product.badge && (
                              <span className="text-[10px] font-bold px-2 py-0.5 bg-[#581420] text-[#FAF5EE] rounded">
                                {product.badge}
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] text-[#70555A]">
                            {product.subtitle}
                          </p>
                          <div className="flex items-center gap-3 text-xs text-[#8A2535] font-semibold pt-1">
                            <span>القسم: {product.categoryLabel}</span>
                            <span>·</span>
                            <span className="text-[#581420] font-extrabold tabular-nums">
                              السعر: {product.price} ر.س
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 self-end sm:self-center">
                          <button
                            onClick={() => {
                              setEditingProduct(product);
                              setIsCreatingNew(false);
                            }}
                            className="flex items-center gap-1 px-3 py-1.5 text-xs font-bold text-[#581420] bg-[#FAF5EE] hover:bg-[#581420] hover:text-white rounded-md transition-colors border border-[#E8DFD3]"
                          >
                            <Edit2 className="w-3 h-3" />
                            <span>تعديل</span>
                          </button>

                          <button
                            onClick={() => handleDuplicateProduct(product)}
                            className="p-1.5 text-[#554044] hover:bg-[#FAF5EE] rounded-md transition-colors"
                            title="تكرار الصنف"
                          >
                            <Copy className="w-4 h-4" />
                          </button>

                          <button
                            onClick={() => handleDeleteProduct(product.id, product.name)}
                            className="p-1.5 text-red-600 hover:bg-red-50 rounded-md transition-colors"
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

              {/* TAB 2: LOGO MANAGEMENT */}
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

              {/* TAB 3: STORE SETTINGS */}
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
                          الرمز الحالي: <code className="font-mono">{adminPin}</code>
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
