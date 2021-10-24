import React from "react";
import { SiPixiv, SiAmazon, SiTwitter } from "react-icons/si";
import styles from "./style.module.scss";

function Profile(): JSX.Element {
  return (
    <div className={styles.wrapper}>
      <div>
        <p className={styles.titleWrapper}>Name</p>
        <p>Konta</p>
      </div>
      <div>
        <p className={styles.titleWrapper}>Job</p>
        <p>Freelance Illustrator</p>
      </div>
      <div>
        <p className={styles.titleWrapper}>Link</p>
        <ul className={styles.list}>
          <li>
            <a
              href="https://www.pixiv.net/users/611388"
              rel="noopener noreferrer"
              target="_blank"
            >
              <SiPixiv size={24} />
            </a>
          </li>
          <li>
            <a
              href="https://twitter.com/konta_niki"
              rel="noopener noreferrer"
              target="_blank"
            >
              <SiTwitter size={24} />
            </a>
          </li>
          <li>
            <a
              href="https://www.amazon.co.jp/registry/wishlist/2QLLPSHYTAY0F/ref=cm_sw_r_cp_ep_ws_38-hCbHB6PEZ3"
              rel="noopener noreferrer"
              target="_blank"
            >
              <SiAmazon size={24} />
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Profile;
