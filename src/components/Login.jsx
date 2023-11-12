import { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Form, Button, Card, Alert } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'

export default function Login() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const { login } = useAuth()
  const navigate = useNavigate()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      setError('')
      setLoading(true)
      await login(emailRef.current.value, passwordRef.current.value)
      navigate('/')
    } catch (err) {
      console.log(err)
      setError('Log in failed.')
    }
    setLoading(false)
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className='text-center mb4'>Log In</h2>
          {error && (
            <Alert className='text-center mt-3 mb-3' variant='danger'>
              {error}
            </Alert>
          )}
          <Form onSubmit={handleSubmit}>
            <Form.Group id='email'>
              <Form.Label>Email</Form.Label>
              <Form.Control type='email' ref={emailRef} required />
            </Form.Group>
            <Form.Group className='mt-4' id='password'>
              <Form.Label>Password</Form.Label>
              <Form.Control type='password' ref={passwordRef} required />
            </Form.Group>
            <div className='d-flex align-items-center mt-5 mb-2'>
              <Button disabled={loading} className='w-50' type='submit'>
                Log In
              </Button>
              <div className='w-50 text-center'>
                <Link to='/forgot-password'>Forgot Password?</Link>
              </div>
            </div>
          </Form>
        </Card.Body>
      </Card>
      <div className='w-100 text-center mt-2'>
        Don't have an account? &nbsp; <Link to='/signup'>Sign Up</Link>
      </div>
    </>
  )
}
