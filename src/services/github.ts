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

export async function searchUsers(query: string, token?: string): Promise<GitHubUser[]> {
  const url = `${GITHUB_API_BASE}/search/users?q=${encodeURIComponent(query)}&per_page=30&sort=repositories`;
  const resp = await fetchWithAuth(url, token);
  const data = await resp.json();

  if (!data.items || data.items.length === 0) {
    throw new Error('No matching users found');
  }

  return data.items;
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

export function buildSearchQuery(language: string, minFollowers?: number): string {
  const parts = ['type:user'];

  if (language) {
    parts.push(`language:${language}`);
  }

  if (minFollowers && minFollowers > 0) {
    parts.push(`followers:>=${minFollowers}`);
  }

  if (parts.length === 1) {
    parts.push('repos:>=1');
  }

  return parts.join(' ');
}

export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}
