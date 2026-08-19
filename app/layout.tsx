import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { weddingConfig } from "@/config/wedding";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "vietnamese"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin", "vietnamese"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: weddingConfig.site.title,
  description: weddingConfig.site.description,
  metadataBase: new URL(weddingConfig.site.url),
  openGraph: {
    title: weddingConfig.site.title,
    description: weddingConfig.site.description,
    locale: weddingConfig.site.locale,
    url: weddingConfig.site.url,
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" className={`${inter.variable} ${playfair.variable}`}>
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}
