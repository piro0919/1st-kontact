import { Black_Ops_One, Mr_Dafoe } from "next/font/google";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./style.module.css";

const blackOpsOne = Black_Ops_One({
  subsets: ["latin"],
  weight: ["400"],
});

const mrDafoe = Mr_Dafoe({
  subsets: ["latin"],
  weight: ["400"],
});

export default function Header() {
  const pathname = usePathname();

  return (
    <header className={styles.header}>
      <Link href="/">
        <h1
          className={`${mrDafoe.className} ${styles.title} ${
            pathname === "/" ? styles.active : ""
          }`}
        >
          1stKontact
        </h1>
      </Link>
      <nav>
        <ul className={`${blackOpsOne.className} ${styles.list}`}>
          <li className={pathname.startsWith("/news") ? styles.active : ""}>
            <Link href="/news">News</Link>
          </li>
          <li className={pathname.startsWith("/works") ? styles.active : ""}>
            <Link href="/works">Works</Link>
          </li>
          <li className={pathname.startsWith("/pricing") ? styles.active : ""}>
            <Link href="/pricing">Pricing</Link>
          </li>
          <li className={pathname.startsWith("/contact") ? styles.active : ""}>
            <Link href="/contact">Contact</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
