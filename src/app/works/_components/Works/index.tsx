"use client";
import { Black_Ops_One } from "next/font/google";
import Image from "next/image";
import { type CSSProperties, useEffect, useState } from "react";
import ReactPlayer from "react-player";
import {
  A11y,
  Autoplay,
  FreeMode,
  Navigation,
  Scrollbar,
  Thumbs,
} from "swiper/modules";
import { Swiper, type SwiperClass, SwiperSlide } from "swiper/react";
import Lightbox from "yet-another-react-lightbox";
import type { Schema } from "@/lib/client";
import styles from "./style.module.css";

const blackOpsOne = Black_Ops_One({
  subsets: ["latin"],
  weight: ["400"],
});

export type WorksProps = {
  illustrations: Schema["illustrations"][];
  informationList: Schema["informationlist"][];
};

export default function Works({ illustrations, informationList }: WorksProps) {
  // 年ごとにグループ化
  const illustrationsByYear = illustrations.reduce(
    (acc, illustration) => {
      const year = new Date(illustration.createdAt).getFullYear();
      if (!acc[year]) {
        acc[year] = [];
      }
      acc[year].push(illustration);
      return acc;
    },
    {} as Record<number, Schema["illustrations"][]>,
  );
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null);
  const [mainSwiper, setMainSwiper] = useState<SwiperClass | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [slideKey, setSlideKey] = useState(0);
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);
  const [index, setIndex] = useState<number | null>(null);
  // スライド変更時に全ての動画を停止（keyを変更して再マウント）
  const handleSlideChange = () => {
    setIsPlaying(false);
    setSlideKey((prev) => prev + 1);
    setPlayingIndex(null);
  };
  // 年を降順でソート
  const years = Object.keys(illustrationsByYear)
    .map(Number)
    .sort((a, b) => b - a);

  // 動画再生中はautoplayを停止
  useEffect(() => {
    if (!mainSwiper) return;
    if (isPlaying) {
      mainSwiper.autoplay.stop();
    } else {
      mainSwiper.autoplay.start();
    }
  }, [isPlaying, mainSwiper]);

  return (
    <>
      <div className={styles.container}>
        <article className={styles.article}>
          <div className={styles.h2Container}>
            <h2 className={`${blackOpsOne.className} ${styles.h2}`}>Videos</h2>
          </div>
          <div className={styles.swiperContainer}>
            <Swiper
              onSwiper={setMainSwiper}
              onSlideChange={handleSlideChange}
              modules={[
                Navigation,
                Scrollbar,
                A11y,
                Thumbs,
                FreeMode,
                Autoplay,
              ]}
              spaceBetween={2}
              breakpoints={{
                375: {
                  slidesPerView: 1,
                },
                768: {
                  slidesPerView: 1.2,
                },
              }}
              centeredSlides={true}
              navigation={true}
              scrollbar={{ draggable: true }}
              loop={true}
              autoplay={{ delay: 5000, disableOnInteraction: false }}
              className={styles.swiper}
              thumbs={{ swiper: thumbsSwiper }}
              style={
                {
                  "--swiper-navigation-color": "#51c2bc",
                  "--swiper-pagination-color": "#51c2bc",
                } as CSSProperties
              }
            >
              {informationList
                .filter((information) =>
                  information.urlList.find((url) =>
                    url.url.includes("youtube"),
                  ),
                )
                .map((information, index) => {
                  const videoId = information.urlList
                    .find((url) => url.url.includes("youtube"))
                    ?.url.split("=")[1];

                  return (
                    <SwiperSlide key={information.id}>
                      <div className={styles.iframeContainer}>
                        <ReactPlayer
                          key={`${information.id}-${slideKey}`}
                          className={styles.iframe}
                          src={`https://www.youtube.com/watch?v=${videoId}`}
                          light={`https://img.youtube.com/vi/${videoId}/sddefault.jpg`}
                          playing={playingIndex === index}
                          onClickPreview={() => setPlayingIndex(index)}
                          onPlay={() => setIsPlaying(true)}
                          onPause={() => {
                            setIsPlaying(false);
                            setPlayingIndex(null);
                          }}
                        />
                      </div>
                    </SwiperSlide>
                  );
                })}
            </Swiper>
            <Swiper
              onSwiper={setThumbsSwiper}
              loop={true}
              slidesPerView={6}
              watchSlidesProgress={true}
              modules={[
                Navigation,
                Scrollbar,
                A11y,
                Thumbs,
                FreeMode,
                Autoplay,
              ]}
              freeMode={true}
              className={styles.thumbsSwiper}
              spaceBetween={2}
            >
              {informationList
                .filter((information) =>
                  information.urlList.find((url) =>
                    url.url.includes("youtube"),
                  ),
                )
                .map((information) => (
                  <SwiperSlide key={information.id}>
                    <div className={styles.imageContainer}>
                      <Image
                        src={`https://img.youtube.com/vi/${
                          information.urlList
                            .find((url) => url.url.includes("youtube"))
                            ?.url.split("=")[1]
                        }/sddefault.jpg`}
                        alt={information.title}
                        quality={100}
                        fill={true}
                        className={styles.image}
                      />
                    </div>
                  </SwiperSlide>
                ))}
            </Swiper>
          </div>
        </article>
        {years.map((year, index) => (
          <article key={year} className={styles.article}>
            <div className={styles.h2Container}>
              <h2 className={`${blackOpsOne.className} ${styles.h2}`}>{`${
                index === years.length - 1 ? "~ " : ""
              }${year}`}</h2>
            </div>
            <ul className={styles.list}>
              {illustrationsByYear[year].map((illustration) => (
                <li key={illustration.image.url}>
                  <div
                    className={styles.imageContainer}
                    onClick={() =>
                      setIndex(
                        illustrations.findIndex(
                          (i) => i.image.url === illustration.image.url,
                        ),
                      )
                    }
                  >
                    <Image
                      src={illustration.image.url}
                      alt={new URL(illustration.image.url).hostname}
                      fill={true}
                      className={styles.image}
                      quality={100}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
      <Lightbox
        open={index !== null}
        close={() => setIndex(null)}
        index={index ?? 0}
        slides={illustrations.map((illustration) => ({
          src: illustration.image.url,
        }))}
        className={styles.lightbox}
      />
    </>
  );
}
