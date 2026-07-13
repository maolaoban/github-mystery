import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useStore } from "../../store/useStore";
import styles from "./Skeleton.module.css";

export function Skeleton() {
  const loading = useStore((state) => state.loading);
  const { t } = useTranslation();
  const [textIndex, setTextIndex] = useState(0);

  const texts = t("skeleton.loading", { returnObjects: true }) as string[];

  useEffect(() => {
    if (!loading) return;
    setTextIndex(Math.floor(Math.random() * texts.length));
    const timer = setInterval(() => {
      setTextIndex((prev) => (prev + 1) % texts.length);
    }, 1000);
    return () => clearInterval(timer);
  }, [loading, texts.length]);

  if (!loading) return null;

  return (
    <div className={styles.skeletonWrapper}>
      <div className={styles.skeletonProfile}>
        <div className={styles.skeletonAvatar}></div>
        <div className={styles.skeletonInfo}>
          <div className={`${styles.skeletonLine} ${styles.w50}`}></div>
          <div className={`${styles.skeletonLine} ${styles.w70}`}></div>
        </div>
      </div>

      <div className={styles.skeletonRepoList}>
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className={styles.skeletonRepoItem}>
            <div className={`${styles.skeletonLine} ${styles.w40}`}></div>
            <div className={`${styles.skeletonLine} ${styles.w60}`}></div>
          </div>
        ))}
      </div>

      <div className={styles.loadingText} key={textIndex}>
        {texts[textIndex]}
      </div>
    </div>
  );
}
