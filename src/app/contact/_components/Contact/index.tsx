"use client";
import { ChevronRightIcon } from "@heroicons/react/24/solid";
import { ErrorMessage } from "@hookform/error-message";
import { zodResolver } from "@hookform/resolvers/zod";
import { Checkbox } from "pretty-checkbox-react";
import { useState } from "react";
import { useBottomScrollListener } from "react-bottom-scroll-listener";
import { useForm } from "react-hook-form";
import TextareaAutosize from "react-textarea-autosize";
import type { z } from "zod";
import type { Schema } from "@/lib/client";
import styles from "./style.module.css";
import { sendEmailSchema } from "../../schema";
import { sendEmail } from "../../actions";
import { useRouter } from "next/navigation";

export type ContactProps = {
  priceDetail: Schema["pricedetail"];
};

export default function Contact({ priceDetail }: ContactProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof sendEmailSchema>>({
    resolver: zodResolver(sendEmailSchema),
    defaultValues: {
      budget: "",
      client: "",
      content: "",
      date: "",
      email: "",
      homepage: "",
      isAgree: false,
      media: "",
      name: "",
      others: "",
      release: "",
    },
  });
  const router = useRouter();
  const onSubmit = async (data: z.infer<typeof sendEmailSchema>) => {
    await sendEmail(data);

    router.push("/contact/success");
  };
  const [enableAgree, setEnableAgree] = useState(false);
  const scrollRef = useBottomScrollListener<HTMLDivElement>(() => {
    setEnableAgree(true);
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <div className={styles.field}>
        <label htmlFor="name" className={styles.label}>
          <span>名前</span>
          <abbr title="必須">(必須)</abbr>
        </label>
        <input
          type="text"
          id="name"
          placeholder="例：山田 太郎"
          className={styles.input}
          {...register("name")}
        />
        <ErrorMessage
          errors={errors}
          name="name"
          render={({ message }) => <p className={styles.error}>{message}</p>}
        />
      </div>
      <div className={styles.field}>
        <label htmlFor="email" className={styles.label}>
          <span>メールアドレス</span>
          <abbr title="必須">(必須)</abbr>
        </label>
        <input
          type="email"
          id="email"
          placeholder="例：taro@example.com"
          className={styles.input}
          {...register("email")}
        />
        <ErrorMessage
          errors={errors}
          name="email"
          render={({ message }) => <p className={styles.error}>{message}</p>}
        />
      </div>
      <div className={styles.field}>
        <label htmlFor="homepage" className={styles.label}>
          <span>貴社ホームページURL</span>
          <abbr title="必須">(必須)</abbr>
        </label>
        <input
          type="url"
          id="homepage"
          placeholder="例：https://www.example.com"
          className={styles.input}
          {...register("homepage")}
        />
        <ErrorMessage
          errors={errors}
          name="homepage"
          render={({ message }) => <p className={styles.error}>{message}</p>}
        />
      </div>
      <div className={styles.field}>
        <label htmlFor="client" className={styles.label}>
          <span>最終クライアント名</span>
          <abbr title="必須">(必須)</abbr>
        </label>
        <input
          type="text"
          id="client"
          placeholder="例：株式会社〇〇（または個人名）"
          className={styles.input}
          {...register("client")}
        />
        <ErrorMessage
          errors={errors}
          name="client"
          render={({ message }) => <p className={styles.error}>{message}</p>}
        />
      </div>
      <div className={styles.field}>
        <label htmlFor="budget" className={styles.label}>
          <span>ご予算の目安</span>
          <abbr title="必須">(必須)</abbr>
        </label>
        <input
          type="text"
          id="budget"
          placeholder="例：10万円〜20万円程度"
          className={styles.input}
          {...register("budget")}
        />
        <ErrorMessage
          errors={errors}
          name="budget"
          render={({ message }) => <p className={styles.error}>{message}</p>}
        />
      </div>
      <div className={styles.field}>
        <label htmlFor="content" className={styles.label}>
          <span>ご依頼内容</span>
          <abbr title="必須">(必須)</abbr>
        </label>
        <input
          type="text"
          id="content"
          placeholder="例：イラスト制作（キャラクター2点、背景1点） など"
          className={styles.input}
          {...register("content")}
        />
        <ErrorMessage
          errors={errors}
          name="content"
          render={({ message }) => <p className={styles.error}>{message}</p>}
        />
      </div>
      <div className={styles.field}>
        <label htmlFor="release" className={styles.label}>
          <span>実績としての掲載可否</span>
          <abbr title="必須">(必須)</abbr>
        </label>
        <input
          type="text"
          id="release"
          placeholder="例：公開可 / 匿名なら可 / 公開不可"
          className={styles.input}
          {...register("release")}
        />
        <ErrorMessage
          errors={errors}
          name="release"
          render={({ message }) => <p className={styles.error}>{message}</p>}
        />
      </div>
      <div className={styles.field}>
        <label htmlFor="media" className={styles.label}>
          <span>掲載予定の媒体</span>
          <abbr title="必須">(必須)</abbr>
        </label>
        <input
          type="text"
          id="media"
          placeholder="例：Webサイト / SNS広告 / 印刷物 など"
          className={styles.input}
          {...register("media")}
        />
        <ErrorMessage
          errors={errors}
          name="media"
          render={({ message }) => <p className={styles.error}>{message}</p>}
        />
      </div>
      <div className={styles.field}>
        <label htmlFor="date" className={styles.label}>
          <span>希望納期</span>
          <abbr title="必須">(必須)</abbr>
        </label>
        <input
          type="date"
          id="date"
          placeholder="例：2026年1月末 希望"
          className={styles.input}
          {...register("date")}
        />
        <ErrorMessage
          errors={errors}
          name="date"
          render={({ message }) => <p className={styles.error}>{message}</p>}
        />
      </div>
      <div className={styles.field}>
        <label htmlFor="others" className={styles.label}>
          <span>その他のご相談内容</span>
          <abbr title="必須">(必須)</abbr>
        </label>
        <TextareaAutosize
          id="others"
          className={styles.textarea}
          placeholder="例：参考資料のURLや補足事項があればご記入ください"
          minRows={5}
          maxRows={10}
          {...register("others")}
        />
        <ErrorMessage
          errors={errors}
          name="others"
          render={({ message }) => <p className={styles.error}>{message}</p>}
        />
      </div>
      <div className={styles.field}>
        <label className={styles.label}>
          <span>利用規約への同意</span>
          <abbr title="必須">(必須)</abbr>
        </label>
        <div
          className={styles.termsOfService}
          ref={scrollRef}
          dangerouslySetInnerHTML={{ __html: priceDetail.termsOfService }}
        />
        <label htmlFor="isAgree" className={styles.checkboxContainer}>
          <Checkbox
            id="isAgree"
            className={styles.checkbox}
            disabled={!enableAgree}
            {...register("isAgree")}
          >
            上記の内容に同意する
          </Checkbox>
        </label>
        <ErrorMessage
          errors={errors}
          name="isAgree"
          render={({ message }) => <p className={styles.error}>{message}</p>}
        />
      </div>
      <div className={styles.submitButtonContainer}>
        <button type="submit" className={styles.submitButton}>
          <span>送信</span>
          <ChevronRightIcon className={styles.icon} />
        </button>
      </div>
    </form>
  );
}
