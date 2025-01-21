import { useAuth } from "~/stores/auth";

export default defineNuxtRouteMiddleware(async (to) => {
  const auth = useAuth(); // Retrieving global state
  console.log("État actuel de l'utilisateur :", auth.value);
  //const authToken = useCookie("authToken");
  const publicRoutes = ["/", "/login", "/register"];

  // Si la route est publique, ne pas appliquer le middleware
  if (publicRoutes.includes(to.path)) {
    return;
  }

  /*if (!authToken.value) {
    auth.value = { isAuthenticated: false, user: null };
    return navigateTo("/login");
  }*/

  try {
    interface AuthResponse {
      isAuthenticated: boolean;
      user?: {
        id: string;
        email: string;
      };
    }

    const response = await $fetch<AuthResponse>("http://localhost:5000/api/auth/authCheck", {
      method: "GET",
      /*headers: {
        Authorization: `Bearer ${authToken.value}`,
      },*/
      credentials: "include",
    });

    auth.value = {
      isAuthenticated: response.isAuthenticated,
      user: response.user || null,
    };

    console.log("Utilisateur connecté :", auth.value.user);
    if (!auth.value.isAuthenticated) {
      return navigateTo("/login");
    }
  } catch (error) {
    console.error("Erreur d'authentification:", error);
    auth.value = { isAuthenticated: false, user: null };
    return navigateTo("/login");
  }
});
