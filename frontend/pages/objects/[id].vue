<template>
  <div class="mt-5 py-5 px-5">
    <h2 class="text-center mt-5 mb-5">{{ post.name }}</h2>

    <div class="card m-auto" style="max-width: 640px">
      <img
        class="img-fluid rounded-start"
        :src="post.imageUrl"
        alt="Image de l'objet"
      />
    </div>

    <div class="content mx-auto my-5" style="max-width: 640px">
      <p class="card-text lh-lg">
        {{ contenu }}
      </p>
      <p class="card-text lh-lg">
        {{ contenu }}
      </p>
    </div>
  </div>
</template>

<script>
import { format } from "date-fns";

export default {
  data() {
    return {
      post: "",
      contenu: `On sait depuis longtemps que travailler avec du texte lisible et contenant du sens est source de distractions, et empêche de se concentrer sur la mise en page elle-même.
      L'avantage du Lorem Ipsum sur un texte générique comme 'Du texte. Du texte. Du texte.' est qu'il possède une distribution de lettres plus ou moins normale, et en tout cas comparable 
      avec celle du français standard. De nombreuses suites logicielles de mise en page ou éditeurs de sites Web ont fait du Lorem Ipsum leur faux texte par défaut,
      et une recherche pour 'Lorem Ipsum' vous conduira vers de nombreux sites qui n'en sont encore qu'à leur phase de construction.`,
    };
  },

  methods: {
    formatDate(date) {
      return format(new Date(date), "dd-MM-yyyy");
    },
  },

  async mounted() {
    try {
      await fetch(
        "http://localhost:5000/api/objects/" + this.$route.params.id,
        {
          method: "GET",
          headers: {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            credentials: "include",
          },
        }
      )
        .then((response) => response.json())
        .then((data) => {
          this.post = data;
        })
        .catch((error) => {
          console.error("Request Error:", error);
        });
    } catch (error) {
      console.log(error);
    }
  },
};
</script>

<style>
.card {
  border: 2px solid #28a745;
  border-radius: 8px;
}
</style>
