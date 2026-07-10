import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { AppState, Filters } from '../types/github';
import {
  searchUsers,
  fetchUserDetails,
  fetchUserRepos,
  buildSearchQuery,
  shuffleArray,
} from '../services/github';

const defaultFilters: Filters = {
  language: '',
  minFollowers: 50,
};

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      token: '',
      filters: { ...defaultFilters },
      user: null,
      repos: [],
      loading: false,
      error: null,

      setToken: (token: string) => set({ token }),

      setFilters: (newFilters: Partial<Filters>) =>
        set((state) => ({
          filters: { ...state.filters, ...newFilters },
        })),

      clearError: () => set({ error: null }),

      loadRandomUser: async () => {
        const { token, filters } = get();

        set({ loading: true, error: null, user: null, repos: [] });

        try {
          const query = buildSearchQuery(
            filters.language,
            filters.minFollowers
          );

          const items = await searchUsers(query, token);

          if (items.length === 0) {
            throw new Error('No matching users found');
          }

          const shuffled = shuffleArray(items);
          const selectedItem = shuffled[0];

          const userDetail = await fetchUserDetails(selectedItem.login, token);
          const repos = await fetchUserRepos(selectedItem.login, token, 10);

          set({ user: userDetail, repos });
        } catch (err) {
          console.error(err);
          let msg = (err as Error).message;

          if (msg.includes('API rate limit') || msg.includes('403')) {
            msg = 'GitHub API rate limit exceeded. Please add a personal access token (Token) or try again later.';
          }

          set({ error: msg || 'Loading failed, please try again later.' });
        } finally {
          set({ loading: false });
        }
      },
    }),
    {
      name: 'github-mystery-storage',
      partialize: (state) => ({ token: state.token }),
    }
  )
);
