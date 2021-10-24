import React, { MouseEventHandler } from "react";
import { BsFillArrowRightSquareFill } from "react-icons/bs";
import styles from "./style.module.scss";

export type InformationProps = {
  onShowModal: MouseEventHandler<HTMLButtonElement>;
};

function Information({ onShowModal }: InformationProps): JSX.Element {
  return (
    <div>
      <ul className={styles.list}>
        {Array(4)
          .fill(undefined)
          .map((_, index) => (
            <li key={index}>
              <div>
                <p className={styles.dateWrapper}>2021/7/1</p>
                <a
                  className={styles.anchor}
                  href="https://www.google.co.jp/"
                  rel="noreferrer"
                  target="_blank"
                >
                  雑魚ちゃん(引きこもり歌い手youtuber)のオリジナルグッズのデザイン、制作をしました
                </a>
              </div>
            </li>
          ))}
      </ul>
      <div className={styles.iconWrapper}>
        <button onClick={onShowModal}>
          <BsFillArrowRightSquareFill size={24} />
        </button>
      </div>
    </div>
  );
}

export default Information;
