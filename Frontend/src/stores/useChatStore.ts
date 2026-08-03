import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { ChatState } from '@/types/store';
import { chatService } from '../services/chatService.ts';
import { useAuthStore } from './useAuthStore.ts';

export const useChatStore = create<ChatState>()(
    persist(
        (set, get) => ({
            conversations: [],
            messages: {},
            activeConversationId: null,
            loading: false,
            messageLoading: false,

            setActiveConversation: (id) => set({ activeConversationId: id }),
            reset: () => {
                set({
                    conversations: [],
                    messages: {},
                    activeConversationId: null,
                    loading: false,

                });
            },
            fetchConversations: async () => {
                try {
                    set({ loading: true });
                    const { conversations } = await chatService.fetchConversations();
                    set({ conversations, loading: false });
                }
                catch (error) {
                    console.error("Error while fetchConversations:", error);
                    set({ loading: false })

                }
            }
            ,
            fetchMessages: async (conversationId) => {
                const { activeConversationId, messages } = get();
                const { user } = useAuthStore.getState();
                const convoId = conversationId ?? activeConversationId;
                if (!convoId) return;

                const current = messages?.[convoId]
                const nextCursor = current?.nextCursor ?? undefined ? "" : current?.nextCursor;

                if (nextCursor === null) return; // no more messages to fetch
                set({ loading: true });
            },
        }),
        {
            name: "chat-storage",
            partialize: (state) => ({ conversations: state.conversations }),
        }
    )
)
