import { Category, Brand, Banner, ProductGroup } from "@/types";
import categoryCounts from "@/data/category-counts.json";

/**
 * brands — giữ cho cấu trúc dữ liệu; website chỉ phân phối V-ZUG Thụy Sĩ.
 */
export const brands: Brand[] = [
  { id: "vzug", name: "V-ZUG", logo: "/brands/vzug.svg", country: "Thụy Sĩ" },
];

const counts = categoryCounts as Record<string, number>;

/** Danh mục V-ZUG — khớp với slug trong src/data/products.json */
// Working V-ZUG asset URLs (assets.vzug.com CDN). Map slug → image.
const IMG = {
  oven:
    "https://assets.vzug.com/hcms/v2.3/entity/mediaPicture/76553/media/NzY1NTMvMC9BRTRCQTMyNjE5NEU2ODdGQ0FGNzA5Q0VBOThFNDJDRjg2MEYyN0Ux/4x5_1120/direct/Mood-context-kitchen-oven-steamer-drawer-2023-0802-Combair-V6000.jpg",
  steamer:
    "https://assets.vzug.com/hcms/v2.3/entity/mediaPicture/165265/media/MDAxNjUyNjUvMC9DNzdGN0M0MkU3RUQzM0ZFMDA2NjNGRTlDNEUxQzhENDUzRTcyM0VB/4x5_1120/direct/Mood-brand-campaign-steamer-16x9-2025-2.jpg",
  cooler:
    "https://assets.vzug.com/hcms/v2.3/entity/mediaPicture/179546/media/MDAxNzk1NDYvMC9ERDJEMDU0MUEwM0U4N0RBOEE3MDVBMTRGQUE5RTcxNjBCRDE3RDEy/4x5_1120/direct/Mood-wide-kitchen-combicooler-v6000-178NI-2025-shot09.tif.jpg",
  coolerSupreme:
    "https://assets.vzug.com/hcms/v2.3/entity/mediaPicture/172002/media/MDAxNzIwMDIvMC80RkQ0NjJCMTZBQUY5OTNDOTBFMTE3Q0Y0Qjc1MkI0RTNDMTdFMTMy/4x5_1120/direct/Mood-Wideshot-kitchen-combicooler-supreme-2025-001_0020001.tif.jpg",
  hob:
    "https://assets.vzug.com/hcms/v2.3/entity/mediaPicture/76528/media/NzY1MjgvMC8wMTVBMUQyQTY5RDlDMzkzRDcwMEU1MDhEQkYwRUI5NUEyRDlEMUMy/4x5_1120/direct/Mood-context-kitchen-hobs-fusion-2023-5338.jpg",
  kitchenMidrange:
    "https://assets.vzug.com/hcms/v2.3/entity/mediaPicture/133448/media/MDAxMzM0NDgvMC82MzVENDg3NDJDRTNDN0UxMTRGMzA1MkEwRjU3RkEyQUNCM0U2QzAz/4x5_1120/direct/Mood-wide-kitchen-midrange-combair-V600-B-6.4.jpg.jpg",
  dishwasher:
    "https://assets.vzug.com/hcms/v2.3/entity/mediaPicture/121772/media/MDAxMjE3NzIvMC83M0U0OTU0MDc0MUNGMjNCQzNFMDMyNzg5N0FBRkE5OTMyMTZGNTM5/4x5_1120/direct/mood-kitchen-wide-adora-dishwasher-V6000-2024-8.2.jpg",
  howto:
    "https://assets.vzug.com/hcms/v2.3/entity/mediaPicture/28165/media/MjgxNjUvMC85OTA3MEJENjBCMTVENDVFREEyRUM0MDhEN0I2M0RERUFGNDQ3RDBG/4x5_1120/direct/Mood-kitchen-how-to-operation-2021.jpg",
};

