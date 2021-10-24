import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import styles from "./style.module.scss";

type FieldValues = {
  budget: string;
  client: string;
  content: string;
  date: string;
  email: string;
  homepage: string;
  media: string;
  name: string;
  others: string;
  release: string;
};

export type ContactProps = {
  onSubmit: SubmitHandler<FieldValues>;
};

function Contact({ onSubmit }: ContactProps): JSX.Element {
  const { handleSubmit, register } = useForm<FieldValues>({
    defaultValues: {
      budget: "",
      client: "",
      content: "",
      date: "",
      email: "",
      homepage: "",
      media: "",
      name: "",
      others: "",
      release: "",
    },
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
        </div>
        <div className={styles.fieldWrapper}>
          <label className={styles.label} htmlFor="email">
            Email<abbr className={styles.abbr}>*</abbr>
          </label>
          <input
            {...register("email", { required: true })}
            className={styles.input}
            id="email"
          />
        </div>
        <div className={styles.fieldWrapper}>
          <label className={styles.label} htmlFor="homepage">
            貴社のホームページ
          </label>
          <input
            {...register("homepage")}
            className={styles.input}
            id="homepage"
          />
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
        </div>
        <div className={styles.fieldWrapper}>
          <label className={styles.label} htmlFor="date">
            希望納期<abbr className={styles.abbr}>*</abbr>
          </label>
          <input
            {...register("date", { required: true })}
            className={styles.input}
            id="date"
          />
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
