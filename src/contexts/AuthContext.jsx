import React from 'react'
import { useContext, useState, useEffect } from 'react'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import firebaseApp from '../firebase'

const AuthContext = React.createContext()
const auth = getAuth(firebaseApp)

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProdiver({ children }) {
  const [currentUser, setCurrentUser] = useState()
  const [loading, setLoading] = useState(true)

  function signup(email, password) {
    return createUserWithEmailAndPassword(auth, email, password)
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user)
      setLoading(false)
    })

    return unsubscribe
  }, [])

  const value = {
    currentUser,
    signup
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}
