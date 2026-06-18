import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { prefersReducedMotion } from '../lib/motion';

export function initAnimations(): void {
  if (prefersReducedMotion()) return; // static render; hero video stays paused → poster shows
  gsap.registerPlugin(ScrollTrigger);

  // Only the VISIBLE title-card variant is animated (the others are display:none).
  // S2 uses this GSAP timeline; S1/S3K use scoped CSS keyframes (reduced-motion safe
  // via the global tokens.css rule).
  // Play the active title card's promo background video. Markup omits `autoplay`, so
  // reduced-motion users (we returned above) never start it; only the visible variant
  // has layout rects. S1/S3K reveal it via a CSS cover fade; S2 via the blue plane below.
  document.querySelectorAll<HTMLVideoElement>('.promo-video').forEach((v) => {
    if (v.getClientRects().length > 0) v.play().catch(() => {});
  });

  const s2 = document.querySelector<HTMLElement>('[data-hero="s2"]');
  if (s2 && s2.getClientRects().length > 0) {
    // Sonic 2 title-card SLIDE-IN, translated faithfully from the engine
    // (TitleCardElement / s2.asm Obj34_TitleCardData): constant-velocity slides
    // (16 px/frame, hence `ease: 'none'`), each starting after its authored delay,
    // then held — no exit. Frame counts → seconds via SPF (with a gentle web slowdown).
    //   delays (frames): blue 0 · yellow 8 · red 21 · zone 27 · tagline/version 28
    //   travel (frames): blue 10 · yellow 20 · red 8 · zone 18 · tagline/version 18
    const q = (sel: string) => s2.querySelector(sel);
    const SPF = 0.032;
    const f = (frames: number) => frames * SPF;
    const W = () => window.innerWidth;
    const tl = gsap.timeline({ defaults: { ease: 'none' } });
    tl.from(q('[data-tc="blue"]'),   { yPercent: -100, duration: f(10) }, f(0))
      .from(q('[data-tc="yellow"]'), { xPercent: 130, duration: f(20) }, f(8))
      .from(q('[data-tc="ctas"]'),   { xPercent: 160, opacity: 0, duration: f(20) }, f(12))
      .from(q('[data-tc="red"]'),    { xPercent: -170, duration: f(8) }, f(21))
      .from(q('[data-tc="zone"]'),   { x: () => W(), opacity: 0, duration: f(18) }, f(27))
      .from(q('[data-tc="bar"]'),    { x: () => -W() * 0.5, opacity: 0, duration: f(18) }, f(28))
      // slide-in done: the planes now fully cover the frame, so drop the black pane that
      // was hiding the video during the assembly (invisible — planes are over it).
      .set(q('[data-tc="black"]'),   { autoAlpha: 0 })
      // ~1s later, fade the blue plane out to reveal the promo video behind it
      // (the yellow band, red block, wordmark, tagline & CTAs all stay).
      .to(q('[data-tc="blue"]'),     { opacity: 0, duration: 1.2, ease: 'power1.in' }, '+=1');
    // GSAP has set the start state (immediateRender) — now reveal (it was hidden to
    // avoid a rest-state flash on load).
    s2.style.visibility = 'visible';
  }

  gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((el) => {
    gsap.from(el, { y: 40, opacity: 0, duration: .5, ease: 'power2.out',
      scrollTrigger: { trigger: el, start: 'top 80%' } });
  });
}
document.addEventListener('DOMContentLoaded', initAnimations);
