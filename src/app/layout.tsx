import type { Metadata } from 'next';
import { Inter, Press_Start_2P } from 'next/font/google';
import './globals.css';
import { AppProvider } from '@/lib/context';

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-inter',
});

const pressStart = Press_Start_2P({
  weight: '400',
  subsets: ['latin', 'cyrillic'],
  variable: '--font-pixel',
});

export const metadata: Metadata = {
  title: 'Анти-туристическая карта Казани',
  description: 'Геймифицированный инструмент пространственного исследования города вне туристического ареала',
  keywords: ['Казань', 'карта', 'исследование', 'урбанистика', 'антитуризм'],
  openGraph: {
    title: 'Анти-туристическая карта Казани',
    description: 'Исследуй город за пределами туристических маршрутов',
    type: 'website',
    locale: 'ru_RU',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body className={`${inter.variable} ${pressStart.variable} font-sans antialiased`}>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
