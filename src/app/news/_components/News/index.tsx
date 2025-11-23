import { format } from "date-fns";
import { Black_Ops_One } from "next/font/google";
import Image from "next/image";
import type { Schema } from "@/lib/client";
import styles from "./style.module.css";

const blackOpsOne = Black_Ops_One({
  subsets: ["latin"],
  weight: ["400"],
});

export type NewsProps = {
  informationList: Schema["informationlist"][];
};

export default function News({ informationList }: NewsProps) {
  // 年ごとにグループ化
  const informationByYear = informationList.reduce(
    (acc, information) => {
      const year = new Date(information.date).getFullYear();
      if (!acc[year]) {
        acc[year] = [];
      }
      acc[year].push(information);
      return acc;
    },
    {} as Record<number, Schema["informationlist"][]>,
  );

  // 年を降順でソート
  const years = Object.keys(informationByYear)
    .map(Number)
    .sort((a, b) => b - a);

  return (
    <div className={styles.container}>
      {years.map((year) => (
        <article key={year} className={styles.article}>
          <div className={styles.h2Container}>
            <h2 className={`${blackOpsOne.className} ${styles.h2}`}>{year}</h2>
          </div>
          <ul className={styles.list}>
            {informationByYear[year].map((information) => (
              <li key={information.id} className={styles.link}>
                <span className={styles.date}>
                  {format(new Date(information.date), "MM.dd")}
                </span>
                <div>
                  <a
                    href={information.urlList[0].url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <h3 className={styles.title}>{information.title}</h3>
                  </a>
                  {information.urlList.map((url) => (
                    <a
                      key={url.url}
                      href={url.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.favicon}
                    >
                      <Image
                        src={`https://www.google.com/s2/favicons?domain=${
                          new URL(url.url).hostname
                        }&sz=32`}
                        alt={new URL(url.url).hostname}
                        fill={true}
                        quality={100}
                      />
                    </a>
                  ))}
                </div>
              </li>
            ))}
          </ul>
        </article>
      ))}
    </div>
  );
}
