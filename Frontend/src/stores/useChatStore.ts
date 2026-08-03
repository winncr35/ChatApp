import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { ChatState } from '@/types/store';
import { chatService } from '../services/chatService.ts';
import { useAuthStore } from './useAuthStore.tsx';
export const useChatStore = create<ChatState>()(
    persist(
        (set, get) => ({
            conversations: [],
            messages: {},
            activeConversationId: null,
            conversationLoading: false,
            messageLoading: false,

            setActiveConversation: (id) => set({ activeConversationId: id }),
            reset: () => {
                set({
                    conversations: [],
                    messages: {},
                    activeConversationId: null,
                    conversationLoading: false,

                });
            },
            fetchConversations: async () => {
                try {
                    set({ conversationLoading: true });
                    const { conversations } = await chatService.fetchConversations();
                    set({ conversations, conversationLoading: false });
                }
                catch (error) {
                    console.error("Error while fetchConversations:", error);
                    set({ conversationLoading: false })

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
                set({ messageLoading: true });
                try {
                    const { messages: fetched, cursor } = await chatService.fetchMessages(convoId, nextCursor);
                    const processed = fetched.map((m) => ({
                        ...m,
                        isOwn: m.senderId === user?._id,

                    }));

                    set((state) => {

                        const prev = state.messages[convoId]?.items ?? [];
                        const merged = prev.length > 0 ? [...processed, ...prev] : [...processed];

                        return {
                            messages: {
                                ...state.messages,
                                [convoId]: {
                                    items: merged,
                                    hasMore: !!cursor,
                                    nextCursor: cursor ?? null,
                                },
                            }


                        }
                    });
                }
                catch (error) {
                    console.error("Error while fetchMessages:", error);

                }
                finally {
                    set({ messageLoading: false });
                }
            },
        }),
        {
            name: "chat-storage",
            partialize: (state) => ({ conversations: state.conversations }),
        }
    )
)
