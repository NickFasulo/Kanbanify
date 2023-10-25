import { useRef, useState } from 'react'
import { Form, Button, Card, Alert } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'

export default function Signup() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const { signup } = useAuth()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError('Passwords do not match.')
    }

    try {
      setError('')
      setLoading(true)
      await signup(emailRef.current.value, passwordRef.current.value)
    } catch {
      setError('Account creation failed.')
    }
    setLoading(false)
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className='text-center mb4'>Sign Up</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group id='email'>
              <Form.Label>Email</Form.Label>
              <Form.Control type='email' ref={emailRef} required />
            </Form.Group>
            <Form.Group className='mt-2' id='password'>
              <Form.Label>Password</Form.Label>
              <Form.Control type='password' ref={passwordRef} required />
            </Form.Group>
            <Form.Group className='mt-2' id='password-confirm'>
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control type='password' ref={passwordConfirmRef} required />
            </Form.Group>
            <Button
              disabled={loading}
              className='w-100 mt-4 mb-2'
              type='submit'
            >
              Sign Up
            </Button>
            {error && (
              <Alert className='mt-2 mb-2' variant='danger'>
                {error}
              </Alert>
            )}
          </Form>
        </Card.Body>
      </Card>
      <div className='w-100 text-center mt-2'>
        Already have an account? Log In
      </div>
    </>
  )
}
