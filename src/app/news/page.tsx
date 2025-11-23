import type { Metadata } from "next";
import { use } from "react";
import client from "@/lib/client";
import News from "./_components/News";

export const metadata: Metadata = {
  title: "News",
  description: "こんたくんの最新情報・お知らせです。",
  openGraph: {
    title: "News | 1stKontact",
    description: "こんたくんの最新情報・お知らせです。",
  },
};

const getInformationList = async () => {
  const informationList = await client.getList({
    endpoint: "informationlist",
    queries: {
      limit: 100,
    },
    customRequestInit: {
      next: { revalidate: 86400 },
    },
  });
  return informationList;
};

export default function Page() {
  const informationList = use(getInformationList());

  return <News informationList={informationList.contents} />;
}
