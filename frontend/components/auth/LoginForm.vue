<template>
  <div class="container d-flex justify-content-center align-items-center min-vh-100 bg-light">
    <div>
      <form @submit.prevent="submit" class="form-login p-4 rounded shadow bg-white">
        <h2 class="text-center text-success mb-4">Connexion</h2>
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
          <button class="btn btn-success" type="submit">Connexion</button>
        </div>

        <div v-if="errorMessage" class="alert alert-danger mt-3">
          {{ errorMessage }}
        </div>
      </form>
      <div class="d-flex flex-column mt-5">
        <span>Pas encore inscrit ?</span>
        <NuxtLink to="/register" class="text-danger">Créer mon compte</NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from '~/stores/auth';
import { loginSchema } from "~/schemas/LoginSchema";

const authStore = useAuthStore();

const email = ref('test@gmail.com');
const password = ref('azertyuiop');
const errors = ref({});
const errorMessage = ref("");

const submit = async () => {

  // Reset errors
  errors.value = {};
  errorMessage.value = "";

  // Validation with Joi
  const formData = { email: email.value, password: password.value };
  const { error } = loginSchema.validate(formData, { abortEarly: false });

  if (error) {
    // Get errors for each field
    error.details.forEach((err) => {
      errors.value[err.path[0]] = err.message;
    });
    return;
  }

  try {
    await authStore.login(formData.email, formData.password)
    navigateTo('/objects');
  } catch (error) {
    console.error(error);
    errorMessage.value = "An error has occurred. Please try again.";
  }
};
</script>

<style>
.form-login {
  border: 2px solid #28a745;
  border-radius: 8px;
  max-width: 400px;
}
</style>
