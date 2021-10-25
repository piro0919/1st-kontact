import dayjs from "dayjs";
import React, { MouseEventHandler, useMemo } from "react";
import { BsFillArrowRightSquareFill } from "react-icons/bs";
import { SocialIcon } from "react-social-icons";
import styles from "./style.module.scss";

type Information = {
  date: string;
  title: string;
  urlList: string[];
};

export type InformationProps = {
  informations: Information[];
  onShowModal: MouseEventHandler<HTMLButtonElement>;
};

function Information({
  informations,
  onShowModal,
}: InformationProps): JSX.Element {
  const items = useMemo(
    () =>
      informations
        .filter((_, index) => index < 4)
        .map(({ date, title, urlList }) => (
          <li key={title}>
            <div>
              <p className={styles.dateWrapper}>
                {dayjs(date).format("YYYY/MM/DD")}
              </p>
              <a
                className={styles.anchor}
                href={urlList[0]}
                rel="noreferrer"
                target="_blank"
              >
                {title}
              </a>
              <div className={styles.linkWrapper}>
                {urlList.map((url) => (
                  <SocialIcon
                    className={styles.icon}
                    key={url}
                    target="_blank"
                    url={url}
                  />
                ))}
              </div>
            </div>
          </li>
        )),
    [informations]
  );

  return (
    <div>
      <ul className={styles.list}>{items}</ul>
      <div className={styles.iconWrapper}>
        <button onClick={onShowModal}>
          <BsFillArrowRightSquareFill size={24} />
        </button>
      </div>
    </div>
  );
}

export default Information;
