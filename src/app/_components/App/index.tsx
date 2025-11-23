import { Black_Ops_One } from "next/font/google";
import News, { type NewsProps } from "../News";
import Profile from "../Profile";
import Works, { type WorksProps } from "../Works";
import styles from "./style.module.css";

const blackOpsOne = Black_Ops_One({
  subsets: ["latin"],
  weight: ["400"],
});

export type AppProps = Pick<NewsProps, "informationList"> &
  Pick<WorksProps, "videos" | "illustrations">;

export default function App({
  illustrations,
  informationList,
  videos,
}: AppProps) {
  return (
    <div className={styles.container}>
      <article className={styles.article}>
        <div className={styles.h2Container}>
          <h2 className={`${blackOpsOne.className} ${styles.h2}`}>News</h2>
        </div>
        <News informationList={informationList} />
      </article>
      <article className={styles.article}>
        <div className={styles.h2Container}>
          <h2 className={`${blackOpsOne.className} ${styles.h2}`}>Profile</h2>
        </div>
        <Profile />
      </article>
      <article className={styles.article}>
        <div className={styles.h2Container}>
          <h2 className={`${blackOpsOne.className} ${styles.h2}`}>Works</h2>
        </div>
        <Works videos={videos} illustrations={illustrations} />
      </article>
    </div>
  );
}
