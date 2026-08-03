import api from '@/lib/axios.ts'

import type { ConversationResponse, Message } from '../types/chat.ts'

interface FetchMessagesProps {
    messages: Message[];
    cursor?: string;
}
const pageLimit = 50;

export const chatService = {
    async fetchConversations(): Promise<ConversationResponse> {
        const res = await api.get("/conversations");
        return res.data;
    },
    async fetchMessages(id: string, cursor?: string): Promise<FetchMessagesProps> {
        const res = await api.get(`/conversations/${id}/messages?limit=${pageLimit}&cursor=${cursor}`);
        return { messages: res.data.messages, cursor: res.data.nextCursor };
    },

}
//1:06:37
