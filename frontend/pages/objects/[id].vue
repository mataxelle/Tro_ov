<template>
  <div class="mt-5 py-5 px-5">
    <div v-if="post">
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
        <button type="btn" class="btn btn-danger btnSize" data-bs-toggle="modal"
          data-bs-target="#exampleModal">Supprimer
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
    <div v-else>
      Loading ...
    </div>
  </div>
</template>

<script setup>
import { useObjectStore } from '~/stores/object';

const objectStore = useObjectStore();
const route = useRoute();

const contenu = `On sait depuis longtemps que travailler avec du texte lisible et contenant du sens est source de distractions, et empêche de se concentrer sur la mise en page elle-même.
      L'avantage du Lorem Ipsum sur un texte générique comme 'Du texte. Du texte. Du texte.' est qu'il possède une distribution de lettres plus ou moins normale, et en tout cas comparable 
      avec celle du français standard. De nombreuses suites logicielles de mise en page ou éditeurs de sites Web ont fait du Lorem Ipsum leur faux texte par défaut,
      et une recherche pour 'Lorem Ipsum' vous conduira vers de nombreux sites qui n'en sont encore qu'à leur phase de construction.`;

const { data: post, error, refresh } = useAsyncData('post', async () => {
  await objectStore.getOneObject(route.params.id);
  return objectStore.object;
});

const formatDate = (date) => {
  return new Date(date).toLocaleDateString();
};

const deleteObject = async () => {
  // Close modal
  const modalElement = document.getElementById('exampleModal');
  const modal = bootstrap.Modal.getInstance(modalElement);
  if (modal) {
    modal.hide();
  }

  await objectStore.objectDelete(route.params.id);

  setTimeout(() => {
    modalElement.setAttribute("aria-hidden", "false"); // To fix Element with focus
    navigateTo("/objects");
  }, 300);
}
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
