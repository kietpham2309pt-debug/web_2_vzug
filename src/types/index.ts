export interface Product {
  id: string;
  slug: string;
  name: string;
  brand: string;
  category: string;
  categorySlug?: string;
  subcategory?: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  /** Nhãn giá hiển thị khi price = 0 (ví dụ "Liên hệ") */
  priceDisplay?: string;
  images: string[];
  thumbnail: string;
  description: string;
  shortDescription: string;
  specs: Spec[];
  features: string[];
  inStock: boolean;
  isNew?: boolean;
  isBestseller?: boolean;
  rating: number;
  reviewCount: number;
  tags: string[];
}

export interface Spec {
  label: string;
  value: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
  image: string;
  subcategories?: SubCategory[];
  productCount: number;
}

export interface SubCategory {
  id: string;
  name: string;
  slug: string;
}

export interface Brand {
  id: string;
  name: string;
  logo: string;
  country: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Banner {
  id: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  image: string;
  cta: string;
  link: string;
  collection: string;
  bgColor: string;
}

export interface ProductGroup {
  id: string;
  name: string;
  tagline: string;
  description: string;
  image: string;
  slugs: string[];
  href: string;
}

export interface FilterState {
  brands: string[];
  priceRange: [number, number];
  categories: string[];
  inStock: boolean;
  sortBy: string;
}
