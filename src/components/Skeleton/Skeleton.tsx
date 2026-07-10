import { useStore } from "../../store/useStore";
import styles from "./Skeleton.module.css";

export function Skeleton() {
  const loading = useStore((state) => state.loading);

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
    </div>
  );
}
