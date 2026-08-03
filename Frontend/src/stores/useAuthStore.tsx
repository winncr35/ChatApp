import { create } from 'zustand';
import { toast } from 'sonner';
import { authService } from '@/services/authService.ts';
import type { AuthState } from '@/types/store';
import { persist } from 'zustand/middleware';
import { useChatStore } from './useChatStore.ts';


export const useAuthStore = create<AuthState>()(
    persist((set, get) => ({


        //STATE 

        accessToken: null,
        user: null,
        loading: false,



        // ACTION
        setAccessToken: (accessToken) => {
            set({ accessToken: accessToken });
        },
        clearState: () => {
            set({ accessToken: null, user: null, loading: false })
            localStorage.clear();
            useChatStore.getState().reset();

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
                localStorage.clear();
                useChatStore.getState().reset();
                const { accessToken } = await authService.Login(username, password);
                get().setAccessToken(accessToken);

                await get().fetchMe();
                useChatStore.getState().fetchConversations();

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
                set({ user: user })
            }
            catch (error) {
                console.error(error);
                set({ user: null, accessToken: null })
                throw error;
            }
            finally {
                set({ loading: false })
            }
        },
        refresh: async () => {
            try {
                set({ loading: true })
                const { user, fetchMe, setAccessToken } = get();
                const accessToken = await authService.refresh();
                setAccessToken(accessToken)
                if (!user) {
                    await fetchMe();
                }
                useChatStore.getState().fetchConversations();


            }
            catch (error) {
                console.error(error);
                toast.error("Login session is expire. Please Log in again!")
                get().clearState();
            }
            finally {
                set({ loading: false })
            }
        }
    }), {
        name: "auth-storage",
        partialize: (state) => ({ user: state.user })// persist user only
    })
);