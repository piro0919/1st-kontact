import { CSSProperties, useMemo } from "react";
import useMeasure from "react-use-measure";
import styles from "./style.module.scss";

function Header(): JSX.Element {
  const [ref, { height, width }] = useMeasure();
  const iframeStyle = useMemo<CSSProperties>(
    () =>
      height / 9 > width / 16
        ? {
            height: `${height}px`,
            width: `${(height / 9) * 16}px`,
          }
        : {
            height: `${(width / 16) * 9}px`,
            width: `${width}px`,
          },
    [height, width]
  );
  const src = useMemo(
    () =>
      [
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
            value: "MJIxP7pIO9U",
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
      ].join("?"),
    []
  );

  return (
    <header className={styles.header} ref={ref}>
      <iframe className={styles.iframe} src={src} style={iframeStyle} />
      <div className={styles.heading1Wrapper}>
        <h1 className={styles.heading1}>1stKontact</h1>
      </div>
    </header>
  );
}

export default Header;
