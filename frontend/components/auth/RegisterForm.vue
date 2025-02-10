<template>
  <div class="container d-flex justify-content-center align-items-center min-vh-100 bg-light">
    <div>
      <form @submit.prevent="submit" class="form-login p-4 rounded shadow bg-white">
        <h2 class="text-center text-success mb-4">Rejoignez la communauté !</h2>
        <div class="mb-3">
          <label for="name" class="form-label">Nom</label>
          <input v-model="name" type="text" class="form-control" id="name" placeholder="Entrez votre nom" />
          <div v-if="errors.name" class="text-danger">{{ errors.name }}</div>
        </div>

        <div class="mb-3">
          <label for="email" class="form-label">Email</label>
          <input v-model="email" type="email" class="form-control" id="email" placeholder="Entrez votre email" />
          <div v-if="errors.email" class="text-danger">{{ errors.email }}</div>
        </div>

        <div class="mb-3">
          <label for="password" class="form-label">Mot de passe</label>
          <input v-model="password" type="password" id="password" class="form-control"
            placeholder="Entrez votre mot de passe" />
          <div v-if="errors.password" class="text-danger">
            {{ errors.password }}
          </div>
        </div>

        <div class="d-grid">
          <button class="btn btn-success" type="submit">Sinscrire</button>
        </div>

        <div v-if="errorMessage" class="alert alert-danger mt-3">
          {{ errorMessage }}
        </div>
      </form>
      <div class="d-flex flex-column mt-5">
        <span>Déjà inscrit ?</span>
        <NuxtLink to="/login" class="text-danger">Se connecter</NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from "#build/imports";
import { registerSchema } from "~/schemas/RegisterSchema";

const authStore = useAuthStore();

const name = ref("");
const email = ref("");
const password = ref("");
const errors = ref({});
const errorMessage = ref("");

const submit = async () => {
  errors.value = {};
  errorMessage.value = "";

  const formData = {
    name: name.value,
    email: email.value,
    password: password.value,
  };
  const { error } = registerSchema.validate(formData, {
    abortEarly: false,
  });

  if (error) {
    error.details.forEach((err) => {
      errors.value[err.path[0]] = err.message;
    });
    return;
  }

  try {
    await authStore.register(formData.name, formData.email, formData.password);
    navigateTo('/login');
  } catch (error) {
    console.error(error);
    errorMessage.value = "An error has occurred. Please try again.";
  }
}
  ;
</script>

<style>
.form-register {
  border: 2px solid #28a745;
  border-radius: 8px;
  max-width: 400px;
}
</style>
