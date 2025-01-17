// Définition de la structure de l'état d'authentification
export interface AuthState {
    isAuthenticated: boolean; // Indique si l'utilisateur est connecté
    user?: {
        id: string; // ID de l'utilisateur
        email: string; // Email de l'utilisateur
    };
}

// Fonction pour initialiser et gérer l'état global `auth`
export const useAuth = () =>
    useState<AuthState>('auth', () => ({
        isAuthenticated: false, // Valeur par défaut : utilisateur non connecté
    }));
