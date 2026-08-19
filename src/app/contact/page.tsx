import { use } from "react";
import client from "@/lib/client";
import pageMetadata from "../pageMetadata";
import Contact from "./_components/Contact";

export const metadata = pageMetadata({
  description: "イラスト制作のご依頼・お問い合わせはこちらからお願いします。",
  path: "/contact",
  title: "Contact",
});

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
