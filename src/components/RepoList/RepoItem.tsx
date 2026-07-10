import { getLangIcon } from '../../utils/langIcons';
import { Icon } from '../Icon/Icon';
import styles from './RepoList.module.css';

interface RepoItemProps {
  repo: {
    name: string;
    html_url: string;
    stargazers_count: number;
    forks_count: number;
    description: string | null;
    language: string | null;
  };
}

export function RepoItem({ repo }: RepoItemProps) {
  return (
    <div className={styles.repoItem}>
      <div className={styles.repoItemHeader}>
        <a
          className={styles.repoItemName}
          href={repo.html_url}
          target="_blank"
          rel="noopener noreferrer"
        >
          {repo.name}
        </a>
        <div className={styles.repoItemStats}>
          <span>
            <Icon name="star" size={13} /> {repo.stargazers_count}
          </span>
          <span>
            <Icon name="code-branch" size={13} /> {repo.forks_count}
          </span>
          {repo.language && (
            <span className={styles.repoItemLang}>
              <i className={getLangIcon(repo.language)}></i>
              {repo.language}
            </span>
          )}
        </div>
      </div>
      <div
        className={`${styles.repoItemDesc} ${
          repo.description ? '' : styles.empty
        }`}
      >
        {repo.description || 'No description available'}
      </div>
    </div>
  );
}
