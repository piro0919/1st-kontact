import { ChevronRightIcon } from "@heroicons/react/24/solid";
import { format } from "date-fns";
import { Montserrat } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import type { Schema } from "@/lib/client";
import styles from "./style.module.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export type NewsProps = {
  informationList: Schema["informationlist"][];
};

export default function News({ informationList }: NewsProps) {
  return (
    <div className={styles.container}>
      <ul className={styles.list}>
        {informationList.map((information) => (
          <li key={information.id} className={styles.link}>
            <span className={styles.date}>
              {format(new Date(information.date), "yyyy.MM.dd")}
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
      <div className={styles.viewMoreContainer}>
        <Link
          href="/news"
          className={`${montserrat.className} ${styles.viewMore}`}
        >
          <span>View More</span>
          <ChevronRightIcon className={styles.icon} />
        </Link>
      </div>
    </div>
  );
}
