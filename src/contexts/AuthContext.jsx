import { createContext, useContext, useState, useEffect } from 'react'
import {
  getAuth,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  updatePassword,
  updateProfile,
  updateEmail
} from 'firebase/auth'
import firebaseApp from '../firebase'

const AuthContext = createContext()
const auth = getAuth(firebaseApp)

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProdiver({ children }) {
  const [currentUser, setCurrentUser] = useState()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user)
      setLoading(false)
    })

    return unsubscribe
  }, [])

  function signup(email, password) {
    return createUserWithEmailAndPassword(auth, email, password).catch(err => {
      console.log(err)
    })
  }

  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password).catch(err => {
      console.log(err)
    })
  }

  function logout() {
    return signOut(auth).catch(err => {
      console.log(err)
    })
  }

  function resetPassword(email) {
    return sendPasswordResetEmail(auth, email).catch(err => {
      console.log(err)
    })
  }

  function updateEml(email) {
    return updateEmail(auth.currentUser, email).catch(err => {
      console.log(err)
    })
  }

  function updatePw(password) {
    return updatePassword(auth.currentUser, password).catch(err => {
      console.log(err)
    })
  }

  const value = {
    currentUser,
    signup,
    login,
    logout,
    resetPassword,
    updateEml,
    updatePw
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}
