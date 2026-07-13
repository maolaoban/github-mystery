import type { GitHubUser, GitHubRepo } from '../types/github';

const GITHUB_API_BASE = 'https://api.github.com';

async function fetchWithAuth(url: string, token?: string): Promise<Response> {
  const headers: Record<string, string> = {
    'Accept': 'application/vnd.github.v3+json',
  };

  if (token) {
    headers['Authorization'] = `token ${token}`;
  }

  const resp = await fetch(url, { headers });

  if (!resp.ok) {
    let msg = `HTTP ${resp.status}`;
    try {
      const data = await resp.json();
      if (data.message) msg = data.message;
    } catch {
      // ignore parse error
    }
    throw new Error(msg || resp.statusText);
  }

  return resp;
}

function generateRandomQuery(): string {
  const letters = 'abcdefghijklmnopqrstuvwxyz';
  const len = Math.random() > 0.5 ? 2 : 3;
  let query = '';
  for (let i = 0; i < len; i++) {
    query += letters[Math.floor(Math.random() * letters.length)];
  }
  return query;
}

export async function getRandomUser(token?: string, filters?: { language: string; minFollowers?: number }): Promise<GitHubUser> {
  const randomQuery = generateRandomQuery();
  const parts = [randomQuery, 'type:user', 'repos:>=1'];
  if (filters?.language) parts.push(`language:${filters.language}`);
  if (filters?.minFollowers && filters.minFollowers > 0) parts.push(`followers:>=${filters.minFollowers}`);
  const queryStr = parts.join(' ');
  const baseUrl = `${GITHUB_API_BASE}/search/users?q=${encodeURIComponent(queryStr)}`;

  const firstResp = await fetchWithAuth(`${baseUrl}&per_page=1`, token);
  const firstData = await firstResp.json();

  if (!firstData.items || firstData.total_count === 0) {
    return getRandomUser(token);
  }

  const totalCount = firstData.total_count;
  const backupUser = firstData.items[0];

  const maxPage = Math.min(Math.floor(totalCount / 30) + 1, 34);
  const randomPage = Math.floor(Math.random() * maxPage) + 1;

  const sorts = ['repositories', 'followers', 'joined', 'desc', 'asc'];
  const sort = sorts[Math.floor(Math.random() * sorts.length)];

  const secondResp = await fetchWithAuth(`${baseUrl}&per_page=30&sort=${sort}&page=${randomPage}`, token);
  const secondData = await secondResp.json();

  if (secondData.items && secondData.items.length > 0) {
    const randomIndex = Math.floor(Math.random() * secondData.items.length);
    return secondData.items[randomIndex];
  }

  return backupUser;
}

export async function fetchUserDetails(username: string, token?: string): Promise<GitHubUser> {
  const url = `${GITHUB_API_BASE}/users/${username}`;
  const resp = await fetchWithAuth(url, token);
  return await resp.json();
}

export async function fetchUserRepos(username: string, token?: string, limit = 10): Promise<GitHubRepo[]> {
  const url = `${GITHUB_API_BASE}/users/${username}/repos?per_page=${limit}&sort=pushed&direction=desc`;
  const resp = await fetchWithAuth(url, token);
  return await resp.json();
}
