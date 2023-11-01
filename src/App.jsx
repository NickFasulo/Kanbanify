import Login from './components/Login'
import Signup from './components/Signup'
import Dashboard from './components/Dashboard'
import { Container } from 'react-bootstrap'
import { AuthProdiver } from './contexts/AuthContext'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

export default function App() {
  return (
    <Container className='d-flex align-items-center justify-content-center min-vh-100'>
      <div className='w-100' style={{ maxWidth: 400 }}>
        <Router>
          <AuthProdiver>
            <Routes>
              <Route exact path='/' element={<Dashboard />} />
              <Route path='/signup' element={<Signup />} />
              <Route path='/login' element={<Login />} />
            </Routes>
          </AuthProdiver>
        </Router>
      </div>
    </Container>
  )
}
