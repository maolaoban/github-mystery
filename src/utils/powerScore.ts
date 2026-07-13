import type { GitHubUser, GitHubRepo } from '../types/github';

interface PowerResult {
  score: number;
  label: string;
  color: string;
}

export function calculatePowerScore(
  user: GitHubUser,
  repos: GitHubRepo[],
  t: (key: string) => string
): PowerResult {
  const totalStars = repos.reduce((sum, r) => sum + r.stargazers_count, 0);
  const score =
    (user.public_repos || 0) * 10 +
    totalStars * 2 +
    (user.followers || 0) * 5;

  if (score <= 50) {
    return { score, label: t('power.rookie'), color: '#8b949e' };
  }
  if (score <= 200) {
    return { score, label: t('power.apprentice'), color: '#58a6ff' };
  }
  if (score <= 500) {
    return { score, label: t('power.artisan'), color: '#3fb950' };
  }
  if (score <= 1000) {
    return { score, label: t('power.guru'), color: '#d29922' };
  }
  if (score <= 2000) {
    return { score, label: t('power.master'), color: '#f78166' };
  }
  return { score, label: t('power.legend'), color: '#a371f7' };
}
