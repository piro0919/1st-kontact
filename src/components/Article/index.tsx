import { CSSProperties, ReactNode, useMemo } from "react";
import useMeasure from "react-use-measure";
import styles from "./style.module.scss";

export type ArticleProps = {
  children: ReactNode;
  heading: string;
  maxWidth?: string;
};

function Article({ children, heading, maxWidth }: ArticleProps): JSX.Element {
  const [ref, { width }] = useMeasure();
  const style = useMemo<CSSProperties>(
    () => ({
      maxWidth,
    }),
    [maxWidth]
  );
  const heading2WrapperStyle = useMemo<CSSProperties>(
    () => ({
      width: `${width}px`,
    }),
    [width]
  );

  return (
    <article className={styles.article} style={style}>
      <div className={styles.heading2Wrapper} style={heading2WrapperStyle}>
        <h2 className={styles.heading2} ref={ref}>
          {heading}
        </h2>
      </div>
      {children}
    </article>
  );
}

export default Article;
