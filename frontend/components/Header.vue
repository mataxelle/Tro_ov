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
          <ul class="navbar-nav ms-auto" v-if="!auth.isAuthenticated">
            <li class="nav-item">
              <NuxtLink class="nav-link" to="/register">Inscription</NuxtLink>
            </li>
            <li class="nav-item">
              <NuxtLink class="nav-link" to="/login">Connexion</NuxtLink>
            </li>
          </ul>
          <ul class="navbar-nav ms-auto" v-else>
            <li class="nav-item">
              <NuxtLink class="nav-link" to="/objects">Catalogue</NuxtLink>
            </li>
            <li>
              <NuxtLink class="nav-link" to="/objects/create">Ajouter un objet</NuxtLink>
            </li>
            <li class="nav-item">
              <NuxtLink class="nav-link" @click="logout">Déconnexion</NuxtLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>

<script setup>
import { useAuth } from '~/stores/auth';
import { onMounted } from 'vue';

const auth = useAuth();

async function logout() {
  await fetch("http://localhost:5000/api/auth/signOut", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  });

  auth.value = {
    isAuthenticated: false, // Resets state
    user: null
  };

  //await this.$router.push("/login");
  return navigateTo('/login');
}

// Fonction pour persister l'état global au rafraîchissement
onMounted(async () => {
  try {
    const response = await $fetch("http://localhost:5000/api/auth/authCheck", {
      method: "GET",
      credentials: "include",
    });

    auth.value = {
      isAuthenticated: response.isAuthenticated,
      user: response.user,
    };
  } catch (error) {
    auth.value = {
      isAuthenticated: false,
    };
  }
});
</script>
