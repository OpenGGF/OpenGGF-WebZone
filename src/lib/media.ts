// Promo background videos for the title cards. Each is encoded at the game's native
// resolution (pixel art, here 2x = 640x448) and upscaled nearest-neighbour in CSS
// (image-rendering: pixelated), so files stay small — well under Cloudflare Pages'
// 25 MiB per-file cap — and are served same-origin from /media.
//
// Each card has its own reel. To change a card's video, drop the new file in
// public/media and point its constant at it.
export const PROMO_VIDEO_S1 = '/media/promo-s1.mp4';
export const PROMO_VIDEO_S2 = '/media/promo-s2.mp4';
export const PROMO_VIDEO_S3K = '/media/promo-s3k.mp4';
