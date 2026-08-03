import React from 'react'
import { Card } from '@/components/ui/card.tsx'
import { formatOnlineTime, cn } from '@/lib/utils.ts'
import { MoreHorizontal } from 'lucide-react';

interface ChatCardProps {
    convoid: string;
    name: string;
    timestamp?: Date;

    isActive: boolean;
    unreadCount?: number;
    onSelect: (id: string) => void;
    leftSection: React.ReactNode;
    subtitle: React.ReactNode;
}

const ChatCard = ({ convoid, name, timestamp, isActive, unreadCount, onSelect, leftSection, subtitle }
    : ChatCardProps) => {


    return (
        <Card
            key={convoid}
            className={cn("border-none p-3 cursor-pointer transition-smooth glass hover:bg-muted/30",
                isActive && "ring-2 ring-primary/50 bg-gradient-to-r from-primary-glow/10 to-primary-foreground/10 ")}
            onClick={() => onSelect(convoid)}
        >

            <div className='flex items-center gap-3'>
                <div className="relative">{leftSection}</div>

                <div className='flex-1 min-w-0'>
                    <div className='flex items-center justify-between mb-1'>
                        <h3 className={cn("font-semibold text-sm truncate",
                            unreadCount && unreadCount > 0 && "text-foreground")
                        }>{name}</h3>

                        <span className="text-xs text-muted-foreground">
                            {timestamp ? formatOnlineTime(timestamp) : " "}
                        </span>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1 flex-1 min-w-0">{subtitle}</div>
                        <MoreHorizontal className="text-muted-foreground size-4 opacity-0 group-hover:opacity-100 hover:size-5 transition-smooth" />
                    </div>
                </div>
            </div>

        </Card >
    )
}

export default ChatCard
