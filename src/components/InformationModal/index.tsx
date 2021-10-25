import dayjs from "dayjs";
import React, { useMemo } from "react";
import AriaModal, { AriaModalProps } from "react-aria-modal";
import { IoCloseOutline } from "react-icons/io5";
import { SocialIcon } from "react-social-icons";
import styles from "./style.module.scss";

type Information = {
  date: string;
  title: string;
  urlList: string[];
};

export type InformationModalProps = Pick<AriaModalProps, "onExit"> & {
  informations: Information[];
};

function InformationModal({
  informations,
  onExit,
}: InformationModalProps): JSX.Element {
  const items = useMemo(
    () =>
      informations.map(({ date, title, urlList }) => (
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
    <AriaModal
      onExit={onExit}
      titleText="Information"
      underlayClass={styles.wrapper}
    >
      <div className={styles.inner}>
        <ul className={styles.list}>{items}</ul>
        <div className={styles.buttonWrapper}>
          <button onClick={onExit}>
            <IoCloseOutline size={32} />
          </button>
        </div>
      </div>
    </AriaModal>
  );
}

export default InformationModal;