const allCategories: Category[] = [
  {
    id: "lo-nuong",
    name: "Lò nướng âm tủ",
    slug: "lo-nuong",
    icon: "",
    image: IMG.oven,
    productCount: counts["lo-nuong"] ?? 0,
  },
  {
    id: "lo-hap",
    name: "Lò hấp kết hợp",
    slug: "lo-hap",
    icon: "",
    image: IMG.steamer,
    productCount: counts["lo-hap"] ?? 0,
  },
  {
    id: "tu-lanh",
    name: "Tủ lạnh",
    slug: "tu-lanh",
    icon: "",
    image: IMG.cooler,
    productCount: counts["tu-lanh"] ?? 0,
  },
  {
    id: "tu-ruou",
    name: "Tủ rượu vang",
    slug: "tu-ruou",
    icon: "",
    image: IMG.coolerSupreme,
    productCount: counts["tu-ruou"] ?? 0,
  },
  {
    id: "may-hut-mui",
    name: "Máy hút mùi",
    slug: "may-hut-mui",
    icon: "",
    image: IMG.kitchenMidrange,
    productCount: counts["may-hut-mui"] ?? 0,
  },
  {
    id: "bep-tu",
    name: "Bếp từ",
    slug: "bep-tu",
    icon: "",
    image: IMG.hob,
    productCount: counts["bep-tu"] ?? 0,
  },
  {
    id: "bep-gas",
    name: "Bếp gas",
    slug: "bep-gas",
    icon: "",
    image: IMG.hob,
    productCount: counts["bep-gas"] ?? 0,
  },
  {
    id: "ngan-ham-nong",
    name: "Ngăn hâm nóng",
    slug: "ngan-ham-nong",
    icon: "",
    image: IMG.oven,
    productCount: counts["ngan-ham-nong"] ?? 0,
  },
  {
    id: "ngan-hut-chan-khong",
    name: "Ngăn hút chân không",
    slug: "ngan-hut-chan-khong",
    icon: "",
    image: IMG.oven,
    productCount: counts["ngan-hut-chan-khong"] ?? 0,
  },
  {
    id: "lo-vi-song",
    name: "Lò vi sóng",
    slug: "lo-vi-song",
    icon: "",
    image: IMG.howto,
    productCount: counts["lo-vi-song"] ?? 0,
  },
  {
    id: "may-rua-chen",
    name: "Máy rửa chén",
    slug: "may-rua-chen",
    icon: "",
    image: IMG.dishwasher,
    productCount: counts["may-rua-chen"] ?? 0,
  },
  {
    id: "may-giat-say",
    name: "Máy giặt & sấy",
    slug: "may-giat-say",
    icon: "",
    image: IMG.dishwasher,
    productCount: counts["may-giat-say"] ?? 0,
  },
];

/** Chỉ export các danh mục có sản phẩm */
export const categories: Category[] = allCategories.filter((c) => c.productCount > 0);

