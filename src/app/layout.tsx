import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://bnarentacar.com'),
  title: "BNA Rent a Car | Elazığ Araç Kiralama",
  description: "Elazığ Havalimanı teslimatlı ve ücretsiz vale hizmetli premium araç kiralama şirketiniz. Hızlı, güvenli ve lüks araç kiralama deneyimi için BNA Rent a Car.",
  keywords: ["elazığ araç kiralama", "rent a car elazığ", "oto kiralama elazığ", "elazığ havalimanı rent a car", "bna rent a car", "lüks araç kiralama"],
  openGraph: {
    title: 'BNA Rent a Car | Elazığ Araç Kiralama',
    description: "Elazığ'ın en seçkin ve bakımlı araç filosuyla hizmetinizdeyiz. 7/24 Kesintisiz Hizmet.",
    url: 'https://bnarentacar.com',
    siteName: 'BNA Rent a Car',
    images: [
      {
        url: '/logo.png', // Ideally a specific OG image, but logo is better than nothing.
        width: 800,
        height: 600,
        alt: 'BNA Rent a Car Logo',
      },
    ],
    locale: 'tr_TR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BNA Rent a Car | Elazığ Araç Kiralama',
    description: "Elazığ Havalimanı teslimatlı ve ücretsiz vale hizmetli premium araç kiralama şirketiniz.",
    images: ['/logo.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Schema.org LocalBusiness JSON-LD
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'AutoRental',
    name: 'BNA Rent a Car',
    image: 'https://bnarentacar.com/logo.png',
    '@id': 'https://bnarentacar.com',
    url: 'https://bnarentacar.com',
    telephone: '+905332502326',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Kültür Mah. Valifahribey Cad. No:111',
      addressLocality: 'Elazığ',
      addressRegion: 'Elazığ',
      postalCode: '23200',
      addressCountry: 'TR'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 38.6756286,
      longitude: 39.2223838
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday'
      ],
      opens: '00:00',
      closes: '23:59'
    },
    priceRange: '$$'
  };

  return (
    <html lang="tr" className={`${inter.variable} antialiased`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
