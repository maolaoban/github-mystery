import { useTranslation } from 'react-i18next';
import { Icon } from '../Icon/Icon';
import styles from './Footer.module.css';

export function Footer() {
  const { t } = useTranslation();

  return (
    <footer className={styles.footer}>
      <span className={styles.badge}>
        <Icon name="bullseye" size={14} /> {t('footer.badge')}
      </span>
      <span className={styles.hint}>
        <Icon name="keyboard" size={14} /> {t('footer.press')} <kbd>R</kbd> {t('footer.toRefresh')}
      </span>
    </footer>
  );
}
