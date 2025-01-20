<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark shadow" id="mainNav">
      <div class="container px-4">
        <NuxtLink class="navbar-brand" to="/">Tro_ov</NuxtLink>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive"
          aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarResponsive">
          <ul class="navbar-nav ms-auto">
            <li class="nav-item">
              <NuxtLink class="nav-link" to="/objects">Catalogue</NuxtLink>
            </li>
            <li>
              <NuxtLink class="nav-link" to="/objects/create">Ajouter un objet</NuxtLink>
            </li>
            <li class="nav-item">
              <NuxtLink class="nav-link" to="/register">Inscription</NuxtLink>
            </li>
            <li class="nav-item">
              <NuxtLink class="nav-link" to="/login">Connexion</NuxtLink>
            </li>
            <li class="nav-item">
              <a class="nav-link" @click="logout">Déconnexion</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import { useAuth } from '~/stores/auth';

export default {
  name: "Header",

  data() {
    return {
      auth: false,
    };
  },
  mounted() { },
  methods: {
    async logout() {
      await fetch("http://localhost:5000/api/auth/SignOut", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      const auth = useAuth();
      auth.value = {
        isAuthenticated: false, // Resets state
      };

      await this.$router.push("/login");
    },
  },
};
</script>
