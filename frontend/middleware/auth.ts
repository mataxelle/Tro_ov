import { useAuth } from '@/stores/auth'; // Import correct

export default defineNuxtRouteMiddleware(() => {
  const auth = useAuth(); // Récupération de l'état global

  if (!auth.value.isAuthenticated) {
    return navigateTo('/login'); // Redirige l'utilisateur non authentifié
  }
});
