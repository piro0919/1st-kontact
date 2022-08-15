import parse, { domToReact } from "html-react-parser";
import Image from "next/image";
import React, { MouseEventHandler, useMemo } from "react";
import styles from "./style.module.scss";

type Image = {
  onClick: MouseEventHandler<HTMLDivElement>;
  url: string;
};

type Price = {
  title: string;
  value: string;
};

export type PriceProps = {
  aboutDeliveryTime: string;
  aboutPrice: string;
  flowToDelivery: string;
  images: Image[];
  priceList: Price[];
};

function Price({
  aboutDeliveryTime,
  aboutPrice,
  flowToDelivery,
  images,
  priceList,
}: PriceProps): JSX.Element {
  const items = useMemo(
    () =>
      priceList.map(({ title, value }) => (
        <li key={title}>
          <div className={styles.itemInner}>
            <span>{title}</span>
            <div className={styles.line} />
            <span>{value}</span>
          </div>
        </li>
      )),
    [priceList]
  );
  const imageItems = useMemo(
    () =>
      images.map(({ onClick, url }) => (
        <li key={url}>
          <div className={styles.imageWrapper} onClick={onClick}>
            <Image
              alt=""
              layout="fill"
              objectFit="contain"
              quality={100}
              src={url}
              unoptimized={true}
            />
          </div>
        </li>
      )),
    [images]
  );

  return (
    <div>
      <ul className={styles.list}>{items}</ul>
      <article className={styles.article}>
        <h3 className={styles.heading3}>納品イメージ</h3>
        <ul className={styles.imageList}>{imageItems}</ul>
      </article>
      <article className={styles.article}>
        <h3 className={styles.heading3}>料金について</h3>
        {parse(aboutPrice)}
      </article>
      <article className={styles.article}>
        <h3 className={styles.heading3}>納期について</h3>
        {parse(aboutDeliveryTime)}
      </article>
      <article className={styles.article}>
        <h3 className={styles.heading3}>納品までの流れ</h3>
        {parse(flowToDelivery.replace(/ {2}/g, "<br />"), {
          replace: (domNode) => {
            if (!("name" in domNode)) {
              return;
            }

            const { name } = domNode;

            if (name === "ol" && "children" in domNode) {
              const { children } = domNode;

              return <ol className={styles.list}>{domToReact(children)}</ol>;
            }
          },
        })}
      </article>
    </div>
  );
}

export default Price;
