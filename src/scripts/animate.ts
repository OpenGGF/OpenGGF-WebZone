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
    // Sonic 2 title-card SLIDE-IN, translated from the engine (TitleCardElement /
    // s2.asm Obj34_TitleCardData). As in the S1/S3K cards, what carries over is each
    // element's authored DELAY and ARRIVAL, not its raw velocity — the planes are sized
    // in percentages so they scale with the viewport, and `ease: 'none'` keeps the
    // constant-velocity feel without pinning px/frame to a 320-wide frame.
    //   delays (frames): blue 0 · yellow 8 · red 21 · zone 27 · tagline/version 28
    //   travel (frames): blue 10 · yellow 20 · red 8 · zone 18 · tagline/version 18
    // Last element lands at frame 46. SPF is the single dial, shared with the --s1-spf /
    // --s3k-spf tokens in the two CSS cards — keep the three in step.
    const q = (sel: string) => s2.querySelector(sel);
    const SPF = 0.020;
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
      // After a short beat the title card disassembles like the game: the coloured
      // planes slide off (blue up, yellow out right, red out left — retracing how they
      // entered), revealing the full-screen video. Wordmark, version, tagline & CTAs
      // stay. The planes start clearing at ~1.4s, matching the S1/S3K cover fades; the
      // engine's own post-arrival hold covers level loading and has no analogue here.
      .to(q('[data-tc="blue"]'),     { yPercent: -100, duration: .45, ease: 'power2.in' }, '+=.48')
      .to(q('[data-tc="yellow"]'),   { xPercent: 130,  duration: .45, ease: 'power2.in' }, '<')
      .to(q('[data-tc="red"]'),      { xPercent: -130, duration: .45, ease: 'power2.in' }, '<');
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
