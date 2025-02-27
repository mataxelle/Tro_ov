import { useAuthStore } from "~/stores/auth";
import { useUserStore } from "~/stores/user";

export default defineNuxtRouteMiddleware(async (to) => {
  const authStore = useAuthStore(); // Retrieving global state
  const userStore = useUserStore();
  const publicRoutes = ["/", "/login", "/register"];

  // If the route is public, do not apply the middleware
  if (publicRoutes.includes(to.path)) {
    return;
  }

  if (!authStore.isAuthenticated) {
    await authStore.checkAuth();
    if (!authStore.isAuthenticated) {
      return navigateTo("/login");
    }
  }

  if (authStore.isAuthenticated && !userStore.isLoggedIn) {
    await userStore.profile();
  }
});
