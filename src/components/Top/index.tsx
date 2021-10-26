import React, { useMemo } from "react";
import styles from "./style.module.scss";
import Article from "components/Article";
import Contact, { ContactProps } from "components/Contact";
import Illustration, { IllustrationProps } from "components/Illustration";
import Information, { InformationProps } from "components/Information";
import Movie, { MovieProps } from "components/Movie";
import Price, { PriceProps } from "components/Price";
import Profile from "components/Profile";

export type TopProps = Pick<IllustrationProps, "illustrations"> &
  Pick<ContactProps, "onSubmit"> &
  Pick<InformationProps, "informations"> &
  Pick<MovieProps, "videos"> &
  Pick<PriceProps, "images" | "priceList"> & {
    onShowInformationModal: InformationProps["onShowModal"];
  };

function Top({
  illustrations,
  images,
  informations,
  onShowInformationModal,
  onSubmit,
  priceList,
  videos,
}: TopProps): JSX.Element {
  const items = useMemo(
    () =>
      [
        {
          children: (
            <Information
              informations={informations}
              onShowModal={onShowInformationModal}
            />
          ),
          heading: "Information",
          maxWidth: "720px",
        },
        {
          children: <Movie videos={videos} />,
          className: styles.rightJustified,
          heading: "Movie",
          maxWidth: "720px",
        },
        {
          children: <Illustration illustrations={illustrations} />,
          heading: "Illustration",
        },
        {
          children: <Profile />,
          className: styles.rightJustified,
          heading: "Profile",
          maxWidth: "720px",
        },
        {
          children: <Price images={images} priceList={priceList} />,
          heading: "Price",
          maxWidth: "720px",
        },
        {
          children: <Contact onSubmit={onSubmit} />,
          className: styles.rightJustified,
          heading: "Contact",
          maxWidth: "720px",
        },
      ].map(({ children, className, heading, maxWidth }) => (
        <div className={className} key={heading}>
          <Article heading={heading} maxWidth={maxWidth}>
            {children}
          </Article>
        </div>
      )),
    [
      illustrations,
      images,
      informations,
      onShowInformationModal,
      onSubmit,
      priceList,
      videos,
    ]
  );

  return (
    <div className={styles.wrapper}>
      <div className={styles.inner}>{items}</div>
    </div>
  );
}

export default Top;
