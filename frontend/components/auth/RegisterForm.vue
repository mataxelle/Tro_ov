<template>
  <div
    class="container d-flex justify-content-center align-items-center min-vh-100 bg-light"
  >
    <form
      @submit.prevent="submit"
      class="form-login p-4 rounded shadow bg-white"
    >
      <h2 class="text-center text-success mb-4">Rejoignez la communauté !</h2>
      <div class="mb-3">
        <label for="name" class="form-label">Nom</label>
        <input
          v-model="name"
          type="text"
          class="form-control"
          id="name"
          placeholder="Entre votre nom"
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
          placeholder="Entre votre email"
        />
        <div v-if="errors.email" class="text-danger">{{ errors.email }}</div>
      </div>

      <div class="mb-3">
        <label for="password" class="form-label">Mot de passe</label>
        <input
          v-model="password"
          type="password"
          id="password"
          class="form-control"
          placeholder="Entrez votre mot de passe"
        />
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
  </div>
</template>

<script>
import { registerSchema } from "~/schemas/RegisterSchema";

export default {
  name: "RegisterForm",

  data() {
    return {
      name: "",
      email: "",
      password: "",
      errors: {},
      errorMessage: "",
    };
  },

  methods: {
    async submit() {
      this.errors = {};
      this.errorMessage = "";

      const formData = {
        name: this.name,
        email: this.email,
        password: this.password,
      };
      const { error } = registerSchema.validate(formData, {
        abortEarly: false,
      });

      if (error) {
        error.details.forEach((err) => {
          this.errors[err.path[0]] = err.message;
        });
        return;
      }

      try {
        const response = await fetch("http://localhost:5000/api/auth/signUp", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });

        if (!response.ok) {
          const data = await response.json();
          this.errorMessage = data.message || "Erreur !";
          return;
        }

        await this.$router.push("/login");
      } catch (error) {
        console.error(err);
        this.errorMessage = "An error has occurred. Please try again.";
      }
    },
  },
};
</script>

<style>
.form-register {
  border: 2px solid #28a745;
  border-radius: 8px;
  max-width: 400px;
}
</style>
