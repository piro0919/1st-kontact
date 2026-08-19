import { use } from "react";
import client from "@/lib/client";
import pageMetadata from "../pageMetadata";
import Pricing from "./_components/Pricing";

export const metadata = pageMetadata({
  description: "イラスト制作の料金表です。ご依頼の際の参考にしてください。",
  path: "/pricing",
  title: "Pricing",
});

const getDeliveryImages = async () => {
  const deliveryImages = await client.getList({
    endpoint: "deliveryimages",
    queries: {
      limit: 100,
    },
    customRequestInit: {
      next: { revalidate: 86400 },
    },
  });

  return deliveryImages;
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

const getPriceList = async () => {
  const priceList = await client.getList({
    endpoint: "pricelist",
    queries: {
      limit: 100,
    },
    customRequestInit: {
      next: { revalidate: 86400 },
    },
  });
  return priceList;
};

export default function Page() {
  const deliveryImages = use(getDeliveryImages());
  const priceDetail = use(getPriceDetail());
  const priceList = use(getPriceList());

  return (
    <Pricing
      deliveryImages={deliveryImages.contents}
      priceDetail={priceDetail}
      priceList={priceList.contents}
    />
  );
}
