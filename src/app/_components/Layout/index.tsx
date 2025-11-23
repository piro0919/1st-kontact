"use client";
import { type ReactNode, useEffect } from "react";
import useShowWindowSize from "use-show-window-size";
import { z } from "zod";
import ja from "zod/v4/locales/ja.js";
import Footer from "../Footer";
import Header from "../Header";
import MobileMenu from "../MobileMenu";
import Top from "../Top";
import styles from "./style.module.css";

export type LayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  useEffect(() => {
    z.config(ja());
  }, []);

  useShowWindowSize({
    disable: process.env.NODE_ENV === "production",
  });

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Header />
      </div>
      <div className={styles.content}>
        <Top />
        <main>{children}</main>
      </div>
      <Footer />
      <div className={styles.mobileMenu}>
        <MobileMenu />
      </div>
    </div>
  );
}
