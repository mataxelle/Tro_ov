import { defineStore } from "pinia";
import { useAuthStore } from "./auth";

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

    async profileEdit(name: string, email: string) {
      try {
        if (import.meta.client) {
          const response = await $fetch<{
            user: User;
            token: string;
          }>(`${this.apiBaseUrl}/users/me`, {
            method: "PUT",
            body: { name, email },
            credentials: "include",
          });
          this.user = response.user;
        }
      } catch (error) {
        console.error("Profil edit error : ", error);
        this.error = error instanceof Error ? error.message : "Unknown error";
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async profileDelete() {
      try {
        if (import.meta.client) {
          await $fetch<{
            user: User;
            token: string;
          }>(`${this.apiBaseUrl}/users/me`, {
            method: "DELETE",
            credentials: "include",
          });

          const auth = useAuthStore();
          auth.isAuthenticated = false;
          setTimeout(() => {
            const authToken = useCookie('authToken');
            authToken.value = null;
          }, 300);
        }
      } catch (error) {
        console.error("Profil delete error : ", error);
        this.error = error instanceof Error ? error.message : "Unknown error";
        throw error;
      } finally {
        this.user = null;
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
