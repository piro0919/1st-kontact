"use client";
import { ChevronRightIcon } from "@heroicons/react/24/solid";
import { Montserrat } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import ReactPlayer from "react-player";
import type { Schema } from "@/lib/client";
import styles from "./style.module.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export type WorksProps = {
  videos: Schema["videos"][];
  illustrations: Schema["illustrations"][];
};

export default function Works({ videos, illustrations }: WorksProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className={styles.container}>
      <div className={styles.worksContainer}>
        <div className={styles.iframeContainer}>
          <ReactPlayer
            className={styles.iframe}
            src={`https://www.youtube.com/watch?v=${videos[0].url.split("=")[1]}`}
            light={`https://img.youtube.com/vi/${
              videos[0].url.split("=")[1]
            }/sddefault.jpg`}
            playing={isPlaying}
            onClickPreview={() => setIsPlaying(true)}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
          />
        </div>
        <ul className={styles.list}>
          {illustrations.map((illustration) => (
            <li key={illustration.image.url} className={styles.item}>
              <Image
                src={illustration.image.url}
                alt=""
                fill={true}
                className={styles.image}
              />
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.viewMoreContainer}>
        <Link
          href="/works"
          className={`${montserrat.className} ${styles.viewMore}`}
        >
          <span>View More</span>
          <ChevronRightIcon className={styles.icon} />
        </Link>
      </div>
    </div>
  );
}
