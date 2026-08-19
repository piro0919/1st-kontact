import { use } from "react";
import client from "@/lib/client";
import pageMetadata from "../pageMetadata";
import Works from "./_components/Works";

export const metadata = pageMetadata({
  description:
    "こんたくんのイラスト作品一覧です。これまでに制作したイラストをご覧いただけます。",
  path: "/works",
  title: "Works",
});

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
