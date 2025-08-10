import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '../lib/supabase/Client'

const AuthContext = createContext({})

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {

  const [session, setSession] = useState(undefined)

  const signUp = async (name, email, password) => {
    const { data, error } = await supabase.auth.signUp({
      name: name,
      email: email,
      password: password
    })

    if (error) {
      console.error("Error from signup function", error);
      return { success: false, error };
    }
    return { success: true, data }
  }

  const signIn = async (email, password) => {

    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password
    })
    if (error) {
      console.error("Error from signin ", error);
      return { success: false, error }
    }
    return { success: true, data };
  }

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    })
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      console.log('Session:', session)
    })

  }, [])

  // Sign out function
  const signOut = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error('Error signing out:', error);
    }
  }



  const value = {

    session,
    signIn,
    signUp,
    signOut,
  }

  // Debug log

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}