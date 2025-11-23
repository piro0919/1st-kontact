import type { Metadata } from "next";
import { use } from "react";
import client from "@/lib/client";
import Works from "./_components/Works";

export const metadata: Metadata = {
  title: "Works",
  description:
    "こんたくんのイラスト作品一覧です。これまでに制作したイラストをご覧いただけます。",
  openGraph: {
    title: "Works | 1stKontact",
    description:
      "こんたくんのイラスト作品一覧です。これまでに制作したイラストをご覧いただけます。",
  },
};

const getIllustrations = async () => {
  const illustrations = await client.getList({
    endpoint: "illustrations",
    queries: {
      limit: 100,
    },
    customRequestInit: {
      next: { revalidate: 86400 },
    },
  });
  return illustrations;
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
  const illustrations = use(getIllustrations());
  const informationList = use(getInformationList());

  return (
    <Works
      illustrations={illustrations.contents}
      informationList={informationList.contents}
    />
  );
}
