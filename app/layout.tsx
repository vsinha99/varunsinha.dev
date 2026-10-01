import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";

import { SiteHeader } from "@/components/layout/site-header";

import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://varunsinha.dev"),
  title: "Varun Sinha | Data Science & Machine Learning",
  description: "Varun Sinha is a UC San Diego Data Science major graduating in 2028.",
  twitter: {
    card: "summary_large_image",
    title: "Varun Sinha | Data Science & Machine Learning",
    description: "Machine learning, data science, and applied research.",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  colorScheme: "dark",
  themeColor: "#12151b",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={geist.variable}>
      <body>
        <a className="skip-link" href="#top">
          Skip to content
        </a>
        <SiteHeader />
        {children}
      </body>
    </html>
  );
}
