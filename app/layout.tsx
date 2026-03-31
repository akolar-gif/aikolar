import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Thinking, Interrupted",
  description: "A minimal experimental interface about how thinking changes when working with AI.",
  metadataBase: new URL("https://ai.kolar.berlin"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Thinking, Interrupted",
    description: "This is not a portfolio. It is a thinking interface.",
    url: "https://ai.kolar.berlin",
    siteName: "Thinking, Interrupted",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Thinking, Interrupted",
    description: "This is not a portfolio. It is a thinking interface.",
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
