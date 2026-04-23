import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

interface Category {
  name: string;
  slug: string;
  count: number;
}

interface CategoryGridProps {
  categories: Category[];
}

const V = {
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

const CAT_IMAGES: Record<string, string> = {
  "lo-nuong": V.oven,
  "lo-hap": V.steamer,
  "lo-vi-song": V.howto,
  "tu-lanh": V.cooler,
  "tu-ruou": V.coolerSupreme,
  "may-hut-mui": V.kitchenMidrange,
  "bep-tu": V.hob,
  "bep-gas": V.hob,
  "ngan-ham-nong": V.oven,
  "ngan-hut-chan-khong": V.oven,
  "may-rua-chen": V.dishwasher,
  "may-giat-say": V.dishwasher,
};

const TAGLINES: Record<string, string> = {
  "lo-nuong": "Combair-Steam V6000",
  "lo-hap": "Combi-Steam Excellence",
  "tu-lanh": "NoFrost · BioFresh",
  "tu-ruou": "WineCooler UCSL",
  "may-hut-mui": "LonglifePlus Filter",
  "bep-tu": "FullFlex Induction",
  "bep-gas": "Gas Hob Series",
  "ngan-ham-nong": "Warming Drawer",
  "ngan-hut-chan-khong": "Vacuuming Drawer",
  "lo-vi-song": "MicroSteam",
  "may-rua-chen": "AdoraDish",
  "may-giat-say": "AdoraWash · RefreshButler",
};

function Tile({
  cat,
  variant = "small",
  className = "",
}: {
  cat: Category;
  variant?: "large" | "medium" | "small";
  className?: string;
}) {
  const image = CAT_IMAGES[cat.slug];
  const tagline = TAGLINES[cat.slug] ?? "V-ZUG Swiss Made";

  return (
    <Link
      href={`/san-pham?category=${cat.slug}`}
      className={`group relative overflow-hidden bg-[#2b1810] text-[#faf6f0] border border-[#e8dfd4] hover:border-[#2b1810] transition-colors ${className}`}
    >
      <div className="relative w-full h-full">
        {image ? (
          <Image
            src={image}
            alt={cat.name}
            fill
            className="object-cover opacity-85 group-hover:opacity-100 group-hover:scale-[1.04] transition-[transform,opacity] duration-700"
            sizes={
              variant === "large"
                ? "(max-width: 1024px) 100vw, 50vw"
                : "(max-width: 1024px) 50vw, 25vw"
            }
          />
        ) : (
          <div className="w-full h-full bg-[#2b1810] flex items-center justify-center text-white text-2xl tracking-widest">
            VZ
          </div>
        )}

        <div aria-hidden className="absolute inset-0 bg-[linear-gradient(180deg,rgba(20,9,10,0.1)_0%,rgba(20,9,10,0.25)_45%,rgba(20,9,10,0.85)_100%)]" />

        {/* top-left category number */}
        <div className="absolute top-5 left-5 text-[10px] tracking-[0.3em] uppercase text-[#c87941] font-semibold">
          {cat.count.toString().padStart(2, "0")} Sản Phẩm
        </div>

        {/* bottom content */}
        <div className="absolute bottom-0 left-0 right-0 p-5 md:p-7">
          <p className="text-[10px] tracking-[0.25em] uppercase text-[#c87941] mb-1.5">
            {tagline}
          </p>
          <div className="flex items-end justify-between gap-3">
            <h3
              className={`text-[#faf6f0] leading-[1.15] font-semibold tracking-tight ${
                variant === "large"
                  ? "text-2xl md:text-3xl"
                  : variant === "medium"
                  ? "text-xl md:text-2xl"
                  : "text-lg md:text-xl"
              }`}
            >
              {cat.name}
            </h3>
            <ArrowUpRight className="w-5 h-5 text-[#faf6f0] group-hover:text-[#c87941] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all" />
          </div>
        </div>
      </div>
    </Link>
  );
}

export default function CategoryGrid({ categories }: CategoryGridProps) {
  if (categories.length === 0) return null;

  const [c0, c1, c2, c3, c4, c5] = categories.slice(0, 6);

  return (
    <section className="py-20 md:py-24 bg-[#faf6f0]">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
          <div>
            <p className="hair-line text-[10px] tracking-[0.4em] uppercase text-[#a0522d] font-medium mb-3">
              Collections
            </p>
            <h2 className="text-3xl md:text-4xl text-[#2b1810] leading-tight max-w-2xl font-semibold tracking-tight">
              Bố Cục Bếp Thụy Sĩ,<br />
              Chế Tác Từ Năm 1913.
            </h2>
          </div>
          <Link
            href="/san-pham"
            className="group inline-flex items-center gap-2 text-[12px] tracking-[0.2em] uppercase font-semibold text-[#2b1810] hover:text-[#a0522d] transition-colors self-start md:self-end"
          >
            Xem Toàn Bộ
            <ArrowUpRight className="w-4 h-4 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        {/* Bento grid — 12-col, variable row span */}
        <div className="grid grid-cols-2 lg:grid-cols-12 gap-3 md:gap-4 auto-rows-[200px] md:auto-rows-[240px]">
          {/* Large hero tile left */}
          {c0 && (
            <Tile
              cat={c0}
              variant="large"
              className="col-span-2 lg:col-span-7 row-span-2"
            />
          )}
          {/* Top right medium */}
          {c1 && (
            <Tile cat={c1} variant="medium" className="col-span-1 lg:col-span-5 row-span-1" />
          )}
          {/* Middle right pair */}
          {c2 && (
            <Tile cat={c2} variant="small" className="col-span-1 lg:col-span-5 row-span-1" />
          )}

          {/* Bottom row: 3 tiles */}
          {c3 && (
            <Tile cat={c3} variant="small" className="col-span-1 lg:col-span-4 row-span-1" />
          )}
          {c4 && (
            <Tile cat={c4} variant="small" className="col-span-1 lg:col-span-4 row-span-1" />
          )}
          {c5 && (
            <Tile cat={c5} variant="small" className="col-span-2 lg:col-span-4 row-span-1" />
          )}
        </div>

        {/* extras — chip list for remaining categories */}
        {categories.length > 6 && (
          <div className="mt-10 flex flex-wrap gap-2">
            {categories.slice(6).map((cat) => (
              <Link
                key={cat.slug}
                href={`/san-pham?category=${cat.slug}`}
                className="inline-flex items-center gap-2 px-4 py-2 border border-[#e8dfd4] rounded-full
                           text-sm text-[#2b1810] bg-white hover:bg-[#2b1810] hover:text-[#faf6f0]
                           hover:border-[#2b1810] transition-colors"
              >
                <span>{cat.name}</span>
                <span className="text-[10px] text-[#a0522d]">{cat.count}</span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
