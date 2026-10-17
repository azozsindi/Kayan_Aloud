export interface ProductVariant {
  id: string;
  name: string;
  weight: string;
  price: number;
}

export interface FragrancePyramid {
  top: string;
  heart: string;
  base: string;
}

export interface Product {
  id: string;
  name: string;
  subtitle: string;
  category: 'mastic' | 'oud' | 'gifts';
  categoryLabel: string;
  badge?: string;
  price: number;
  originalPrice?: number;
  description: string;
  craftingDetails: string;
  usageInstructions: string;
  scentNotes: FragrancePyramid;
  variants: ProductVariant[];
  colorTheme: string;
  isPopular?: boolean;
  imageUrl?: string;
  inStock?: boolean;
}

export interface CartItem {
  product: Product;
  selectedVariant: ProductVariant;
  quantity: number;
}

export interface OrderCustomerInfo {
  name: string;
  phone: string;
  city: string;
  district: string;
  isGift: boolean;
  giftCardMessage: string;
  notes: string;
}

export interface StoreSettings {
  whatsappNumber: string;
  whatsappDirectLink: string;
  tiktokHandle: string;
  tiktokUrl: string;
  locationCity: string;
  freeShippingThreshold: number;
  shippingCost: number;
  announcementText: string;
  customLogoUrl: string | null;
}

export interface TikTokVideoItem {
  id: string;
  title: string;
  category: string;
  badge: string;
  url: string;
  videoId?: string;
  videoSourceUrl?: string;
  customThumbnailUrl?: string;
  views?: string;
  likes?: string;
}

export interface WhatsAppReviewItem {
  id: string;
  customerName: string;
  city: string;
  productName: string;
  imageUrl?: string;
  textSnippet: string;
  date?: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}



