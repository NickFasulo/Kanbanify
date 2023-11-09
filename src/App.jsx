import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Login from './components/Login'
import Signup from './components/Signup'
import Dashboard from './components/Dashboard'
import PrivateRoute from './components/PrivateRoute'
import { AuthProdiver } from './contexts/AuthContext'

export default function App() {
  return (
    <Container className='d-flex align-items-center justify-content-center min-vh-100'>
      <div className='w-100' style={{ maxWidth: 400 }}>
        <Router>
          <AuthProdiver>
            <Routes>
              <Route
                index
                element={
                  <PrivateRoute>
                    <Dashboard />
                  </PrivateRoute>
                }
              />
              <Route path='/signup' element={<Signup />} />
              <Route path='/login' element={<Login />} />
            </Routes>
          </AuthProdiver>
        </Router>
      </div>
    </Container>
  )
}
