import { create } from 'zustand';
import { toast, Toaster } from 'sonner';
import { authService } from '@/services/authService.ts';
import type { AuthState } from '@/components/types/store.ts';
export const useAuthStore = create<AuthState>((set, get) => ({
    accessToken: null,
    user: null,
    loading: false,

    signUp: async (username, password, email, firstName, lastName) => {
        try {
            set({ loading: true })
            // call API
            await authService.signUp(username, password, email, firstName, lastName);
            toast.success("Account created successfully")
        }
        catch (error) {
            console.error(error);
            toast.error('Signed up unsuccessful')
        }
        finally {
            set({ loading: false })
        }
    },
}))