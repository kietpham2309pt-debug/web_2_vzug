import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Award, Leaf, Sparkles, MapPin } from "lucide-react";
import Breadcrumb from "@/components/ui/Breadcrumb";
import {
  SITE_NAME,
  SITE_PHONE,
  SITE_EMAIL,
  canonicalUrl,
  buildOpenGraph,
  buildTwitterCard,
} from "@/lib/seo";

const PAGE_TITLE = "Về V-ZUG";
const PAGE_DESCRIPTION =
  "V-ZUG — thương hiệu thiết bị nhà bếp cao cấp Thụy Sĩ, Swiss Made từ năm 1913. Tìm hiểu di sản, triết lý thiết kế tối giản, cam kết phát triển bền vững và tinh hoa thủ công của V-ZUG.";

export const metadata: Metadata = {
  title: `${PAGE_TITLE} | ${SITE_NAME}`,
  description: PAGE_DESCRIPTION,
  alternates: { canonical: canonicalUrl("/ve-v-zug") },
  openGraph: buildOpenGraph({
    title: `${PAGE_TITLE} | ${SITE_NAME}`,
    description: PAGE_DESCRIPTION,
    url: canonicalUrl("/ve-v-zug"),
    image: canonicalUrl("/about/hero-kitchen.jpg"),
  }),
  twitter: buildTwitterCard({
    title: `${PAGE_TITLE} | ${SITE_NAME}`,
    description: PAGE_DESCRIPTION,
    image: canonicalUrl("/about/hero-kitchen.jpg"),
  }),
};

const PILLARS = [
  {
    icon: MapPin,
    eyebrow: "Swiss Origin",
    title: "Thoroughly Swiss",
    body:
      "Toàn bộ thiết bị V-ZUG được thiết kế, phát triển và sản xuất tại Zug, Thụy Sĩ. Mỗi quyết định quan trọng vẫn được đưa ra tại trụ sở chính — giữ trọn tinh thần chính xác, bền bỉ và chuẩn mực chất lượng Thụy Sĩ trong từng sản phẩm.",
  },
  {
    icon: Sparkles,
    eyebrow: "Minimalist Design",
    title: "Thiết Kế Tối Giản",
    body:
      "V-ZUG tin rằng vẻ đẹp nằm ở sự tinh gọn. Ngôn ngữ thiết kế thanh thoát, đường nét sạch và bảng điều khiển trực quan giúp đem lại sự đơn giản cho ngôi nhà và khơi nguồn sáng tạo trong gian bếp.",
  },
  {
    icon: Leaf,
    eyebrow: "Sustainability",
    title: "Phát Triển Bền Vững",
    body:
      "Chúng tôi chế tạo thiết bị để dùng lâu dài — không phải để thay thế. Sản xuất có trách nhiệm, tuổi thọ cao và vật liệu có thể tái chế là nền tảng trong cam kết xây dựng tương lai bền vững của V-ZUG.",
  },
  {
    icon: Award,
    eyebrow: "Innovation",
    title: "Đổi Mới Không Ngừng",
    body:
      "Từ công nghệ hấp sâu, điều khiển CircleSlider đến các dịch vụ số kết nối toàn bộ hệ sinh thái nhà bếp — V-ZUG đầu tư vào các đổi mới có ý nghĩa, nâng tầm trải nghiệm nấu nướng mỗi ngày.",
  },
];

const TIMELINE = [
  {
    year: "1913",
    title: "Khởi nguồn tại Zug",
    body:
      "V-ZUG được thành lập tại thành phố Zug, Thụy Sĩ — bắt đầu hành trình hơn một thế kỷ chế tác thiết bị gia dụng cao cấp Swiss Made.",
  },
  {
    year: "Hôm nay",
    title: "Thương hiệu Thụy Sĩ toàn cầu",
    body:
      "Với các công ty con tại EU, Anh, Trung Quốc, Hồng Kông, Singapore và Úc, V-ZUG có mặt ở nhiều thị trường trên thế giới nhưng vẫn giữ trọn gốc rễ Thụy Sĩ: tất cả thiết bị đều được sản xuất tại Zug.",
  },
  {
    year: "2025–2026",
    title: "Great Place to Work",
    body:
      "V-ZUG được chứng nhận Great Place to Work, phản ánh văn hoá doanh nghiệp coi trọng con người, sự đổi mới và trách nhiệm bền vững.",
  },
];

