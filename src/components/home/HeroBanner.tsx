import { banners } from "@/lib/data";
import ImageHeroPanel from "./ImageHeroPanel";

/**
 * Stacked image heroes — spaceship.com-style. Each banner is its own
 * full-viewport section; the parallax + cross-fade between adjacent heroes
 * is handled per-panel by ImageHeroPanel (client) via useHeroParallax.
 */
export default function HeroBanner() {
  return (
    <>
      {banners.map((banner, index) => (
        <ImageHeroPanel key={banner.id} banner={banner} index={index} />
      ))}
    </>
  );
}
