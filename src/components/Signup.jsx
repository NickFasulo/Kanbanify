import { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Form, Button, Card, Alert } from 'react-bootstrap'
import PasswordChecklist from 'react-password-checklist'
import { useAuth } from '../contexts/AuthContext'

export default function Signup() {
  const emailRef = useRef()
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const { signup } = useAuth()
  const navigate = useNavigate()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      setError('')
      setLoading(true)
      await signup(emailRef.current.value, password)
      navigate('/')
    } catch (err) {
      console.log(err)
      if (err.code === 'auth/email-already-in-use') {
        setError('Email is already in use.')
      } else {
        setError('Account creation failed.')
      }
    }
    setLoading(false)
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className='text-center mb-4'>Sign Up</h2>
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
              <Form.Control
                type='password'
                onChange={e => setPassword(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className='mt-4' id='password-confirm'>
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type='password'
                onChange={e => setPasswordConfirm(e.target.value)}
                required
              />
            </Form.Group>
            <Button
              disabled={loading}
              className='w-100 mt-4 mb-3'
              type='submit'
            >
              Sign Up
            </Button>
            <div className='d-flex justify-content-center'>
              <PasswordChecklist
                rules={[
                  'minLength',
                  'specialChar',
                  'number',
                  'capital',
                  'match'
                ]}
                minLength={8}
                value={password}
                valueAgain={passwordConfirm}
                onChange={isValid => {}}
                className='pw-checklist'
              />
            </div>
          </Form>
        </Card.Body>
      </Card>
      <div className='w-100 text-center mt-2'>
        Already have an account? <Link to='/login'>Log In</Link>
      </div>
    </>
  )
}
