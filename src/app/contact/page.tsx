import { use } from "react";
import client from "@/lib/client";
import Contact from "./_components/Contact";

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
