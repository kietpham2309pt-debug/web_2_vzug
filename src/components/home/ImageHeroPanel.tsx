"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Banner } from "@/types";

interface Props {
  banner: Banner;
  index: number;
}

/**
 * One image-hero panel in the stacked hero sequence. With scroll-snap on the
 * html root, the page lightly snaps between heroes — removing the seam
 * visible with a continuous crossfade. Content reveals once on entry via
 * IntersectionObserver for a polished first-view feel.
 */
export default function ImageHeroPanel({ banner, index }: Props) {
  const alignRight = index % 2 === 1;
  const sectionRef = useRef<HTMLElement | null>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setRevealed(true);
            io.disconnect();
            break;
          }
        }
      },
      { threshold: 0.25 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      data-hero-section="true"
      data-revealed={revealed || undefined}
      aria-label={banner.title}
      className="relative w-full overflow-hidden bg-[#14090a] text-[#faf6f0] h-screen min-h-[600px]"
    >
      <Image
        src={banner.image}
        alt={banner.title}
        fill
        sizes="100vw"
        className="object-cover"
      />

      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(180deg,rgba(20,9,10,0.35)_0%,rgba(20,9,10,0.1)_40%,rgba(20,9,10,0.75)_100%)]"
      />
      <div
        aria-hidden
        className={
          alignRight
            ? "absolute inset-0 bg-[linear-gradient(270deg,rgba(20,9,10,0.5)_0%,rgba(20,9,10,0.05)_55%,transparent_100%)]"
            : "absolute inset-0 bg-[linear-gradient(90deg,rgba(20,9,10,0.5)_0%,rgba(20,9,10,0.05)_55%,transparent_100%)]"
        }
      />

      <div className="relative z-10 w-full h-full flex flex-col">
        <div className="max-w-[1400px] mx-auto w-full px-6 md:px-10 pt-8 md:pt-10 flex items-center justify-between">
          <p className="text-[10px] md:text-[11px] tracking-[0.4em] uppercase text-[#faf6f0]/80 font-medium">
            <span className="inline-block w-10 h-px align-middle bg-[#c87941] mr-3" />
            {String(index + 2).padStart(2, "0")} · {banner.collection}
          </p>
          <p className="hidden md:block text-[11px] tracking-[0.3em] uppercase font-medium text-[#faf6f0]/70">
            V-ZUG · Swiss Made
          </p>
        </div>

        <div
          className={
            "flex-1 max-w-[1400px] mx-auto w-full px-6 md:px-10 flex items-end pb-28 md:pb-36 " +
            (alignRight ? "justify-end text-right" : "")
          }
        >
          <div className={"max-w-3xl panel-content " + (alignRight ? "ml-auto" : "")}>
            <p
              className="text-[10px] md:text-[11px] tracking-[0.4em] uppercase text-[#c87941] font-semibold mb-5 md:mb-6 panel-line"
              style={{ transitionDelay: "80ms" }}
            >
              {banner.eyebrow}
            </p>
            <h2
              className="text-[40px] md:text-[56px] lg:text-[68px] leading-[1.02] text-[#faf6f0] font-semibold tracking-tight max-w-[14ch] mb-6 md:mb-8 panel-line"
              style={{ transitionDelay: "160ms" }}
            >
              {banner.title}
            </h2>
            <p
              className={
                "text-[15px] md:text-[17px] leading-[1.65] text-[#faf6f0]/85 max-w-xl mb-9 md:mb-11 panel-line " +
                (alignRight ? "ml-auto" : "")
              }
              style={{ transitionDelay: "260ms" }}
            >
              {banner.subtitle}
            </p>
            <div
              className={
                "flex flex-wrap items-center gap-4 panel-line " +
                (alignRight ? "justify-end" : "")
              }
              style={{ transitionDelay: "360ms" }}
            >
              <Link
                href={banner.link}
                className="group inline-flex items-center gap-3 bg-[#faf6f0] text-[#2b1810] px-8 py-4 text-[12px] tracking-[0.22em] uppercase font-semibold hover:bg-[#c87941] hover:text-[#faf6f0] transition-colors"
              >
                {banner.cta}
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/san-pham"
                className="inline-flex items-center gap-2 text-[12px] tracking-[0.22em] uppercase font-semibold text-[#faf6f0] px-2 py-4 border-b border-[#faf6f0]/60 hover:border-[#c87941] hover:text-[#c87941] transition-colors"
              >
                Tất Cả Sản Phẩm
              </Link>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .panel-line {
          opacity: 0;
          transform: translateY(14px);
          transition: opacity 800ms cubic-bezier(0.22, 1, 0.36, 1),
            transform 800ms cubic-bezier(0.22, 1, 0.36, 1);
        }
        section[data-revealed] .panel-line {
          opacity: 1;
          transform: translateY(0);
        }
        @media (prefers-reduced-motion: reduce) {
          .panel-line {
            opacity: 1 !important;
            transform: none !important;
            transition: none !important;
          }
        }
      `}</style>
    </section>
  );
}
