import React from 'react'
import type { Conversation } from '@/types/chat.ts'
import ChatCard from './ChatCard.tsx'
const DirectMessageCard = ({ conversation }: { conversation: Conversation }) => {
    return (
        <ChatCard />
    )
}

export default DirectMessageCard
