import { defineStore } from 'pinia';

interface User {
    id: string;
    email: string;
}

export interface AuthState {
    isAuthenticated: boolean; // Indicates whether the user is logged in
    user: User | null;
    authToken: string | null;
}

export const useAuthStore = defineStore('auth', {
    state: (): AuthState => ({
        isAuthenticated: false,
        user: null,
        authToken: null,
    }),

    actions: {
        async register(name: string, email: string, password: string) {
            try {
                const response = await $fetch<{
                    user: User,
                    token: string
                }>("http://localhost:5000/api/auth/signUp", {
                    method: "POST",
                    body: { name, email, password },
                });

                this.user = response.user;
            } catch (error) {
                console.error('Registration error : ', error);
                throw error;
            }
        },

        async login(email: string, password: string) {
            try {
                const response = await $fetch<{
                    user: User,
                    token: string
                }>("http://localhost:5000/api/auth/signIn", {
                    method: "POST",
                    body: { email, password },
                    credentials: "include",
                });

                this.isAuthenticated = true;
                this.user = response.user;
                this.authToken = response.token;
            } catch (error) {
                console.error('Login error : ', error);
                throw error;
            }
        },

        async checkAuth() {
            try {
                const response = await $fetch<{
                    isAuthenticated: boolean,
                    user: User
                }>("http://localhost:5000/api/auth/authCheck", {
                    method: "GET",
                    credentials: "include",
                });

                this.isAuthenticated = response.isAuthenticated;
                this.user = response.user;
            } catch (error) {
                console.error('Authentification error : ', error);
                this.logout();
            }
        },

        async logout() {
            try {
                await $fetch("http://localhost:5000/api/auth/authCheck", {
                    method: "GET",
                    credentials: "include",
                });
            } catch (error) {
                console.error('Logout error : ', error);
            } finally {
                this.isAuthenticated = false;
                this.user = null;
                this.authToken = null;
            }
        },
    },

    persist: true,
});
