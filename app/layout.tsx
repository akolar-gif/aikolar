import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Kolar",
  description: "A thinking interface. Not a portfolio.",
  openGraph: {
    title: "This is already different.",
    description: "A thinking interface.",
    url: "https://ai.kolar.berlin",
    siteName: "AI Kolar",
    images: [
      {
        url: "https://ai.kolar.berlin/og.jpg",
        width: 1200,
        height: 630,
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "This is already different.",
    description: "A thinking interface.",
    images: ["https://ai.kolar.berlin/og.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}