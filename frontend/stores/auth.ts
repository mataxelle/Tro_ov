// Defining the Authentication State Structure
export interface AuthState {
    isAuthenticated: boolean; // Indicates whether the user is logged in
    user?: {
        id: string;
        email: string;
    } | null;
}

// Function to initialize and manage global `auth` state
export const useAuth = () =>
    useState<AuthState>('auth', () => ({
        isAuthenticated: false, // Default: user not logged in
        user: undefined
    }));
