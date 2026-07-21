import React from 'react'
import { useAuthStore } from '@/stores/useAuthStore.tsx'
import { Navigate, Outlet } from 'react-router';

const ProtectedRoute = () => {
    const { accessToken, user, loading } = useAuthStore();
    if (!accessToken) {
        return (
            <Navigate
                to='/signin'
                replace
            />
        )
    }
    return (
        <Outlet>

        </Outlet >
    )
}

export default ProtectedRoute
