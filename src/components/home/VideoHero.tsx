"use client";

import Link from "next/link";
import { ArrowRight, Volume2, VolumeX } from "lucide-react";
import { useState, useRef, useEffect } from "react";

export default function VideoHero() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [muted, setMuted] = useState(true);

  // Reinforce autoplay on mount — iOS/Safari sometimes defer the initial play
  // call until after the element is fully attached to the DOM.
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = true;
    v.play().catch(() => void 0);
  }, []);

  const toggleMute = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  };

  return (
    <section
      data-hero-section="true"
      aria-label="V-ZUG — Swiss by origin"
      className="relative w-full overflow-hidden bg-[#14090a] text-[#faf6f0] h-screen min-h-[600px]"
    >
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        src="/videos/swiss-by-origin.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      />

      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(180deg,rgba(20,9,10,0.35)_0%,rgba(20,9,10,0.1)_40%,rgba(20,9,10,0.75)_100%)]"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(90deg,rgba(20,9,10,0.45)_0%,rgba(20,9,10,0.05)_55%,transparent_100%)]"
      />

      <div className="relative z-10 w-full h-full flex flex-col">
        {/* Top meta bar */}
        <div className="max-w-[1400px] mx-auto w-full px-6 md:px-10 pt-8 md:pt-10 flex items-center justify-between">
          <p className="text-[10px] md:text-[11px] tracking-[0.4em] uppercase text-[#faf6f0]/80 font-medium">
            <span className="inline-block w-10 h-px align-middle bg-[#c87941] mr-3" />
            V-ZUG · Swiss Made Since 1913
          </p>
          <p className="hidden md:block text-[11px] tracking-[0.3em] uppercase font-medium text-[#faf6f0]/70">
            Brand Film · 2025
          </p>
        </div>

        {/* Content — bottom left */}
        <div className="flex-1 max-w-[1400px] mx-auto w-full px-6 md:px-10 flex items-end pb-28 md:pb-36">
          <div className="max-w-3xl">
            <p
              className="text-[10px] md:text-[11px] tracking-[0.4em] uppercase text-[#c87941] font-semibold mb-5 md:mb-6 hero-reveal"
              style={{ animationDelay: "100ms" }}
            >
              Swiss By Origin
            </p>
            <h1
              className="text-[40px] md:text-[56px] lg:text-[72px] leading-[1.02] text-[#faf6f0] font-semibold tracking-tight max-w-[16ch] mb-6 md:mb-8 hero-reveal"
              style={{ animationDelay: "180ms" }}
            >
              Chế Tác Từ Zug. Tinh Tế Cho Mọi Bữa Ăn.
            </h1>
            <p
              className="text-[15px] md:text-[17px] leading-[1.65] text-[#faf6f0]/85 max-w-xl mb-9 md:mb-11 hero-reveal"
              style={{ animationDelay: "280ms" }}
            >
              Hơn một thế kỷ chế tác thiết bị nhà bếp cao cấp tại Thụy Sĩ —
              mỗi chi tiết đều được thiết kế để phục vụ sự chính xác, bền bỉ
              và trải nghiệm nấu ăn đỉnh cao.
            </p>
            <div
              className="flex flex-wrap items-center gap-4 hero-reveal"
              style={{ animationDelay: "380ms" }}
            >
              <Link
                href="/san-pham"
                className="group inline-flex items-center gap-3 bg-[#faf6f0] text-[#2b1810] px-8 py-4 text-[12px] tracking-[0.22em] uppercase font-semibold hover:bg-[#c87941] hover:text-[#faf6f0] transition-colors"
              >
                Khám Phá Bộ Sưu Tập
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/lien-he"
                className="inline-flex items-center gap-2 text-[12px] tracking-[0.22em] uppercase font-semibold text-[#faf6f0] px-2 py-4 border-b border-[#faf6f0]/60 hover:border-[#c87941] hover:text-[#c87941] transition-colors"
              >
                Liên Hệ Showroom
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Mute toggle */}
      <button
        type="button"
        onClick={toggleMute}
        aria-label={muted ? "Bật âm thanh" : "Tắt âm thanh"}
        className="absolute z-20 bottom-8 right-6 md:bottom-10 md:right-10 w-11 h-11 flex items-center justify-center border border-[#faf6f0]/40 bg-[#14090a]/30 backdrop-blur-sm text-[#faf6f0] hover:text-[#14090a] hover:bg-[#faf6f0] hover:border-[#faf6f0] transition-colors"
      >
        {muted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
      </button>

      {/* Scroll cue */}
      <div
        aria-hidden
        className="absolute z-20 bottom-8 left-1/2 -translate-x-1/2 text-[10px] tracking-[0.3em] uppercase text-[#faf6f0]/60 hidden md:flex flex-col items-center gap-2"
      >
        <span>Scroll</span>
        <span className="block w-px h-10 bg-[#faf6f0]/40 relative overflow-hidden">
          <span className="hero-scroll-dot absolute top-0 left-0 w-px h-3 bg-[#c87941]" />
        </span>
      </div>

      <style jsx>{`
        .hero-reveal {
          opacity: 0;
          transform: translateY(14px);
          animation: videoHeroReveal 900ms cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        @keyframes videoHeroReveal {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .hero-scroll-dot {
          animation: scrollCue 2.4s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }
        @keyframes scrollCue {
          0% { transform: translateY(-12px); opacity: 0; }
          30%, 70% { opacity: 1; }
          100% { transform: translateY(42px); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .hero-reveal, .hero-scroll-dot { animation: none !important; }
          .hero-reveal { opacity: 1 !important; transform: none !important; }
        }
      `}</style>
    </section>
  );
}