/** Hero banners — V-ZUG Thụy Sĩ */
export const banners: Banner[] = [
  {
    id: "b1",
    eyebrow: "Excellence Line · V6000",
    title: "Nghệ Thuật Bếp Thụy Sĩ.",
    subtitle:
      "Lò nướng, lò hấp, tủ lạnh, bếp từ âm tủ V-ZUG — chế tác thủ công tại Zug từ năm 1913. Đẳng cấp, tinh xảo, bền bỉ.",
    image: IMG.coolerSupreme,
    cta: "Khám Phá Bộ Sưu Tập",
    link: "/san-pham",
    collection: "Excellence Line",
    bgColor: "#3e2723",
  },
  {
    id: "b2",
    eyebrow: "Combi-Steamer V6000",
    title: "Đỉnh Cao Nấu Nướng.",
    subtitle:
      "Công nghệ hấp chuyên nghiệp, điều khiển CircleSlider trực quan. Nấu ăn chính xác đến từng độ, giữ trọn vẹn hương vị và dưỡng chất.",
    image: IMG.steamer,
    cta: "Xem Lò Hấp V-ZUG",
    link: "/san-pham?category=lo-hap",
    collection: "Combair V6000",
    bgColor: "#2e1f1a",
  },
  {
    id: "b3",
    eyebrow: "CoolingLine · NoFrost",
    title: "Bảo Quản Chuyên Nghiệp.",
    subtitle:
      "Tủ lạnh và tủ rượu V-ZUG — NoFrost, BioFresh và thiết kế âm tủ liền mạch. Giữ trọn hương vị từng giọt rượu, từng loại thực phẩm.",
    image: IMG.cooler,
    cta: "Khám Phá Tủ Lạnh",
    link: "/san-pham?category=tu-lanh",
    collection: "CombiCooler V6000",
    bgColor: "#5d4037",
  },
  {
    id: "b4",
    eyebrow: "FullFlex Induction",
    title: "Bếp Từ Cảm Biến Thông Minh.",
    subtitle:
      "Bếp từ FullFlex V-ZUG tự nhận diện đáy nồi trên toàn mặt kính, công suất Boost tức thì, điều khiển trượt chính xác từng cấp nhiệt.",
    image: IMG.hob,
    cta: "Xem Bếp Từ V-ZUG",
    link: "/san-pham?category=bep-tu",
    collection: "FullFlex Series",
    bgColor: "#3a2418",
  },
  {
    id: "b5",
    eyebrow: "AdoraDish · AdoraWash",
    title: "Chăm Sóc Sau Bữa Ăn.",
    subtitle:
      "Máy rửa chén AdoraDish và máy giặt AdoraWash V-ZUG — công nghệ Zeolith tiết kiệm năng lượng, vận hành êm ái chuẩn Thụy Sĩ.",
    image: IMG.dishwasher,
    cta: "Khám Phá AdoraLine",
    link: "/san-pham?category=may-giat-say",
    collection: "AdoraLine",
    bgColor: "#2b1810",
  },
];

/** Nhóm sản phẩm — phân nhóm V-ZUG theo khu vực sử dụng */
const allProductGroups: ProductGroup[] = [
  {
    id: "pg-cooking",
    name: "Nấu Nướng",
    tagline: "Cooking Suite",
    description: "Lò nướng, lò hấp, lò vi sóng, bếp từ, bếp gas và máy hút mùi V-ZUG.",
    image: IMG.oven,
    slugs: ["lo-nuong", "lo-hap", "lo-vi-song", "bep-tu", "bep-gas", "may-hut-mui"],
    href: "/san-pham?category=lo-nuong",
  },
  {
    id: "pg-cooling",
    name: "Làm Mát & Bảo Quản",
    tagline: "Cooling Line",
    description: "Tủ lạnh, tủ đông và tủ rượu vang thiết kế âm tủ chuẩn Thụy Sĩ.",
    image: IMG.cooler,
    slugs: ["tu-lanh", "tu-ruou"],
    href: "/san-pham?category=tu-lanh",
  },
  {
    id: "pg-care",
    name: "Hấp & Hâm Nóng",
    tagline: "Specialty Drawers",
    description: "Ngăn hâm nóng và ngăn hút chân không — hoàn thiện trải nghiệm bếp cao cấp.",
    image: IMG.kitchenMidrange,
    slugs: ["ngan-ham-nong", "ngan-hut-chan-khong"],
    href: "/san-pham?category=ngan-ham-nong",
  },
  {
    id: "pg-wash",
    name: "Rửa & Giặt",
    tagline: "Adora Line",
    description: "Máy rửa chén AdoraDish và máy giặt sấy AdoraWash — hiệu quả và êm ái.",
    image: IMG.dishwasher,
    slugs: ["may-rua-chen", "may-giat-say"],
    href: "/san-pham?category=may-rua-chen",
  },
];

/** Chỉ export nhóm có ít nhất một danh mục còn sản phẩm */
export const productGroups: (ProductGroup & { productCount: number })[] =
  allProductGroups
    .map((g) => ({
      ...g,
      productCount: g.slugs.reduce((sum, s) => sum + (counts[s] ?? 0), 0),
    }))
    .filter((g) => g.productCount > 0);
