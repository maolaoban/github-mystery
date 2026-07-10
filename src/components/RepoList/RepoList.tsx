import { useTranslation } from 'react-i18next';
import { useStore } from '../../store/useStore';
import { Icon } from '../Icon/Icon';
import { RepoItem } from './RepoItem';
import styles from './RepoList.module.css';

export function RepoList() {
  const { t } = useTranslation();
  const repos = useStore((state) => state.repos);
  const user = useStore((state) => state.user);
  const loading = useStore((state) => state.loading);

  if (!user || loading || repos.length === 0) return null;

  return (
    <div className={styles.repoListContainer}>
      <div className={styles.repoListTitle}>
        <Icon name="folder-open" size={16} /> {t('repoList.title')}
        <span className={styles.repoCountLabel}>({t('repoList.showing', { count: repos.length })})</span>
      </div>

      <div className={styles.repoList}>
        {repos.map((repo) => (
          <RepoItem key={repo.name} repo={repo} />
        ))}
      </div>
    </div>
  );
}
