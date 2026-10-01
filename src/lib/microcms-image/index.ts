// next.config の images.unoptimized が true のため、next/image は src をそのまま出し、
// srcset も作らない。microCMS の画像 API に幅と形式を渡して、元画像の代わりに縮小版を読ませる。
// https://document.microcms.io/image-api/introduction

const MICRO_CMS_IMAGE_HOST = "images.microcms-assets.io";

// 一覧は minmax(220px, 1fr) のグリッドで、1 列になる幅で 1 マスが最大 441px ほどになる。
// srcset が使えないので、その 2 倍を 1 枚で賄う
export const GRID_IMAGE_WIDTH = 900;

type MicroCMSImage = {
  url: string;
  width?: number;
};

export function microCMSImageUrl(
  image: MicroCMSImage,
  { width }: { width: number },
): string {
  let url: URL;

  try {
    url = new URL(image.url);
  } catch {
    return image.url;
  }

  // GIF は webp にするとアニメーションが崩れうる。SVG は縮める意味がない
  if (
    url.hostname !== MICRO_CMS_IMAGE_HOST ||
    /\.(gif|svg)$/i.test(url.pathname)
  ) {
    return image.url;
  }

  // 元より大きくはしない
  if (image.width === undefined || image.width > width) {
    url.searchParams.set("w", String(width));
  }

  url.searchParams.set("fm", "webp");
  url.searchParams.set("q", "75");

  return url.toString();
}
