import { ReactNode } from "react";
import styles from "./style.module.scss";
import Footer from "components/Footer";
import Header from "components/Header";

export type LayoutProps = {
  children: ReactNode;
};

function Layout({ children }: LayoutProps): JSX.Element {
  return (
    <div>
      <Header />
      <main>{children}</main>
      <div className={styles.footerWrapper}>
        <Footer />
      </div>
    </div>
  );
}

export default Layout;
