// Promo background videos for the title cards. Each is encoded at the game's native
// 320x224 (pixel art) and upscaled nearest-neighbour in CSS (image-rendering: pixelated),
// so files stay a few MB — well under Cloudflare Pages' 25 MiB per-file cap — and are
// served same-origin from /media.
//
// Each title card will eventually get its OWN promo clip; for now all three share one.
// To give a card a distinct video, drop it in public/media and point its constant here.
const SHARED_PROMO = '/media/promo.mp4';
export const PROMO_VIDEO_S1 = SHARED_PROMO;
export const PROMO_VIDEO_S2 = SHARED_PROMO;
export const PROMO_VIDEO_S3K = SHARED_PROMO;
