import { useTranslation } from 'react-i18next';
import { useStore } from '../../store/useStore';
import { Icon } from '../Icon/Icon';
import styles from './ErrorState.module.css';

export function ErrorState() {
  const { t } = useTranslation();
  const error = useStore((state) => state.error);
  const loadRandomUser = useStore((state) => state.loadRandomUser);

  if (!error) return null;

  return (
    <div className={styles.errorState}>
      <div className={styles.errorIcon}>
        <Icon name="rocket" size={38} />
      </div>
      <div className={styles.errorTitle}>{t('error.title')}</div>
      <div className={styles.errorDesc}>{error}</div>
      <button className={styles.retryBtn} onClick={loadRandomUser}>
        {t('error.retry')}
      </button>
    </div>
  );
}
