import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Card, Alert } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'

export default function ForgotPassword() {
  const emailRef = useRef()
  const { resetPassword } = useAuth()
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
 
    try {
      setError('')
      setMessage('')
      setLoading(true)
      await resetPassword(emailRef.current.value)
      setMessage('Check your email inbox for further instructions.')
    } catch (err) {
      console.log(err)
      setError('Password reset failed.')
    }
    setLoading(false)
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className='text-center mb-4'>Reset Password</h2>
          {error && (
            <Alert className='text-center mt-3 mb-3' variant='danger'>
              {error}
            </Alert>
          )}
          {message && (
            <Alert className='text-center mt-3 mb-3' variant='success'>
              {message}
            </Alert>
          )}
          <Form onSubmit={handleSubmit}>
            <Form.Group id='email'>
              <Form.Label>Email</Form.Label>
              <Form.Control type='email' ref={emailRef} required />
            </Form.Group>
            <div className='d-flex align-items-center mt-5 mb-2'>
              <Button disabled={loading} className='w-50' type='submit'>
                Reset Password
              </Button>
              <div className='w-50 text-center'>
                <Link to='/login'>Log In</Link>
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
