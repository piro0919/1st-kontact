import { yupResolver } from "@hookform/resolvers/yup";
import parse from "html-react-parser";
import { Checkbox } from "pretty-checkbox-react";
import React, { useState } from "react";
import { useBottomScrollListener } from "react-bottom-scroll-listener";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import styles from "./style.module.scss";

type FieldValues = {
  budget: string;
  client: string;
  content: string;
  date: string;
  email: string;
  homepage: string;
  isAgree: boolean;
  media: string;
  name: string;
  others: string;
  release: string;
};

const schema = yup.object().shape({
  budget: yup.string().required("報酬の予算について入力してください"),
  client: yup.string().required("大本のクライアント社名を入力してください"),
  content: yup.string().required("作業内容について入力してください"),
  date: yup.string().required("希望納期を入力してください"),
  email: yup
    .string()
    .required("Emailを入力してください")
    .email("Emailの形式で入力してください"),
  homepage: yup.string().url("urlの形式で入力してください"),
  isAgree: yup.boolean().isTrue("利用規約に同意してください"),
  media: yup.string().required("リリース媒体を入力してください"),
  name: yup.string().required("お名前を入力してください"),
  others: yup.string().required("その他、案件内容について入力してください"),
  release: yup.string().required("実績公開について入力してください"),
});

export type ContactProps = {
  onSubmit: SubmitHandler<FieldValues>;
  termsOfService: string;
};

function Contact({ onSubmit, termsOfService }: ContactProps): JSX.Element {
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<FieldValues>({
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
    resolver: yupResolver(schema),
  });
  const [enableAgree, setEnableAgree] = useState(false);
  const scrollRef = useBottomScrollListener<HTMLDivElement>(() => {
    setEnableAgree(true);
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.formInner}>
        <div className={styles.fieldWrapper}>
          <label className={styles.label} htmlFor="name">
            お名前<abbr className={styles.abbr}>*</abbr>
          </label>
          <input
            {...register("name", { required: true })}
            className={styles.input}
            id="name"
          />
          {errors.name ? (
            <p className={styles.errorWrapper}>{errors.name.message}</p>
          ) : null}
        </div>
        <div className={styles.fieldWrapper}>
          <label className={styles.label} htmlFor="email">
            Email<abbr className={styles.abbr}>*</abbr>
          </label>
          <input
            {...register("email", { required: true })}
            className={styles.input}
            id="email"
            type="email"
          />
          {errors.email ? (
            <p className={styles.errorWrapper}>{errors.email.message}</p>
          ) : null}
        </div>
        <div className={styles.fieldWrapper}>
          <label className={styles.label} htmlFor="homepage">
            貴社のホームページ
          </label>
          <input
            {...register("homepage")}
            className={styles.input}
            id="homepage"
            type="url"
          />
          {errors.homepage ? (
            <p className={styles.errorWrapper}>{errors.homepage.message}</p>
          ) : null}
        </div>
        <div className={styles.fieldWrapper}>
          <label className={styles.label} htmlFor="client">
            大本のクライアント社名<abbr className={styles.abbr}>*</abbr>
          </label>
          <input
            {...register("client", { required: true })}
            className={styles.input}
            id="client"
          />
          {errors.client ? (
            <p className={styles.errorWrapper}>{errors.client.message}</p>
          ) : null}
        </div>
        <div className={styles.fieldWrapper}>
          <label className={styles.label} htmlFor="budget">
            報酬の予算について<abbr className={styles.abbr}>*</abbr>
          </label>
          <input
            {...register("budget", { required: true })}
            className={styles.input}
            id="budget"
          />
          {errors.budget ? (
            <p className={styles.errorWrapper}>{errors.budget.message}</p>
          ) : null}
        </div>
        <div className={styles.fieldWrapper}>
          <label className={styles.label} htmlFor="content">
            作業内容について<abbr className={styles.abbr}>*</abbr>
          </label>
          <input
            {...register("content", { required: true })}
            className={styles.input}
            id="content"
          />
          {errors.content ? (
            <p className={styles.errorWrapper}>{errors.content.message}</p>
          ) : null}
        </div>
        <div className={styles.fieldWrapper}>
          <label className={styles.label} htmlFor="release">
            実績公開について<abbr className={styles.abbr}>*</abbr>
          </label>
          <input
            {...register("release", { required: true })}
            className={styles.input}
            id="release"
          />
          {errors.release ? (
            <p className={styles.errorWrapper}>{errors.release.message}</p>
          ) : null}
        </div>
        <div className={styles.fieldWrapper}>
          <label className={styles.label} htmlFor="media">
            リリース媒体<abbr className={styles.abbr}>*</abbr>
          </label>
          <input
            {...register("media", { required: true })}
            className={styles.input}
            id="media"
          />
          {errors.media ? (
            <p className={styles.errorWrapper}>{errors.media.message}</p>
          ) : null}
        </div>
        <div className={styles.fieldWrapper}>
          <label className={styles.label} htmlFor="date">
            希望納期<abbr className={styles.abbr}>*</abbr>
          </label>
          <input
            {...register("date", { required: true })}
            className={styles.input}
            id="date"
            type="date"
          />
          {errors.date ? (
            <p className={styles.errorWrapper}>{errors.date.message}</p>
          ) : null}
        </div>
        <div className={styles.fieldWrapper}>
          <label className={styles.label} htmlFor="others">
            その他、案件内容について<abbr className={styles.abbr}>*</abbr>
          </label>
          <textarea
            {...register("others", { required: true })}
            className={styles.textarea}
            id="others"
          />
          {errors.others ? (
            <p className={styles.errorWrapper}>{errors.others.message}</p>
          ) : null}
        </div>
        <div className={styles.fieldWrapper}>
          <label className={styles.label} htmlFor="isAgree">
            利用規約<abbr className={styles.abbr}>*</abbr>
          </label>
          <div className={styles.termsOfServiceField}>
            <div className={styles.termsOfServiceWrapper} ref={scrollRef}>
              {parse(termsOfService)}
            </div>
            <Checkbox
              {...register("isAgree", { required: true })}
              disabled={!enableAgree}
              id="isAgree"
            >
              上記の内容に同意する
            </Checkbox>
          </div>
          {errors.isAgree ? (
            <p className={styles.errorWrapper}>{errors.isAgree.message}</p>
          ) : null}
        </div>
      </div>
      <div className={styles.buttonWrapper}>
        <button className={styles.button} type="submit">
          送信
        </button>
      </div>
    </form>
  );
}

export default Contact;
