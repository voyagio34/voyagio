import React from 'react'
import { useAuth } from '../contexts/AuthContext'

function Profile() {
    const { signOut, session } = useAuth();
    return (
        <div className=' py-20 relative min-h-screen w-full flex flex-col mx-auto gap-4'>
            {/* <p className='text-lg mx-auto mt-10'>Welcome, {session?.user?.user_metadata.name}</p>
            <p className='text-lg mx-auto'>Email: {session?.user?.email}</p>
            <button onClick={signOut} className='p-4 flex mx-auto bg-blue-500 text-white font-semibold cursor-pointer hover:bg-blue-600'>LOGOUT</button> */}
            <p className='w-full flex h-auto text-7xl text-gray-400 items-center justify-center'>Coming Soon</p>
        </div>
    )
}

export default Profile
