import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { prefersReducedMotion } from '../lib/motion';

export function initAnimations(): void {
  if (prefersReducedMotion()) return; // static render; hero video stays paused → poster shows
  gsap.registerPlugin(ScrollTrigger);

  // Motion allowed: opt the hero video into playback (markup omits `autoplay` so that
  // reduced-motion users never see it move — they keep the poster image).
  const heroVideo = document.querySelector<HTMLVideoElement>('.hero-video');
  if (heroVideo) { heroVideo.autoplay = true; heroVideo.play().catch(() => {}); }

  // Sonic 2 title-card SLIDE-IN, translated faithfully from the engine
  // (TitleCardElement / s2.asm Obj34_TitleCardData): constant-velocity slides
  // (16 px/frame, hence `ease: 'none'`), each starting after its authored delay,
  // then held — no exit. Frame counts are mapped to seconds via SPF, which folds
  // in a gentle on-screen slowdown so the native-320 timing reads well at web scale.
  //   delays (frames): blue 0 · yellow 8 · red 21 · zone 27 · tagline/version 28
  //   travel (frames): blue 10 · yellow 20 · red 8 · zone 18 · tagline/version 18
  //   directions: blue ← top · yellow/zone ← right · red/tagline/version ← left.
  const hero = document.querySelector('[data-hero]');
  if (hero) {
    const SPF = 0.032; // seconds per engine-frame (1/60 × ~1.9 slowdown for web comfort)
    const f = (frames: number) => frames * SPF;
    const W = () => window.innerWidth;
    const tl = gsap.timeline({ defaults: { ease: 'none' } });
    tl.from('[data-tc="blue"]',   { yPercent: -100, duration: f(10) }, f(0))
      .from('[data-tc="yellow"]', { xPercent: 130, duration: f(20) }, f(8))
      .from('[data-tc="ctas"]',   { xPercent: 160, opacity: 0, duration: f(20) }, f(12))
      .from('[data-tc="red"]',    { xPercent: -170, duration: f(8) }, f(21))
      .from('[data-tc="zone"]',   { x: () => W(), opacity: 0, duration: f(18) }, f(27))
      .from('[data-tc="bar"]',    { x: () => -W() * 0.5, opacity: 0, duration: f(18) }, f(28))
      .from('[data-tc="act"]',    { x: () => -W() * 0.4, opacity: 0, duration: f(18) }, f(28));
  }

  gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((el) => {
    gsap.from(el, { y: 40, opacity: 0, duration: .5, ease: 'power2.out',
      scrollTrigger: { trigger: el, start: 'top 80%' } });
  });
}
document.addEventListener('DOMContentLoaded', initAnimations);
