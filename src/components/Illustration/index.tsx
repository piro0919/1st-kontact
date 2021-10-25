import useSwitch from "@react-hook/switch";
import Image from "next/image";
import React, { MouseEventHandler, useMemo } from "react";
import {
  BsFillArrowLeftSquareFill,
  BsFillArrowRightSquareFill,
} from "react-icons/bs";
import styles from "./style.module.scss";

type Illustration = {
  onClick: MouseEventHandler<HTMLDivElement>;
  url: string;
};

export type IllustrationProps = {
  illustrations: Illustration[];
};

function Illustration({ illustrations }: IllustrationProps): JSX.Element {
  const [showAll, { off: offShowAll, on: onShowAll }] = useSwitch(false);
  const items = useMemo(
    () =>
      illustrations
        .filter((_, index) => (showAll ? true : index < 6))
        .map(({ onClick, url }, index) => (
          <li key={index}>
            <div className={styles.imageWrapper} onClick={onClick}>
              <Image alt="" layout="fill" objectFit="cover" src={url} />
            </div>
          </li>
        )),
    [illustrations, showAll]
  );

  return (
    <div>
      <ul className={styles.list}>{items}</ul>
      <div className={styles.iconWrapper}>
        {showAll ? (
          <button onClick={offShowAll}>
            <BsFillArrowLeftSquareFill size={24} />
          </button>
        ) : (
          <button onClick={onShowAll}>
            <BsFillArrowRightSquareFill size={24} />
          </button>
        )}
      </div>
    </div>
  );
}

export default Illustration;
