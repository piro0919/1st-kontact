import Image from "next/image";
import React, { useMemo } from "react";
import styles from "./style.module.scss";

type Price = {
  title: string;
  value: string;
};

export type PriceProps = {
  images: string[];
  priceList: Price[];
};

function Price({ images, priceList }: PriceProps): JSX.Element {
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
      images.map((image) => (
        <li key={image}>
          <div className={styles.imageWrapper}>
            <Image alt="" layout="fill" objectFit="contain" src={image} />
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
        <p>
          表記されている値段はすべて基本料金です。
          <br />
          内容により上下します。
          <br />
          すべてリテイク2回分（コンテンツによっては複数回）、ヒアリング代込の料金となっています。
          <br />
          ご予算に合わせた制作も可能です。
          <br />
          お気軽にご相談ください。
          <br />
          お支払いはPayPal、銀行振込に対応しています。
        </p>
      </article>
      <article className={styles.article}>
        <h3 className={styles.heading3}>納期について</h3>
        <p>
          納期の入金確認後、最短1週間〜1ヶ月です。
          <br />
          期限の指定がない場合、個人の都合で延長されることがあります（都度連絡します）。
        </p>
      </article>
      <article className={styles.article}>
        <h3 className={styles.heading3}>納品までの流れ</h3>
        <ol className={styles.list}>
          <li className={styles.item}>
            <h4>ご依頼</h4>
            <p>TwitterのDMからご連絡ください。</p>
          </li>
          <li className={styles.item}>
            <h4>ヒアリング・お見積り</h4>
            <p>通話でのヒアリングも可能です。</p>
          </li>
          <li className={styles.item}>
            <h4>ご入金</h4>
            <p>PayPal、銀行振込に対応しています。</p>
          </li>
          <li className={styles.item}>
            <h4>構図・ポーズラフ確認</h4>
            <p>リテイクが可能です。</p>
          </li>
          <li className={styles.item}>
            <h4>色ラフ</h4>
            <p>リテイクが可能です。</p>
          </li>
          <li className={styles.item}>
            <h4>最終確認</h4>
            <p>誤字脱字、装飾ミス、色味の修正のみ可能です。</p>
          </li>
          <li className={styles.item}>
            <h4>納品</h4>
            <p>ギガファイル便またはメールでの納品になります。</p>
          </li>
        </ol>
      </article>
    </div>
  );
}

export default Price;
