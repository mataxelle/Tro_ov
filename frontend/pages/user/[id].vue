<template>
  <div v-if="userStore.user" class="mt-5 py-5 px-5 ">
    <div class="card mx-auto my-5">
        <div class="content mx-auto my-5">
      <p class="card-text lh-lg">
        Nom : <strong>{{ userStore.user.name }}</strong>
      </p>
      <p class="card-text lh-lg">
        Email : <strong>{{ userStore.userEmail }}</strong>
      </p>
    </div>
    <div class="d-flex justify-content-around my-5">
      <NuxtLink :to="`/user/edit/${userStore.user._id}`" class="btn btn-warning btnSize">Modifier</NuxtLink>
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
            <button @click="deleteUser" type="button" class="btn btn-danger">Supprimer</button>
          </div>
        </div>
      </div>
    </div>
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from "~/stores/user";

const userStore = useUserStore();
</script>

<style>
.card {
  border: 2px solid #28a745;
  border-radius: 8px;
  max-width: 400px;
}
</style>