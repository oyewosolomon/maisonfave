import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { Playfair_Display, Lato } from 'next/font/google';

import './globals.css';

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
  variable: '--font-playfair',
});

const lato = Lato({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-lato',
});

const siteUrl = 'https://maisonfave.com';
const title = 'Maison Fave | A Creative House for Events, Spaces and Experiences';
const description =
  'Maison Fave is a multidisciplinary creative house curating events, transforming spaces and bringing ideas to life — from intimate gatherings to large-scale celebrations, destination events and productions.';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: '%s | Maison Fave',
  },
  description,
  keywords: [
    'creative house Lagos',
    'event planning Lagos',
    'event design and styling Nigeria',
    'interior and spatial design Lagos',
    'corporate gifting Nigeria',
    'destination events',
  ],
  authors: [{ name: 'Maison Fave' }],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    url: siteUrl,
    siteName: 'Maison Fave',
    title,
    description,
    locale: 'en_NG',
    images: [
      {
        url: '/assets/images/brand/og-maison-fave.jpg',
        width: 1200,
        height: 630,
        alt: 'Maison Fave — a creative house',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: ['/assets/images/brand/og-maison-fave.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${siteUrl}/#organization`,
  name: 'Maison Fave',
  description,
  url: siteUrl,
  image: `${siteUrl}/assets/images/brand/og-maison-fave.jpg`,
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Lagos',
    addressCountry: 'NG',
  },
  subOrganization: {
    '@type': 'LocalBusiness',
    name: 'Weddings by Maison Fave',
    url: 'https://weddingsbymaisonfave.com',
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${lato.variable}`}>
      <body className={playfair.className}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
