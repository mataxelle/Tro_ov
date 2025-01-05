<template>
  <div
    class="container d-flex justify-content-center align-items-center min-vh-100 bg-light"
  >
    <form
      @submit.prevent="submit"
      class="form-login p-4 rounded shadow bg-white"
    >
      <h2 class="text-center text-success mb-4">Connexion</h2>
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
import { loginSchema } from "~/schemas/LoginSchema";

export default {
  name: "LoginForm",

  data() {
    return {
      email: "",
      password: "",
      errors: {},
      errorMessage: "", // Message global
    };
  },

  methods: {
    async submit() {
      // Reset errors
      this.errors = {};
      this.errorMessage = "";

      // Validation with Joi
      const formData = { email: this.email, password: this.password };
      const { error } = loginSchema.validate(formData, { abortEarly: false });

      if (error) {
        // Get errors for each field
        error.details.forEach((err) => {
          this.errors[err.path[0]] = err.message;
        });
        return;
      }

      try {
        const response = await fetch("http://localhost:5000/api/auth/signIn", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });

        if (!response.ok) {
          const data = await response.json();
          this.errorMessage = data.message || "Erreur connexion !";
          return;
        }

        await this.$router.push("/");
      } catch (err) {
        console.error(err);
        this.errorMessage = "An error has occurred. Please try again.";
      }
    },
  },
};
</script>

<style>
.form-login {
  border: 2px solid #28a745;
  border-radius: 8px;
  max-width: 400px;
}
</style>
