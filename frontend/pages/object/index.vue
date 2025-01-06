<template>
  <div class="mt-5">
    <h1>Liste des Produits</h1>

    <article v-for="post in posts" :key="post.id">
      <h2>{{ post.name }}</h2>
    </article>
  </div>
</template>

<script>
export default {
  name: "index",

  data() {
    return {
      posts: "",
    };
  },
  async mounted() {
    try {
      await fetch("http://localhost:5000/api/users/", {
        method: "GET",
        headers: {
          headers: {
            Accept: "application/json",
          },
          credentials: "include",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Données reçues mm:", data);
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
