import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";
import Layout from "./_components/Layout";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import "swiper/css/thumbs";
import "swiper/css/free-mode";
import "@djthoms/pretty-checkbox";
import "yet-another-react-lightbox/styles.css";

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "1stKontact - イラストレーター「こんたくん」オフィシャルサイト",
  description: "イラストレーター「こんたくん」のオフィシャルサイトです。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={notoSansJP.className}>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
