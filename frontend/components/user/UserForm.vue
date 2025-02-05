<template>
  <div
    class="container d-flex justify-content-center align-items-center min-vh-100 bg-light px-5"
  >
    <form
      @submit.prevent="submit"
      class="form-login p-4 rounded shadow bg-white"
    >
      <h2 class="text-center text-success mb-4">Modifier mon profil</h2>

      <div class="mb-3">
        <label for="name" class="form-label">Nom</label>
        <input
          v-model="name"
          type="text"
          class="form-control"
          id="name"
          placeholder="Entrez un nom"
        />
        <div v-if="errors.name" class="text-danger">{{ errors.name }}</div>
      </div>

      <div class="mb-3">
        <label for="email" class="form-label">Email</label>
        <input
          v-model="email"
          type="email"
          class="form-control"
          id="email"
          placeholder="Entrez votre email"
        />
        <div v-if="errors.email" class="text-danger">{{ errors.email }}</div>
      </div>

      <div class="d-grid">
        <button class="btn btn-success" type="submit">Modifier</button>
      </div>

      <div v-if="errorMessage" class="alert alert-danger mt-3">
        {{ errorMessage }}
      </div>
    </form>
  </div>
</template>

<script setup>
import { useUserStore } from '~/stores/user';
import { userSchema } from "~/schemas/UserSchema";

const props = defineProps({
    initialUser: {
      type: Object,
      default: () => ({}),
    },
});

const userStore = useUserStore();

const name = ref(props.initialUser.name || "");
const email = ref(props.initialUser.email || "");
const errors = ref({});
const errorMessage = ref('');

const submit = async () => {

  errors.value = {};
  errorMessage.value = '';

  const formData = { name: name.value, email: email.value };
  const { error } = userSchema.validate(formData, { abortEarly: false });

  if (error) {
    error.details.forEach((err) => {
      errors.value[err.path[0]] = err.message;
    });
    return;
  }

  try {
    await userStore.profileEdit(formData.name, formData.email);
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
