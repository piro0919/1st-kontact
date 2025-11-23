import {
  CreditCardIcon,
  EnvelopeIcon,
  NewspaperIcon,
  PhotoIcon,
} from "@heroicons/react/24/solid";
import { Black_Ops_One } from "next/font/google";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./style.module.css";

const blackOpsOne = Black_Ops_One({
  subsets: ["latin"],
  weight: ["400"],
});

export default function MobileMenu() {
  const pathname = usePathname();
  return (
    <div className={styles.container}>
      <Link
        href="/news"
        className={`${blackOpsOne.className} ${styles.link} ${
          pathname === "/news" ? styles.active : ""
        }`}
      >
        <NewspaperIcon className={styles.icon} />
        <span className={styles.name}>News</span>
      </Link>
      <Link
        href="/works"
        className={`${blackOpsOne.className} ${styles.link} ${
          pathname === "/works" ? styles.active : ""
        }`}
      >
        <PhotoIcon className={styles.icon} />
        <span className={styles.name}>Works</span>
      </Link>
      <Link
        href="/pricing"
        className={`${blackOpsOne.className} ${styles.link} ${
          pathname === "/pricing" ? styles.active : ""
        }`}
      >
        <CreditCardIcon className={styles.icon} />
        <span className={styles.name}>Pricing</span>
      </Link>
      <Link
        href="/contact"
        className={`${blackOpsOne.className} ${styles.link} ${
          pathname === "/contact" ? styles.active : ""
        }`}
      >
        <EnvelopeIcon className={styles.icon} />
        <span className={styles.name}>Contact</span>
      </Link>
    </div>
  );
}
