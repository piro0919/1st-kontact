"use client";
import { ArrowRightIcon } from "@heroicons/react/24/solid";
import { Black_Ops_One } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import type { Schema } from "@/lib/client";
import styles from "./style.module.css";

const blackOpsOne = Black_Ops_One({
  subsets: ["latin"],
  weight: ["400"],
});

export type PricingProps = {
  deliveryImages: Schema["deliveryimages"][];
  priceDetail: Schema["pricedetail"];
  priceList: Schema["pricelist"][];
};

export default function Pricing({
  deliveryImages,
  priceDetail,
  priceList,
}: PricingProps) {
  const [index, setIndex] = useState<number | null>(null);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.articleContainer}>
          <article className={styles.article} article-data="menu">
            <div className={styles.h2Container}>
              <h2 className={`${blackOpsOne.className} ${styles.h2}`}>Menu</h2>
            </div>
            <ul className={styles.list}>
              {priceList.map((price) => (
                <li key={price.id}>
                  <div className={styles.content}>
                    <div className={styles.title}>{price.title}</div>
                    <div className={styles.divider} />
                    <div className={styles.value}>{price.value}</div>
                  </div>
                </li>
              ))}
            </ul>
          </article>
          <article className={styles.article} article-data="sample">
            <div className={styles.h2Container}>
              <h2 className={`${blackOpsOne.className} ${styles.h2}`}>
                Sample
              </h2>
            </div>
            <ul className={styles.list}>
              {deliveryImages.map((deliveryImage) => (
                <li key={deliveryImage.id}>
                  <div
                    className={styles.imageContainer}
                    onClick={() =>
                      setIndex(
                        deliveryImages.findIndex(
                          (i) => i.image.url === deliveryImage.image.url,
                        ),
                      )
                    }
                  >
                    <Image
                      src={deliveryImage.image.url}
                      alt={new URL(deliveryImage.image.url).hostname}
                      fill={true}
                      className={styles.image}
                      quality={100}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </article>
          <article className={styles.article} article-data="about">
            <div className={styles.h2Container}>
              <h2 className={`${blackOpsOne.className} ${styles.h2}`}>About</h2>
            </div>
            <div className={styles.about}>
              <section className={styles.section}>
                <h3 className={styles.h3}>料金について</h3>
                <div
                  dangerouslySetInnerHTML={{ __html: priceDetail.pricehtml }}
                  className={styles.content}
                />
              </section>
              <section className={styles.section}>
                <h3 className={styles.h3}>納品について</h3>
                <div
                  dangerouslySetInnerHTML={{ __html: priceDetail.datehtml }}
                  className={styles.content}
                />
              </section>
              <section className={styles.section}>
                <h3 className={styles.h3}>フローについて</h3>
                <div
                  dangerouslySetInnerHTML={{ __html: priceDetail.flowhtml }}
                  className={styles.content}
                />
              </section>
            </div>
          </article>
        </div>
        <div className={styles.linkContainer}>
          <Link href="/contact" className={styles.link}>
            <span>お問い合わせ</span>
            <ArrowRightIcon className={styles.icon} />
          </Link>
        </div>
      </div>
      <Lightbox
        open={index !== null}
        close={() => setIndex(null)}
        index={index ?? 0}
        slides={deliveryImages.map((deliveryImage) => ({
          src: deliveryImage.image.url,
        }))}
        className={styles.lightbox}
      />
    </>
  );
}
