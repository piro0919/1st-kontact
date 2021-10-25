import { useMemo } from "react";
import { Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import styles from "./style.module.scss";

export type MovieProps = {
  videos: string[];
};

function Movie({ videos }: MovieProps): JSX.Element {
  const items = useMemo(
    () =>
      videos.map((video) => (
        <SwiperSlide key={video}>
          <div className={styles.iframeWrapper}>
            <iframe
              allowFullScreen={true}
              className={styles.iframe}
              src={`https://www.youtube.com/embed/${video.split("=")[1]}`}
            />
          </div>
        </SwiperSlide>
      )),
    [videos]
  );

  return (
    <Swiper
      className={styles.wrapper}
      modules={[Pagination]}
      pagination={{
        clickable: true,
      }}
      slidesPerView={1}
      spaceBetween={0}
      style={
        {
          "--swiper-pagination-bullet-inactive-color": "#808080",
          "--swiper-pagination-bullet-inactive-opacity": "1",
          "--swiper-pagination-color": "#fff",
        } as never
      }
    >
      {items}
    </Swiper>
  );
}

export default Movie;
