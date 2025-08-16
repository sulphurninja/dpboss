import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'DPBOSS | SATTA MATKA | KALYAN MATKA | MATKA RESULT | MATKA | SATTA',
  description:
    'Unlock the ultimate Satta Matka experience with DPBOSS Services. get accurate results, live updates on Kalyan Matka result, and expert tips for Matka experience.',
  keywords:
    'dpboss, dpboss network, goa matka, ડીપીબોસ, ಡಿಪಿಬೋಸ್, dp boss, dpboss matka, dpboss matka network, डीपी बॉस, dpboss boston, dpboss net, d boss kalyan, dpboss. network, matka boss, dpboss matka result, goa matka result, dpb0ss, kullu matka, dpboss live, dp matka, dpboss net network, dpboss result, my dp boss, matka result live, డిపి బాస్, ಡಿಪಿ ಬಾಸ್ , ಡಿ ಬಾಸ್ ಮಟ್ಕಾ, dpboss matka channel, dpboss dpboss, kalyan main result, dpboss नेट अंदाज, dp boos matka com, my dpboss, dp boss net, https://dpboss.net, sabse tezz live result yahi milega, d boss matka, tara matka, new dpboss, dpboss.boston, https://dpboss.net/, https://dpboss.gold/, dp boss net, dp market net, डीपी बॉस नेट वर्क, dpbossmatkacom, data matka com, dp satta, boss matka, 06:45 pm 07:45 pm jodi panel night time bazar, kalyan dp',
  authors: [{ name: 'DPBOSS' }],
  applicationName: 'DPBOSS',
  robots: 'index, follow',
  alternates: {
    canonical: 'https://dpboss.gold',
    languages: {
      'en-IN': 'https://dpboss.gold/',
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180' },
      { url: '/apple-touch-icon-60x60.png', sizes: '60x60' },
      { url: '/apple-touch-icon-72x72.png', sizes: '72x72' },
      { url: '/apple-touch-icon-76x76.png', sizes: '76x76' },
      { url: '/apple-touch-icon-114x114.png', sizes: '114x114' },
      { url: '/apple-touch-icon-120x120.png', sizes: '120x120' },
    ],
    other: [{ rel: 'manifest', url: '/site.webmanifest' }],
  },
  openGraph: {
    type: 'website',
    title: 'Satta Matka',
    description: 'SattaMatka',
    url: 'https://dpboss.gold/',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN">
      <body>
        {children}

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'NewsArticle',
              mainEntityOfPage: {
                '@type': 'WebPage',
                '@id': 'https://dpboss.gold/',
              },
              headline: 'Dpboss , Satta Matka , Matka , Satta',
              description:
                'Satta Matka Originated In India And Is One Of The Popular Forms Of Lottery And Gambling Games.',
              author: {
                '@type': 'Organization',
                name: 'Dpboss',
              },
              publisher: {
                '@type': 'Organization',
                name: 'Dpboss',
                logo: {
                  '@type': 'ImageObject',
                  url: 'https://dpboss.gold/favicon.png',
                },
              },
            }),
          }}
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'MobileApplication',
              name: 'Satta Matka',
              operatingSystem: '',
              applicationCategory: 'https://schema.org/MobileApplication',
              aggregateRating: {
                '@type': 'AggregateRating',
                ratingValue: '5',
                ratingCount: '290',
              },
              offers: {
                '@type': 'Offer',
                price: '0',
                priceCurrency: '0',
              },
            }),
          }}
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: [
                {
                  '@type': 'Question',
                  name: 'Who is Dpboss?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Dpboss is a prominent figure in the Satta Matka industry. He is known for providing tips, guidance, and expert advice to players, helping them make informed decisions in their Matka games.',
                  },
                },
                {
                  '@type': 'Question',
                  name: 'How does Matka work?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'In Matka, players choose a set of numbers from a predefined range and place bets on those numbers. The bets are then collected, and a random number is drawn. If a player\'s chosen number matches the result, they win.',
                  },
                },
              ],
            }),
          }}
        />
      </body>
    </html>
  );
}
