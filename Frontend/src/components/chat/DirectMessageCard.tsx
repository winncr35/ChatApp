import type { Conversation } from '@/types/chat.ts'
import ChatCard from './ChatCard.tsx'
import { useChatStore } from '../../stores/useChatStore.ts';
import { useAuthStore } from "../../stores/useAuthStore.tsx";
import { cn } from '../../lib/utils.ts';
import UserAvatar from './UserAvatar.tsx';
import StatusBadge from './StatusBadge.tsx';
import UnreadCountBadge from './UnreadCountBadge.tsx';


const DirectMessageCard = ({ conversation }: { conversation: Conversation }) => {
    const { user } = useAuthStore();
    const { activeConversationId, setActiveConversation, messages, fetchMessages } = useChatStore();

    if (!user) return null;

    const otherUser = conversation.participants.find((participant) => participant._id !== user._id);
    if (!otherUser) return null;
    const unreadCount = conversation.unreadCounts[user._id];
    const lastMessage = conversation.lastMessage?.content ?? " ";

    const handleSelectConversation = async (id: string) => {
        setActiveConversation(id);
        if (!messages[id]) {
            await fetchMessages();
        }
    }


    return (
        <ChatCard
            convoid={conversation._id}
            name={otherUser.displayName ?? ""}
            timestamp={conversation.lastMessage?.createdAt ? new Date(conversation.lastMessage.createdAt) : undefined}
            isActive={activeConversationId === conversation._id}
            unreadCount={unreadCount}
            onSelect={handleSelectConversation}
            leftSection={
                <>
                    <UserAvatar
                        type="sidebar"
                        name={otherUser.displayName ?? ""}
                        avatarUrl={otherUser.avatarUrl ?? undefined}
                    />
                    <StatusBadge status="offline" />
                    {unreadCount > 0 &&
                        <UnreadCountBadge unreadCount={unreadCount} />
                    }
                </>
            }
            subtitle={
                <p className={cn("text-sm truncate", unreadCount > 0 ? "font-medium text-foreground " : "text-muted-foreground")}>
                    {lastMessage}
                </p>
            }
        />
    )
}

export default DirectMessageCard
