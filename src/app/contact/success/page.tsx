import type { Metadata } from "next";
import Success from "./_components/Success";

export const metadata: Metadata = {
  title: "送信完了",
  description: "お問い合わせを受け付けました。",
  robots: {
    index: false,
  },
};

export default function Page() {
  return <Success />;
}
