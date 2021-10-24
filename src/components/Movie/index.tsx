import styles from "./style.module.scss";

function Movie(): JSX.Element {
  return (
    <div className={styles.wrapper}>
      <iframe
        allowFullScreen={true}
        className={styles.iframe}
        src="https://www.youtube.com/embed/MJIxP7pIO9U"
      />
    </div>
  );
}

export default Movie;
