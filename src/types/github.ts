export interface GitHubUser {
  login: string;
  avatar_url: string;
  html_url: string;
  name: string | null;
  bio: string | null;
  public_repos: number;
  followers: number;
  created_at: string;
}

export interface GitHubRepo {
  name: string;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  description: string | null;
  language: string | null;
}

export interface Filters {
  language: string;
  minFollowers?: number;
}

export interface AppState {
  token: string;
  filters: Filters;
  user: GitHubUser | null;
  repos: GitHubRepo[];
  loading: boolean;
  error: string | null;
  setToken: (token: string) => void;
  setFilters: (filters: Partial<Filters>) => void;
  loadRandomUser: () => Promise<void>;
  clearError: () => void;
}
