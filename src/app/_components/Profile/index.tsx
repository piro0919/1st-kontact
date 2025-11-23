import Image from "next/image";
import { SiAmazon, SiPixiv, SiX } from "react-icons/si";
import Spacer from "react-spacer";
import styles from "./style.module.css";

export default function Profile() {
  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        <Image src="/profile.jpg" alt="こんたくん" fill={true} quality={100} />
      </div>
      <div className={styles.content}>
        <h3 className={styles.name}>こんたくん</h3>
        <p className={styles.description}>フリーランス イラストレーター</p>
        <Spacer grow={1} />
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
              <SiX size={24} />
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
