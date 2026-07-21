import React from 'react'
import Logout from '../components/auth/logout.tsx';
import { useAuthStore } from '../stores/useAuthStore.tsx';

const ChatApp = () => {
    const user = useAuthStore((s) => s.user);

    return (
        <div>
            {user?.username}
            <Logout />
        </div>
    )
}

export default ChatApp;
