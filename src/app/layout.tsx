import type { Metadata } from "next";

import "./globals.css";

import { Providers } from "./providers";

import { Footer } from "@/components/layout/footer";

export const metadata: Metadata = {
  metadataBase: new URL(
    "https://velunix.vercel.app"
  ),

  title: {
    default:
      "Velunix | Descubra o que assistir sem perder tempo escolhendo",
    template: "%s | Velunix",
  },

  description:
    "Receba recomendações de filmes, séries e animes, descubra onde assistir, filtre por streaming, gênero e nota, e encontre algo bom para assistir em segundos.",

  keywords: [
    "filmes",
    "séries",
    "animes",
    "recomendação de filmes",
    "recomendação de séries",
    "recomendação de animes",
    "o que assistir",
    "descobrir filmes",
    "descobrir séries",
    "descobrir animes",
    "sorteador de filmes",
    "streaming",
    "netflix",
    "prime video",
    "disney plus",
    "onde assistir",
    "velunix",
  ],

  icons: {
    icon: "/favicon.png",
  },

  openGraph: {
    title:
      "Velunix | Descubra o que assistir",

    description:
      "Pare de perder tempo escolhendo. Encontre filmes, séries e animes para assistir em segundos.",

    url: "https://velunix.vercel.app",

    siteName: "Velunix",

    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Velunix",
      },
    ],

    locale: "pt_BR",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",

    title:
      "Velunix | Descubra o que assistir",

    description:
      "Encontre filmes, séries e animes sem perder tempo escolhendo.",

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
      <body>
        <Providers>
          <div className="flex min-h-screen flex-col">
            <div className="flex-1">
              {children}
            </div>

            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}