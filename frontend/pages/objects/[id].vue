<template>
  <div class="mt-5 py-5 px-5">
    <h2 class="text-center mt-5 mb-5">{{ post.name }}</h2>

    <div class="card m-auto" style="max-width: 640px">
      <img class="img-fluid rounded-start" :src="post.imageUrl" alt="Image de l'objet" />
    </div>

    <div class="content mx-auto my-5" style="max-width: 640px">
      <p class="card-text lh-lg">
        {{ post.description }}
      </p>
      <p class="card-text lh-lg">
        {{ contenu }}
      </p>
    </div>
    <div class="d-flex justify-content-around">
      <NuxtLink :to="`/objects/edit/${post._id}`" class="btn btn-warning btnSize">Modifier</NuxtLink>
      <button type="btn" class="btn btn-danger btnSize" data-bs-toggle="modal" data-bs-target="#exampleModal">Supprimer
      </button>
    </div>
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true"
      ref="confirmationModal">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Confirmation</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Annuler</button>
            <button @click="deleteObject" type="button" class="btn btn-danger">Supprimer</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { format } from "date-fns";

export default {
  name: "default",

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
    async deleteObject() {
      await fetch("http://localhost:5000/api/objects/" + this.$route.params.id, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      // Close modal
      const modalElement = document.getElementById('exampleModal');
      const modal = bootstrap.Modal.getInstance(modalElement);
      if (modal) {
        modal.hide();
      }

      setTimeout(() => {
        this.$router.push("/objects");
      }, 300);
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

.btnSize {
  width: 100px;
}
</style>
