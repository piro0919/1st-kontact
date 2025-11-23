"use client";
import { Black_Ops_One } from "next/font/google";
import { usePathname } from "next/navigation";
import useMeasure from "react-use-measure";
import styles from "./style.module.css";

const blackOpsOne = Black_Ops_One({
  subsets: ["latin"],
  weight: ["400"],
});

export default function Top() {
  const [ref, { height, width }] = useMeasure();
  const iframeStyle =
    height / 9 > width / 16
      ? {
          height: `${height}px`,
          width: `${(height / 9) * 16}px`,
        }
      : {
          height: `${(width / 16) * 9}px`,
          width: `${width}px`,
        };
  const src = [
    `https://www.youtube-nocookie.com/embed/YzHZ0YBj59E`,
    [
      {
        key: "autoplay",
        value: "1",
      },
      {
        key: "controls",
        value: "0",
      },
      {
        key: "disablekb",
        value: "1",
      },
      {
        key: "enablejsapi",
        value: "1",
      },
      {
        key: "iv_load_policy",
        value: "3",
      },
      {
        key: "loop",
        value: "1",
      },
      {
        key: "modestbranding",
        value: "1",
      },
      {
        key: "mute",
        value: "1",
      },
      {
        key: "playlist",
        value: "YzHZ0YBj59E",
      },
      {
        key: "rel",
        value: "0",
      },
      {
        key: "showinfo",
        value: "0",
      },
    ]
      .map(({ key, value }) => [key, value].join("="))
      .join("&"),
  ].join("?");
  const pathname = usePathname();

  return (
    <div
      className={`${styles.container} ${pathname === "/" ? "" : styles.sub}`}
      ref={ref}
    >
      <iframe className={styles.iframe} src={src} style={iframeStyle} />
      {pathname === "/news" ? (
        <h2 className={`${blackOpsOne.className} ${styles.h2}`}>News</h2>
      ) : null}
      {pathname === "/works" ? (
        <h2 className={`${blackOpsOne.className} ${styles.h2}`}>Works</h2>
      ) : null}
      {pathname === "/pricing" ? (
        <h2 className={`${blackOpsOne.className} ${styles.h2}`}>Pricing</h2>
      ) : null}
      {pathname === "/contact" ? (
        <h2 className={`${blackOpsOne.className} ${styles.h2}`}>Contact</h2>
      ) : null}
    </div>
  );
}
