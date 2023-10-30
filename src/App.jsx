import Login from './components/Login'
import Signup from './components/Signup'
import Dashboard from './components/Dashboard'
import { Container } from 'react-bootstrap'
import { AuthProdiver } from './contexts/AuthContext'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

export default function App() {
  return (
    <Container className='d-flex align-items-center justify-content-center min-vh-100'>
      <div className='w-100' style={{ maxWidth: 400 }}>
        <Router>
          <AuthProdiver>
            <Switch>
              <Route exact path='/' component={Dashboard} />
              <Route path='/signup' component={Signup} />
              <Route path='/login' component={Login} />
            </Switch>
          </AuthProdiver>
        </Router>
      </div>
    </Container>
  )
}
