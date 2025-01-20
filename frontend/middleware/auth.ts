import { useAuth } from '@/stores/auth';

export default defineNuxtRouteMiddleware(() => {
  const auth = useAuth(); // Retrieving global state

  if (!auth.value.isAuthenticated) {
    return navigateTo('/login'); // Redirect unauthenticated user
  }
});
