import styles from "./style.module.css";

export default function Success() {
  return (
    <div className={styles.container}>
      <h1 className={styles.h1}>送信完了しました</h1>
      <p className={styles.p}>
        お問い合わせいただき、ありがとうございます。
        <br />
        後日、ご連絡させていただきます。
      </p>
    </div>
  );
}
