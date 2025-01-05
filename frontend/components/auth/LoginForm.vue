<template>
  <div
    class="container d-flex justify-content-center align-items-center min-vh-100 bg-light"
  >
    <form
      class="form-login p-4 rounded shadow bg-white"
      @submit.prevent="submit"
    >
      <h2 class="text-center text-success mb-4">Connexion</h2>

      <div class="mb-3">
        <label for="email" class="form-label">Adresse e-mail</label>
        <input
          v-model="email"
          type="email"
          class="form-control"
          id="email"
          placeholder="Entrez votre e-mail"
          required
        />
      </div>

      <div class="mb-3">
        <label for="password" class="form-label">Mot de passe</label>
        <input
          v-model="password"
          type="password"
          class="form-control"
          id="password"
          placeholder="Entrez votre mot de passe"
          required
        />
      </div>

      <div class="d-grid">
        <button class="btn btn-success" type="submit">Se connecter</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "LoginForm",

  data() {
    return {
      email: "",
      password: "",
    };
  },

  methods: {
    async submit() {
      console.log("CLIQUER OK");
      await fetch("http://localhost:5000/api/auth/signIn", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: this.email,
          password: this.password,
        }),
      });

      await this.$router.push("/");
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
