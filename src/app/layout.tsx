import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(
    "http://localhost:3000"
  ),

  title: {
    default: "Velunix",
    template: "%s | Velunix",
  },

  description:
    "Encontre algo bom para assistir sem perder tempo escolhendo.",

  icons: {
    icon: "/favicon.png",
  },

  openGraph: {
    title: "Velunix",

    description:
      "Encontre algo bom para assistir sem perder tempo escolhendo.",

    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}