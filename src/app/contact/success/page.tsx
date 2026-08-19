import pageMetadata from "../../pageMetadata";
import Success from "./_components/Success";

export const metadata = pageMetadata({
  description: "お問い合わせを受け付けました。",
  indexable: false,
  path: "/contact/success",
  title: "送信完了",
});

export default function Page() {
  return <Success />;
}
