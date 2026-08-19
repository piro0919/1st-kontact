import type { Metadata } from "next";

type PageMetadataOptions = {
  description: string;
  /** 検索結果に出す必要が無いページは false */
  indexable?: boolean;
  /** サイト内の絶対パス。canonical と og:url に使う */
  path: string;
  title: string;
};

/**
 * ページ単位の metadata を組み立てる。
 *
 * canonical と og:url が全ページで欠けていたのでここでまとめて埋める。
 * og:title は title と同じ区切りに揃える。
 */
export default function pageMetadata({
  description,
  indexable = true,
  path,
  title,
}: PageMetadataOptions): Metadata {
  return {
    alternates: { canonical: path },
    description,
    openGraph: { description, title: `${title} - 1stKontact`, url: path },
    title,
    ...(indexable ? {} : { robots: { index: false } }),
  };
}
