import { defineStore } from 'pinia';

interface User {
    _id: string,
    name: string,
    email: string,
}

export const useUserStore = defineStore('user', {
    state: () => ({
        user: null as User | null,
        loading: false,
        error: null as string | null,
    }),

    actions: {
        async profile() {
            this.loading = true;
            this.error = null;
            try {
                if (import.meta.client) {
                    const response = await $fetch<User>("http://localhost:5000/api/users/me", {
                        method: "GET",
                        credentials: 'include',
                    });
                    console.log('RAW API RESPONSE :', response);
                    this.user = response;
                }
            } catch (error) {
                console.error('Erreur de récupération du profil : ', error);
                this.error = error instanceof Error ? error.message : 'Erreur inconnue';
                throw error;
            } finally {
                this.loading = false;
            }
        },

        clearUser() {
            this.user = null;
            this.error = null;
        }
    },

    getters: {
        isLoggedIn: (state) => !!state.user,
        userEmail: (state) => state.user?.email,
    },
});