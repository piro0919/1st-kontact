import React, { useMemo } from "react";
import styles from "./style.module.scss";
import Article from "components/Article";
import Contact, { ContactProps } from "components/Contact";
import Illustration, { IllustrationProps } from "components/Illustration";
import Information, { InformationProps } from "components/Information";
import Movie from "components/Movie";
import Profile from "components/Profile";

export type TopProps = Pick<IllustrationProps, "illustrations"> &
  Pick<ContactProps, "onSubmit"> & {
    onShowInformationModal: InformationProps["onShowModal"];
  };

function Top({
  illustrations,
  onShowInformationModal,
  onSubmit,
}: TopProps): JSX.Element {
  const items = useMemo(
    () =>
      [
        {
          children: <Information onShowModal={onShowInformationModal} />,
          heading: "Information",
          maxWidth: "720px",
        },
        {
          children: <Movie />,
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
          heading: "Profile",
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
    [illustrations, onShowInformationModal, onSubmit]
  );

  return (
    <div className={styles.wrapper}>
      <div className={styles.inner}>{items}</div>
    </div>
  );
}

export default Top;
