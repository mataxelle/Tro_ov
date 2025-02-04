import { defineStore } from "pinia";

interface User {
  id: string;
  email: string;
}

export interface AuthState {
  isAuthenticated: boolean; // Indicates whether the user is logged in
  user: User | null;
  authToken: string | null;
  apiBaseUrl: string;
}

export const useAuthStore = defineStore("auth", {
  state: (): AuthState => {
    const config = useRuntimeConfig();
    return {
      isAuthenticated: false,
      user: null,
      authToken: null,
      apiBaseUrl: config.public.apiUrl as string, // Initialization as soon as the store is created
    };
  },

  actions: {
    async register(name: string, email: string, password: string) {
      try {
        const response = await $fetch<{
          user: User;
          token: string;
        }>(`${this.apiBaseUrl}/auth/signUp`, {
          method: "POST",
          body: { name, email, password },
        });

        this.user = response.user;
      } catch (error) {
        console.error("Registration error : ", error);
        throw error;
      }
    },

    async login(email: string, password: string) {
      try {
        const response = await $fetch<{
          user: User;
          token: string;
        }>(`${this.apiBaseUrl}/auth/signIn`, {
          method: "POST",
          body: { email, password },
          credentials: "include",
        });

        this.isAuthenticated = true;
        this.user = response.user;
        this.authToken = response.token;
      } catch (error) {
        console.error("Login error : ", error);
        throw error;
      }
    },

    async checkAuth() {
      try {
        const response = await $fetch<{
          isAuthenticated: boolean;
          user: User;
        }>(`${this.apiBaseUrl}/auth/authCheck`, {
          method: "GET",
          credentials: "include",
        });

        this.isAuthenticated = response.isAuthenticated;
        this.user = response.user;
      } catch (error) {
        console.error("Authentification error : ", error);
        this.logout();
      }
    },

    async logout() {
      try {
        await $fetch(`${this.apiBaseUrl}/auth/signOut`, {
          method: "POST",
          credentials: "include",
        });
      } catch (error) {
        console.error("Logout error : ", error);
      } finally {
        this.isAuthenticated = false;
        this.user = null;
        this.authToken = null;

        // Reassigning `apiBaseUrl` to prevent it from becoming empty
        this.$reset();
      }
    },
  },

  persist: true,
});
