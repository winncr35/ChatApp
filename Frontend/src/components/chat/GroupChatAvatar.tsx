import type { Participant } from '@/types/chat.ts'
import UserAvatar from './UserAvatar.tsx';
import { Ellipsis } from 'lucide-react';

interface GroupChatAvatarProps {
    participants: Participant[];
    type: 'chat' | 'sidebar';
}

const GroupChatAvatar = ({ participants, type }: GroupChatAvatarProps) => {
    const avatars = [];
    const limit = Math.min(participants.length, 4); // Limit to 4 avatars for display

    for (let i = 0; i < limit; i++) {
        const member = participants[i];
        avatars.push(
            <UserAvatar
                key={i}
                type={type}
                name={member.displayName}
                avatarUrl={member.avatarUrl ?? undefined}
            />
        );
    }
    return (
        <div className="relative flex -space-x-2 *:data-[slot=avatar]:ring-background 
        *:data-[slot=avatar]:ring-2">
            {avatars}



            {/* if more than 4 participants, show a ... indicator */}
            {participants.length > 4 && (
                <div className="flex items-center z-10 justify-center size-8 rounded-full bg-muted
                    ring-2 ring-background text-muted-foreground
                ">
                    <Ellipsis className="size-4" />
                </div>
            )}
        </div>
    )
}

export default GroupChatAvatar
