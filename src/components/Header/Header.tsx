import { useTranslation } from "react-i18next";
import { useStore } from "../../store/useStore";
import { Icon } from "../Icon/Icon";
import styles from "./Header.module.css";

export function Header() {
  const { t } = useTranslation();
  const loading = useStore((state) => state.loading);
  const loadRandomUser = useStore((state) => state.loadRandomUser);

  return (
    <header className={styles.header}>
      <div className={styles.headerLeft}>
        <span className={styles.logoIcon}>
          <i className="devicon-github-original"></i>
        </span>
        <h1 className={styles.title}>{t("header.title")}</h1>
      </div>
      <button
        className={`${styles.randomBtn} ${loading ? styles.spinning : ""}`}
        onClick={loadRandomUser}
        disabled={loading}
      >
        <Icon name="dice" size={16} /> {t("header.randomButton")}
      </button>
    </header>
  );
}
