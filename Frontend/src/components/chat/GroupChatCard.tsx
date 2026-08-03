import type { Conversation } from '@/types/chat.ts'
import ChatCard from './ChatCard.tsx'
import { useChatStore } from '../../stores/useChatStore.ts';
import { useAuthStore } from "../../stores/useAuthStore.tsx";
import { cn } from '../../lib/utils.ts';
import UnreadCountBadge from './UnreadCountBadge.tsx';
import StatusBadge from './StatusBadge.tsx';
import UserAvatar from './UserAvatar.tsx';
import GroupChatAvatar from './GroupChatAvatar.tsx';

const GroupChatCard = ({ conversation }: { conversation: Conversation }) => {
    const { user } = useAuthStore();
    const { activeConversationId, setActiveConversation, messages } = useChatStore();

    if (!user) return null;
    const unreadCount = conversation.unreadCounts[user._id];
    const name = conversation.group?.name ?? "";

    const handleSelectConversation = async (id: string) => {
        setActiveConversation(id);
        if (!messages[id]) {
        }
    }

    return (
        <ChatCard
            convoid={conversation._id}
            name={name}
            timestamp={conversation.lastMessage?.createdAt ? new Date(conversation.lastMessage.createdAt) : undefined}
            isActive={activeConversationId === conversation._id}
            unreadCount={unreadCount}
            onSelect={handleSelectConversation}
            leftSection={
                <>
                    {unreadCount > 0 && <UnreadCountBadge unreadCount={unreadCount} />}
                    <GroupChatAvatar
                        participants={conversation.participants}
                        type="chat"
                    />
                </>
            }
            subtitle={
                <p className="text-sm truncate text-muted-foreground">
                    {conversation.participants.length} members
                </p>
            }
        />
    )
}


export default GroupChatCard;
