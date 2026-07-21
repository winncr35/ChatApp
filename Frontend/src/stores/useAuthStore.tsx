import { create } from 'zustand';
import { toast, Toaster } from 'sonner';
import { authService } from '@/services/authService.ts';
import type { AuthState } from '@/components/types/store.ts';


export const useAuthStore = create<AuthState>((set, get) => ({
    accessToken: null,
    user: null,
    loading: false,
    clearState: () => {
        set({ accessToken: null, user: null, loading: false })
    },

    signUp: async (username, password, email, firstName, lastName) => {
        try {
            set({ loading: true })
            // call API
            await authService.signUp(username, password, email, firstName, lastName);
            toast.success("Account created successfully")
        }
        catch (error) {
            console.error(error);
            throw error;
        }
        finally {
            set({ loading: false })
        }
    },
    Login: async (username, password) => {
        try {
            set({ loading: true })
            const { accessToken } = await authService.Login(username, password);
            set({ accessToken });

            await get().fetchMe();


            toast.success('Welcome back to Qtalk 🎉')
        }
        catch (error) {
            console.error(error);
            toast.error("Login Failed")
        }
        finally {
            set({ loading: false });
        }
    },
    signOut: async () => {
        try {
            get().clearState();
            await authService.signOut();
            toast.success("Log out sucessfully")
        }
        catch (error) {
            console.error(error)
            toast.error("Log out error. Try Again!")
        }
    },
    fetchMe: async () => {
        try {
            set({ loading: true })
            const user = await authService.fetchMe();
            set({ user })
        }
        catch (error) {
            console.error(error);
            set({ user: null, accessToken: null })
            throw error;
        }
        finally {
            set({ loading: false })
        }
    }
}))