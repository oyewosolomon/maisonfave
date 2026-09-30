/**
 * Content and imagery for the Maison Fave creative-house landing page.
 *
 * Every photo the page uses is declared here once. The house library today is
 * all wedding photography, so a few slots below are stood in by the closest
 * available frame — each one is marked with the subject the design calls for,
 * so swapping in the real shot is a one-line change.
 */

export const maisonFaveImages = {
  /** Design calls for: candlelit outdoor long-table dinner at dusk, coastline behind. */
  hero: {
    src: '/assets/images/portfolio/middle-east/sunset-violinists.jpeg',
    alt: 'Violinists in red at a desert celebration at sunset, framed by a low wall of roses',
  },
  /** Design calls for: a curved-sofa living room — interior/spatial work. */
  whatWeDo: {
    src: '/assets/images/portfolio/europe/palace-dining-room.webp',
    alt: 'Long marble dining table dressed for dinner in a chandelier-lit palace dining room',
  },
  /** Design calls for: pillar candles among deep red roses. */
  creativeHouse: {
    src: '/assets/images/portfolio/africa/night-sparklers.webp',
    alt: 'Couple kissing on a checkered dance floor as sparkler fountains light the night',
  },
} as const;

export const maisonFaveNav = [
  { label: 'Home', href: '#top' },
  { label: 'About', href: '#about' },
  { label: 'What we do', href: '#what-we-do' },
  { label: 'Our work', href: '#our-work' },
  { label: 'Our brands', href: '#our-brands' },
  { label: 'Contact', href: '#contact' },
];

export const maisonFaveDisciplines = [
  { icon: 'sparkles', label: 'Event planning\n& curation' },
  { icon: 'heart', label: 'Event design\n& styling' },
  { icon: 'flower', label: 'Interior &\nspatial design' },
  { icon: 'gift', label: 'Gifting &\ncuration' },
] as const;

export const maisonFaveStats = [
  { value: '5+', label: 'Years building' },
  { value: '100+', label: 'Clients served' },
  { value: 'Several', label: 'Countries' },
];

export const maisonFaveBrands = [
  {
    name: 'Weddings by\nMaison Fave',
    description:
      'Intentional, unconventional and destination weddings across cultures and countries.',
    href: 'https://weddingsbymaisonfave.com',
    /** Design calls for: bride from behind, long veil, mountains beyond. */
    image: {
      src: '/assets/images/hero/about-section-background.webp',
      alt: 'Bride in a pearl-scattered cathedral veil walking a garden aisle',
    },
  },
  {
    name: 'Spaces by\nMaison Fave',
    description:
      'Interior and spatial design creating environments that feel considered, personal and lived in.',
    href: '#our-brands',
    /** Design calls for: a styled sitting room — sofa, fireplace, greenery. */
    image: {
      src: '/assets/images/home/Interior-design.jpeg',
      alt: 'Champagne tower, mirrored signage and a tiered cake styled across a venue',
    },
  },
  {
    name: 'Gifts by\nMaison Fave',
    description:
      'Thoughtful, beautifully curated gifting designed to bring intention to every gesture.',
    href: '#our-brands',
    /** Design calls for: a Maison Fave gift box tied with a burgundy ribbon. */
    image: {
      src: '/assets/images/home/gifts.jpeg',
      alt: 'Berry mille-feuille on a linen table with a red ribbon tied to the cake server',
    },
  },
];

export const maisonFaveSocials = [
  { label: 'Instagram', href: 'https://www.instagram.com/maisonfave', icon: 'instagram' },
  { label: 'Pinterest', href: 'https://www.pinterest.com/maisonfave', icon: 'pinterest' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/maisonfave', icon: 'linkedin' },
  { label: 'YouTube', href: 'https://www.youtube.com/@maisonfave', icon: 'youtube' },
] as const;

/** Options and copy for the "Work with us" enquiry popup. */
export const maisonFaveEnquiry = {
  /** Fallback inbox when no form endpoint is configured — confirm before launch. */
  email: 'hello@maisonfave.com',
  services: [
    'Weddings',
    'Event planning & curation',
    'Event design & styling',
    'Interior & spatial design',
    'Gifting & curation',
    'Something else',
  ],
  budgets: ['Under ₦10m', '₦10m – ₦30m', '₦30m – ₦75m', '₦75m+', 'International / USD budget'],
  steps: [
    'Tell us about your idea',
    'We reply within two working days',
    'A discovery call to shape the vision',
  ],
};

/** The short film shown under "The creative house" (a vertical YouTube Short). */
export const maisonFaveFilm = {
  youtubeId: 'sVLxOm2OQWQ',
  title: 'Maison Fave — a moment from our work',
  url: 'https://youtube.com/shorts/sVLxOm2OQWQ',
};
