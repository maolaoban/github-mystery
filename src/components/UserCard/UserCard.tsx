import { useTranslation } from 'react-i18next';
import { useStore } from '../../store/useStore';
import { Icon } from '../Icon/Icon';
import styles from './UserCard.module.css';

export function UserCard() {
  const { t, i18n } = useTranslation();
  const user = useStore((state) => state.user);
  const loading = useStore((state) => state.loading);

  if (!user || loading) return null;

  const locale = i18n.language === 'zh' ? 'zh-CN' : 'en-US';
  const joinedDate = new Date(user.created_at).toLocaleDateString(locale, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return (
    <div className={styles.userCard}>
      <div className={styles.userProfile}>
        <img
          className={styles.userAvatar}
          src={user.avatar_url}
          alt="avatar"
        />
        <div className={styles.userInfoText}>
          <div>
            <a
              className={styles.userName}
              href={user.html_url}
              target="_blank"
              rel="noopener noreferrer"
              title={t('user.viewProfile', { username: user.login })}
            >
              <span>{user.name || user.login}</span>
              <span className={styles.userLogin}>@{user.login}</span>
            </a>
          </div>
          <div className={styles.userBio}>{user.bio || t('user.noBio')}</div>
          <div className={styles.userMetaStats}>
            <span>
              <Icon name="database" size={14} /> {t('user.repos')}:{' '}
              <strong>{user.public_repos || 0}</strong>
            </span>
            <span>
              <Icon name="user-friends" size={14} /> {t('user.followers')}:{' '}
              <strong>{user.followers || 0}</strong>
            </span>
            <span>
              <Icon name="calendar-alt" size={14} /> {t('user.joined')}:{' '}
              <strong>{joinedDate}</strong>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
