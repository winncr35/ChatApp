import React from 'react'
import { useAuthStore } from '../../stores/useAuthStore.tsx';
import { Button } from '../ui/button.tsx';
import { useNavigate } from 'react-router';
import { LogOut } from 'lucide-react';
const Logout = () => {
    const { signOut } = useAuthStore();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await signOut();
            navigate("/signin")
        }
        catch (error) {
            console.error(error)

        }
    }
    return (
        <Button variant="completeGhost" onClick={handleLogout}>
            <LogOut className="text-destructive" /> Log out  </Button>
    )
}

export default Logout
