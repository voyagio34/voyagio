import React from 'react'
import { useAuth } from '../contexts/AuthContext'
import { Navigate } from 'react-router-dom';

function ProtectedRoutes({ children }) {
    const { session } = useAuth();
    // console.log("Looking from protected:",session)
    return (
        <>
            {!session ? <Navigate to="/signin" /> : <> {children} </> }
        </>
    )
}

export default ProtectedRoutes
