import { defineStore } from "pinia";

interface Item {
  id: string;
  name: string;
  description: string;
  colors: string;
  imageUrl: string;
  price: number;
}

export const useObjectStore = defineStore("object", {
  state: () => {
    const config = useRuntimeConfig();
    return {
      objects: [] as Item[],
      loading: false,
      error: null as string | null,
      apiBaseUrl: config.public.apiUrl as string,
    };
  },

  actions: {
    async getObjects() {
      this.loading = true;
      this.error = null;
      const authToken = useCookie('authToken');
      try {
        const response = await $fetch<Item[]>(`${this.apiBaseUrl}/objects`, {
          method: "GET",
          credentials: "include",
          headers: {
            Authorization: `Bearer ${authToken.value}`
          }
        });
        this.objects = [...response];
        console.log('MON OBJECT STORE :', this.objects);
      } catch (error) {
        console.error("Error Objects : ", error);
        this.error = error instanceof Error ? error.message : "Unknown error";
        throw error;
      } finally {
        this.loading = false;
      }
    },
  },

  getters: {},
});
