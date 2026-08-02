import { AppSidebar } from "@/components/sidebar/app-sidebar.tsx";
import { SidebarProvider } from "@/components/ui/sidebar.tsx";
import ChatWindowLayout from "../components/chat/ChatWindowLayout.tsx";
const ChatApp = () => {
    return (
        <SidebarProvider>
            <AppSidebar />
            <div className="flex h-screen w-full p-2.5">
                <ChatWindowLayout />
            </div>
        </SidebarProvider>
    )
}

export default ChatApp;
