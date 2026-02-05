import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Faktara - Berita Terkini Indonesia",
    template: "%s | Faktara",
  },
  description: "Portal berita terpercaya untuk informasi terkini seputar politik, ekonomi, teknologi, olahraga, dan berbagai topik menarik lainnya.",
  keywords: ["berita", "news", "indonesia", "terkini", "politik", "ekonomi", "teknologi", "faktara"],
  authors: [{ name: "Faktara" }],
  icons: {
    icon: '/logo.png',
    shortcut: '/logo.png',
    apple: '/logo.png',
  },
  openGraph: {
    type: "website",
    locale: "id_ID",
    siteName: "Faktara",
    title: "Faktara - Berita Terkini Indonesia",
    description: "Portal berita terpercaya untuk informasi terkini seputar politik, ekonomi, teknologi, olahraga, dan berbagai topik menarik lainnya.",
    images: [
      {
        url: '/logo.png',
        width: 1200,
        height: 630,
        alt: 'Faktara Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Faktara - Berita Terkini Indonesia",
    description: "Portal berita terpercaya untuk informasi terkini",
    images: ['/logo.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <head>
        <link rel="icon" href="/logo.png" type="image/png" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
