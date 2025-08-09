import React from 'react'
import { useAuth } from '../contexts/AuthContext'
import { Navigate } from 'react-router-dom';

function AuthRoutes({ children }) {
    const { session } = useAuth();
    return (
        <>
            {!session ? <> {children} </> : <Navigate to="/" />}
        </>
    )
}

export default AuthRoutes
