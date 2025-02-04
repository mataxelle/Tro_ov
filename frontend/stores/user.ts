import { defineStore } from "pinia";

interface User {
  _id: string;
  name: string;
  email: string;
}

export const useUserStore = defineStore("user", {
  state: () => {
    const config = useRuntimeConfig();
    return {
      user: null as User | null,
      loading: false,
      error: null as string | null,
      apiBaseUrl: config.public.apiUrl as string,
    };
  },

  actions: {
    async profile() {
      this.loading = true;
      this.error = null;
      try {
        if (import.meta.client) {
          const response = await $fetch<User>(`${this.apiBaseUrl}/users/me`, {
            method: "GET",
            credentials: "include",
          });
          this.user = response;
        }
      } catch (error) {
        console.error("Error profil : ", error);
        this.error = error instanceof Error ? error.message : "Unknown error";
        throw error;
      } finally {
        this.loading = false;
      }
    },

    clearUser() {
      this.user = null;
      this.error = null;
    },
  },

  getters: {
    isLoggedIn: (state) => !!state.user,
    userEmail: (state) => state.user?.email,
  },
});
