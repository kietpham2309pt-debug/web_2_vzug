import Link from "next/link";

interface Brand {
  name: string;
  count: number;
}

interface BrandBarProps {
  brands: Brand[];
}

export default function BrandBar({ brands }: BrandBarProps) {
  // Chỉ show brand có tên hợp lệ (không phải tên quốc gia)
  const displayed = brands
    .filter((b) => b.name && b.name.length > 1 && b.count >= 3)
    .slice(0, 12);

  if (displayed.length === 0) return null;

  return (
    <section className="py-12 bg-[#f8fafc] border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-4">
        <p className="text-center text-xs font-semibold uppercase tracking-widest text-gray-400 mb-8">
          Thương Hiệu Đối Tác Chính Hãng
        </p>
        <div className="flex items-center justify-center flex-wrap gap-3 md:gap-4">
          {displayed.map((brand) => (
            <Link
              key={brand.name}
              href={`/san-pham?brand=${encodeURIComponent(brand.name)}`}
              className="group flex items-center justify-center px-5 py-2.5 bg-white rounded-xl border border-gray-200
                         hover:border-[#3e2723] hover:shadow-md transition-all duration-300 min-w-[90px]"
            >
              <span className="text-sm font-bold text-gray-600 group-hover:text-[#3e2723] transition-colors">
                {brand.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
