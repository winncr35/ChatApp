import { useChatStore } from "../../stores/useChatStore.ts";
import { SidebarInset } from "../ui/sidebar.tsx";
import ChatWelcomeScreen from "./ChatWelcomeScreen.tsx";
import ChatWindowBody from "./ChatWindowBody.tsx";
import ChatWindowSkeleton from "./ChatWindowSkeleton.tsx";
import ChatWindowHeader from "./ChatWindowHeader.tsx";
import MessageInput from "./MessageInput.tsx";
const ChatWindowLayout = () => {
    const {
        activeConversationId,
        conversations,
        messageLoading: loading,
        messages,
    } = useChatStore();

    const selectedConversation = conversations.find((c) => c._id === activeConversationId) ?? null;
    if (!selectedConversation) {
        return <ChatWelcomeScreen />;
    }
    if (loading) {
        return <ChatWindowSkeleton />;
    }

    return (
        <SidebarInset className="flex flex-col flex-1 h-full overflow-hidden rounded-sm shadow-md">
            {/* Header */}

            <ChatWindowHeader />

            {/* Body */}
            <div className="flex-1 overflow-y-auto bg-primary-foreground"          >

                <ChatWindowBody />
            </div>
            {/* Footer */}
            <MessageInput />

        </SidebarInset>
    )
}

export default ChatWindowLayout;
