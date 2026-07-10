import { useTranslation } from "react-i18next";
import { useStore } from "../../store/useStore";
import { Icon } from "../Icon/Icon";
import styles from "./TokenInput.module.css";

export function TokenInput() {
  const { t, i18n } = useTranslation();
  const token = useStore((state) => state.token);
  const setToken = useStore((state) => state.setToken);

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === "en" ? "zh" : "en");
  };

  return (
    <div className={styles.tokenSection}>
      <span className={styles.tokenLabel}>
        <Icon name="key" size={14} /> {t("token.label")}
      </span>
      <input
        type="password"
        className={styles.tokenInput}
        placeholder={t("token.placeholder")}
        value={token}
        onChange={(e) => setToken(e.target.value)}
      />
      <span className={styles.tokenHint}>
        <Icon name="info-circle" size={14} />
        <a
          href="https://github.com/settings/tokens"
          target="_blank"
          rel="noopener noreferrer"
        >
          {t("token.generateLink")}
        </a>
      </span>
      <button
        className={styles.langSwitcher}
        onClick={toggleLanguage}
        title={i18n.language === "en" ? "切换到中文" : "Switch to English"}
      >
        <Icon name="language" size={14} />
      </button>
    </div>
  );
}
