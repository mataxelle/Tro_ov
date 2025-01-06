<template>
  <div class="mt-5 py-5 px-5">
    <h1 class="text-center">Liste d'objets souvenirs</h1>
    <h2 class="text-center mt-5 mb-5">
      Un lieu où les souvenirs prennent vie, et où le partage crée des liens
      inoubliables !
    </h2>

    <h3 class="text-center text-secondary mb-5">Il n'y a pas de hasard</h3>

    <div class="row row-cols-1 row-cols-md-3 g-4 my-5">
      <div v-for="post in posts" :key="post.id" class="col">
        <div class="card h-100">
          <div class="card-body">
            <h5 class="card-title">{{ post.name }}</h5>
            <img
              class="card-img-top"
              :src="post.imageUrl"
              alt="Image de l'objet"
            />
            <NuxtLink
              :to="`/objects/${post._id}`"
              role="button"
              class="btn btn-outline-success my-4"
              >Lire mon histoire</NuxtLink
            >
          </div>
          <div class="card-footer">
            <p class="card-text d-flex justify-content-end">
              <small class="text-muted">
                <em>Posté le {{ formatDate(post.updatedAt) }}</em>
              </small>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { format } from "date-fns";

export default {
  name: "index",

  data() {
    return {
      posts: "",
    };
  },

  methods: {
    formatDate(date) {
      return format(new Date(date), "dd-MM-yyyy");
    },
  },

  async mounted() {
    try {
      await fetch("http://localhost:5000/api/objects/", {
        method: "GET",
        headers: {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          credentials: "include",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          this.posts = data;
        })
        .catch((error) => {
          console.error("Erreur lors de la requête:", error);
        });
    } catch (error) {
      console.log("NOOOOOOOOOOOOON");
    }
  },
};
</script>

<style>
.card {
  border: 2px solid #28a745;
  border-radius: 8px;
  max-width: 400px;
}
</style>
