import { defineStore } from "pinia";

interface Item {
  _id: string;
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
      object: null as Item | null,
      loading: false,
      error: null as string | null,
      apiBaseUrl: config.public.apiUrl as string,
    };
  },

  actions: {
    async getObjects() {
      this.loading = true;
      this.error = null;
      const authToken = useCookie("authToken");
      try {
        const response = await $fetch<Item[]>(`${this.apiBaseUrl}/objects`, {
          method: "GET",
          credentials: "include",
          headers: {
            Authorization: `Bearer ${authToken.value}`,
          },
        });
        this.objects = [...response];
        console.log("MON OBJECT STORE :", this.objects);
      } catch (error) {
        console.error("Error Objects : ", error);
        this.error = error instanceof Error ? error.message : "Unknown error";
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async objectCreate(
      name: string,
      description: string,
      colors: string,
      imageUrl: string,
      price: number
    ) {
      this.loading = true;
      this.error = null;
      try {
        const response = await $fetch<Item>(`${this.apiBaseUrl}/objects`, {
          method: "POST",
          credentials: "include",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: { name, description, colors, imageUrl, price },
        });
        this.object = response;
        console.log("MON OBJECT STORE :", this.object);
      } catch (error) {
        console.error("Error Objects : ", error);
        this.error = error instanceof Error ? error.message : "Unknown error";
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async objectEdit(
      name: string,
      description: string,
      colors: string,
      imageUrl: string,
      price: number,
      id: string,
    ) {
      this.loading = true;
      this.error = null;
      try {
        const response = await $fetch<Item>(
          `${this.apiBaseUrl}/objects/${id}`,
          {
            method: "PUT",
            credentials: "include",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: { name, description, colors, imageUrl, price },
          }
        );
        console.log("Réponse du serveur :", response);
        this.object = response;
        console.log("MON OBJECT STORE :", this.object);
      } catch (error) {
        console.error("Error Objects : ", error);
        this.error = error instanceof Error ? error.message : "Unknown error";
        throw error;
      } finally {
        this.loading = false;
      }
    },
  },

  getters: {
    objectId: (state) => state.object?._id,
  },
});