const STATS = [
  { value: "1913", label: "Thành lập tại Zug" },
  { value: "100%", label: "Sản xuất tại Thụy Sĩ" },
  { value: "7+", label: "Thị trường quốc tế" },
  { value: "Swiss", label: "Made · Designed · Built" },
];

const STUDIOS = [
  {
    src: "/about/building-zug.jpg",
    alt: "Trụ sở V-ZUG tại Zug, Thụy Sĩ",
    city: "Zug",
    country: "Thụy Sĩ",
    role: "Trụ sở chính & Nhà máy",
  },
  {
    src: "/about/studio-london.jpg",
    alt: "V-ZUG Studio tại London",
    city: "London",
    country: "Vương Quốc Anh",
    role: "Flagship Studio",
  },
  {
    src: "/about/mountain-rigi.jpg",
    alt: "Dãy Alps Thụy Sĩ — khung cảnh quê hương V-ZUG",
    city: "Rigi",
    country: "Swiss Alps",
    role: "Thiên nhiên & Cảm hứng",
  },
];

export default function AboutVZugPage() {
  return (
    <div className="bg-[#faf6f0]">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-[#e8dfd4]">
        <div className="max-w-[1400px] mx-auto px-6 py-4">
          <Breadcrumb items={[{ label: PAGE_TITLE }]} />
        </div>
      </div>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/about/hero-kitchen.jpg"
            alt="Gian bếp V-ZUG Excellence Line"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#2b1810]/70 via-[#2b1810]/55 to-[#2b1810]/85" />
        </div>

        <div className="relative max-w-[1400px] mx-auto px-6 pt-24 pb-28 md:pt-32 md:pb-36">
          <p className="text-[10px] tracking-[0.4em] uppercase text-[#c87941] mb-5">
            Swiss Made · Since 1913
          </p>
          <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl text-[#faf6f0] leading-[1.05] tracking-tight max-w-3xl">
            Thoroughly Swiss —<br />
            tinh hoa từ Zug.
          </h1>
          <p className="mt-6 text-[15px] md:text-lg text-[#faf6f0]/85 max-w-2xl leading-relaxed">
            V-ZUG tin vào những điều thực sự quan trọng: sẻ chia, đón tiếp, sống trọn vẹn. Chúng tôi đem sự giản đơn đến ngôi nhà của bạn và khơi nguồn sáng tạo trong gian bếp — bằng những thiết bị được thiết kế và chế tạo tại Thụy Sĩ để dùng bền lâu.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link
              href="/san-pham"
              className="inline-flex items-center gap-2 bg-[#c87941] hover:bg-[#a0522d] text-[#faf6f0] px-7 py-3.5 text-[12px] tracking-[0.2em] uppercase font-semibold transition-colors"
            >
              Khám Phá Sản Phẩm
              <ArrowUpRight className="w-4 h-4" />
            </Link>
            <Link
              href="/lien-he"
              className="inline-flex items-center gap-2 border border-[#faf6f0]/40 hover:border-[#c87941] hover:text-[#c87941] text-[#faf6f0] px-7 py-3.5 text-[12px] tracking-[0.2em] uppercase font-semibold transition-colors"
            >
              Đặt Lịch Tham Quan
            </Link>
          </div>
        </div>
      </section>

      {/* Stats strip */}
      <section className="bg-[#2b1810] text-[#faf6f0]">
        <div className="max-w-[1400px] mx-auto px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10 text-center md:text-left">
          {STATS.map((s) => (
            <div key={s.label} className="border-l border-[#c87941]/40 pl-4 md:pl-6">
              <div className="font-serif text-3xl md:text-4xl text-[#c87941]">
                {s.value}
              </div>
              <div className="text-[10px] tracking-[0.3em] uppercase text-[#faf6f0]/70 mt-2">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Philosophy — pull quote */}
      <section className="max-w-[1400px] mx-auto px-6 py-20 md:py-28">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-[10px] tracking-[0.4em] uppercase text-[#a0522d] font-medium mb-6">
            Triết Lý
          </p>
          <blockquote className="font-serif text-3xl md:text-5xl text-[#2b1810] leading-[1.15] tracking-tight">
            &ldquo;Sharing. Hosting. Living.&rdquo;
          </blockquote>
          <p className="mt-8 text-[15px] md:text-lg text-[#4a3a30] leading-relaxed">
            Mỗi thiết bị V-ZUG được sinh ra để phục vụ những khoảnh khắc quan trọng nhất trong cuộc sống — bữa ăn cùng gia đình, không gian đón tiếp bạn bè, và những trải nghiệm tinh tế trong chính căn bếp của bạn.
          </p>
        </div>
      </section>

      {/* Pillars — 4 columns */}
      <section className="bg-[#f2ebdf]">
        <div className="max-w-[1400px] mx-auto px-6 py-20 md:py-24">
          <div className="max-w-2xl mb-14">
            <p className="text-[10px] tracking-[0.4em] uppercase text-[#a0522d] font-medium mb-4">
              Giá Trị Cốt Lõi
            </p>
            <h2 className="font-serif text-3xl md:text-5xl text-[#2b1810] leading-tight tracking-tight">
              Bốn trụ cột định hình V-ZUG.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[#e8dfd4]">
            {PILLARS.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <article
                  key={pillar.title}
                  className="bg-[#faf6f0] p-8 md:p-10 flex flex-col"
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 border border-[#c87941] text-[#a0522d] mb-6">
                    <Icon className="w-5 h-5" />
                  </div>
                  <p className="text-[10px] tracking-[0.3em] uppercase text-[#a0522d] mb-3">
                    {pillar.eyebrow}
                  </p>
                  <h3 className="font-serif text-2xl md:text-3xl text-[#2b1810] leading-tight mb-4">
                    {pillar.title}
                  </h3>
                  <p className="text-[15px] text-[#4a3a30] leading-relaxed">
                    {pillar.body}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Heritage — two-column with image */}
      <section className="max-w-[1400px] mx-auto px-6 py-20 md:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center">
          <div className="relative aspect-[4/5] w-full overflow-hidden">
            <Image
              src="/about/oven-detail.jpg"
              alt="Chi tiết cửa lò V-ZUG — thiết kế tối giản, tinh xảo"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>

          <div>
            <p className="text-[10px] tracking-[0.4em] uppercase text-[#a0522d] font-medium mb-4">
              Di Sản
            </p>
            <h2 className="font-serif text-3xl md:text-5xl text-[#2b1810] leading-tight tracking-tight mb-6">
              Hơn một thế kỷ<br />làm chủ tinh hoa.
            </h2>
            <div className="space-y-5 text-[15px] md:text-[16px] text-[#4a3a30] leading-relaxed">
              <p>
                Từ năm 1913 tại Zug — một thị trấn nhỏ bên hồ Zug của Thụy Sĩ — V-ZUG đã khởi đầu hành trình chế tác thiết bị gia dụng cao cấp. Hơn 110 năm qua, chúng tôi không ngừng mài giũa sự chính xác, độ bền và vẻ đẹp tối giản đặc trưng của Thụy Sĩ.
              </p>
              <p>
                Ngày nay, V-ZUG có mặt tại nhiều thị trường trên thế giới — EU, Anh, Trung Quốc, Hồng Kông, Singapore, Úc — nhưng mỗi thiết bị vẫn được thiết kế, chế tạo và lắp ráp tại Zug. Đây là cam kết không thoả hiệp với chất lượng Swiss Made đích thực.
              </p>
              <p>
                Chúng tôi tin rằng một thiết bị tốt là thiết bị được dùng trong hàng chục năm — không phải vài năm. Đó là lý do V-ZUG đặt độ bền và tính bền vững lên hàng đầu trong mọi quyết định chế tác.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Headquarters — full-width photo + caption */}
      <section className="relative">
        <div className="relative h-[60vh] min-h-[420px] w-full overflow-hidden">
          <Image
            src="/about/headquarters-aerial.jpg"
            alt="Toàn cảnh trụ sở V-ZUG tại Zug, Thụy Sĩ"
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#2b1810]/85 via-[#2b1810]/20 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 max-w-[1400px] mx-auto px-6 pb-12 md:pb-16">
            <p className="text-[10px] tracking-[0.4em] uppercase text-[#c87941] mb-4">
              Zug · Thụy Sĩ
            </p>
            <h2 className="font-serif text-3xl md:text-5xl text-[#faf6f0] leading-tight tracking-tight max-w-2xl">
              Nơi mỗi thiết bị V-ZUG<br />ra đời.
            </h2>
            <p className="mt-5 text-[14px] md:text-[16px] text-[#faf6f0]/80 max-w-xl leading-relaxed">
              Khu tổ hợp Zephyr tại Zug là trái tim của V-ZUG — nơi hội tụ nhà máy, xưởng R&D và các quyết định chiến lược. Mọi sản phẩm đều mang dấu ấn Swiss Made từ chính nơi này.
            </p>
          </div>
        </div>
      </section>

      {/* Global presence — studio grid */}
      <section className="max-w-[1400px] mx-auto px-6 py-20 md:py-28">
        <div className="max-w-2xl mb-12">
          <p className="text-[10px] tracking-[0.4em] uppercase text-[#a0522d] font-medium mb-4">
            Hiện Diện Toàn Cầu
          </p>
          <h2 className="font-serif text-3xl md:text-5xl text-[#2b1810] leading-tight tracking-tight">
            Gốc rễ Thụy Sĩ,<br />sải cánh quốc tế.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {STUDIOS.map((s) => (
            <figure key={s.city} className="group">
              <div className="relative aspect-[4/5] w-full overflow-hidden">
                <Image
                  src={s.src}
                  alt={s.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <figcaption className="pt-5">
                <p className="text-[10px] tracking-[0.3em] uppercase text-[#a0522d] mb-2">
                  {s.role}
                </p>
                <div className="font-serif text-2xl text-[#2b1810] leading-tight">
                  {s.city}
                </div>
                <div className="text-[13px] text-[#4a3a30]/80 mt-1">
                  {s.country}
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* Great Place to Work — image + text */}
      <section className="bg-[#f2ebdf]">
        <div className="max-w-[1400px] mx-auto px-6 py-20 md:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center">
            <div>
              <p className="text-[10px] tracking-[0.4em] uppercase text-[#a0522d] font-medium mb-4">
                Văn Hoá Doanh Nghiệp
              </p>
              <h2 className="font-serif text-3xl md:text-5xl text-[#2b1810] leading-tight tracking-tight mb-6">
                Great Place<br />to Work® 2025–2026.
              </h2>
              <div className="space-y-5 text-[15px] md:text-[16px] text-[#4a3a30] leading-relaxed">
                <p>
                  V-ZUG được chứng nhận <strong>Great Place to Work</strong> — minh chứng cho một môi trường làm việc coi trọng con người, sự tin tưởng và phát triển bền vững.
                </p>
                <p>
                  Chúng tôi tin rằng những sản phẩm tuyệt vời chỉ có thể đến từ một đội ngũ hạnh phúc và được trao quyền. Đó là lý do mỗi kỹ sư, nhà thiết kế, thợ thủ công tại Zug đều đóng góp vào từng thiết bị mang tên V-ZUG.
                </p>
              </div>
            </div>

            <div className="relative aspect-[16/10] w-full overflow-hidden order-first lg:order-last">
              <Image
                src="/about/great-place-to-work.jpg"
                alt="Đội ngũ V-ZUG — Great Place to Work 2025-2026"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-[#2b1810] text-[#faf6f0]">
        <div className="max-w-[1400px] mx-auto px-6 py-20 md:py-28">
          <div className="max-w-2xl mb-14">
            <p className="text-[10px] tracking-[0.4em] uppercase text-[#c87941] font-medium mb-4">
              Hành Trình
            </p>
            <h2 className="font-serif text-3xl md:text-5xl leading-tight tracking-tight">
              Những cột mốc làm nên V-ZUG.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
            {TIMELINE.map((item) => (
              <article
                key={item.year}
                className="border-t border-[#c87941]/40 pt-6"
              >
                <div className="font-serif text-4xl md:text-5xl text-[#c87941] mb-4">
                  {item.year}
                </div>
                <h3 className="font-serif text-xl md:text-2xl mb-3 leading-tight">
                  {item.title}
                </h3>
                <p className="text-[14px] text-[#faf6f0]/75 leading-relaxed">
                  {item.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership image card */}
      <section className="max-w-[1400px] mx-auto px-6 py-20 md:py-28">
        <div className="relative overflow-hidden">
          <div className="relative aspect-[21/9] w-full">
            <Image
              src="/about/management.jpg"
              alt="Ban lãnh đạo V-ZUG"
              fill
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#2b1810]/85 via-[#2b1810]/40 to-transparent" />
            <div className="absolute inset-0 flex items-center">
              <div className="max-w-xl px-8 md:px-14">
                <p className="text-[10px] tracking-[0.4em] uppercase text-[#c87941] mb-4">
                  Ban Lãnh Đạo
                </p>
                <h2 className="font-serif text-3xl md:text-5xl text-[#faf6f0] leading-tight tracking-tight mb-5">
                  Con người<br />làm nên V-ZUG.
                </h2>
                <p className="text-[14px] md:text-[16px] text-[#faf6f0]/85 leading-relaxed">
                  Đội ngũ lãnh đạo V-ZUG tiếp nối hơn 110 năm tinh hoa Thụy Sĩ — với tầm nhìn đưa thương hiệu vươn xa mà không đánh đổi chất lượng gốc.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WellHome — local distributor */}
      <section className="bg-[#f2ebdf]">
        <div className="max-w-[1400px] mx-auto px-6 py-20 md:py-28">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-[10px] tracking-[0.4em] uppercase text-[#a0522d] font-medium mb-5">
              V-ZUG Tại Việt Nam
            </p>
            <h2 className="font-serif text-3xl md:text-5xl text-[#2b1810] leading-tight tracking-tight mb-6">
              Công ty TNHH WELLHOME (Việt Nam)<br />
              <span className="text-[#a0522d]">Nhà phân phối chính thức.</span>
            </h2>
            <p className="text-[15px] md:text-lg text-[#4a3a30] leading-relaxed mb-10">
              Công ty TNHH WELLHOME (Việt Nam) là nhà phân phối chính thức sản phẩm V-ZUG Thụy Sĩ tại Việt Nam — mang đến dịch vụ tư vấn, giao hàng, lắp đặt và bảo hành chính hãng cho toàn bộ dòng thiết bị nhà bếp cao cấp.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 text-left">
              <div className="bg-[#faf6f0] border border-[#e8dfd4] p-6">
                <p className="text-[10px] tracking-[0.3em] uppercase text-[#a0522d] mb-2">
                  Showroom
                </p>
                <p className="text-[14px] text-[#2b1810] leading-relaxed">
                  Phòng 5.09, Lầu 5, Toà nhà ST Moritz, 1014 Phạm Văn Đồng, P. Hiệp Bình Chánh, TP. Thủ Đức, TP. Hồ Chí Minh
                </p>
              </div>
              <div className="bg-[#faf6f0] border border-[#e8dfd4] p-6">
                <p className="text-[10px] tracking-[0.3em] uppercase text-[#a0522d] mb-2">
                  Hotline
                </p>
                <a
                  href={`tel:${SITE_PHONE.replace(/\s/g, "")}`}
                  className="font-serif text-xl text-[#2b1810] hover:text-[#a0522d] transition-colors"
                >
                  {SITE_PHONE}
                </a>
              </div>
              <div className="bg-[#faf6f0] border border-[#e8dfd4] p-6">
                <p className="text-[10px] tracking-[0.3em] uppercase text-[#a0522d] mb-2">
                  Email
                </p>
                <a
                  href={`mailto:${SITE_EMAIL}`}
                  className="text-[14px] text-[#2b1810] hover:text-[#a0522d] transition-colors break-all"
                >
                  {SITE_EMAIL}
                </a>
              </div>
            </div>

            <div className="mt-12 flex flex-wrap justify-center gap-4">
              <Link
                href="/san-pham"
                className="inline-flex items-center gap-2 bg-[#2b1810] hover:bg-[#a0522d] text-[#faf6f0] px-7 py-3.5 text-[12px] tracking-[0.2em] uppercase font-semibold transition-colors"
              >
                Xem Toàn Bộ Sản Phẩm
                <ArrowUpRight className="w-4 h-4" />
              </Link>
              <Link
                href="/lien-he"
                className="inline-flex items-center gap-2 border border-[#2b1810] hover:bg-[#2b1810] hover:text-[#faf6f0] text-[#2b1810] px-7 py-3.5 text-[12px] tracking-[0.2em] uppercase font-semibold transition-colors"
              >
                Liên Hệ Tư Vấn
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
