import type { Metadata } from "next";
import { use } from "react";
import client from "@/lib/client";
import Contact from "./_components/Contact";

export const metadata: Metadata = {
  title: "Contact",
  description: "イラスト制作のご依頼・お問い合わせはこちらからお願いします。",
  openGraph: {
    title: "Contact | 1stKontact",
    description: "イラスト制作のご依頼・お問い合わせはこちらからお願いします。",
  },
};

const getPriceDetail = async () => {
  const priceDetail = await client.getObject({
    endpoint: "pricedetail",
    customRequestInit: {
      next: { revalidate: 86400 },
    },
  });

  return priceDetail;
};

export default function Page() {
  const priceDetail = use(getPriceDetail());

  return <Contact priceDetail={priceDetail} />;
}
