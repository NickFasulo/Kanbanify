import { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Form, Button, Card, Alert } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'

export default function UpdateProfile() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const { currentUser, updateEml, updatePw } = useAuth()
  const navigate = useNavigate()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError('Passwords do not match.')
    }

    const promises = []

    if (emailRef.current.value !== currentUser.email) {
      promises.push(updateEml(emailRef.current.value))
    }

    if (passwordRef.current.value !== currentUser.password) {
      promises.push(updatePw(passwordRef.current.value))
    }

    setLoading(true)

    Promise.all(promises)
      .then(() => {
        navigate('/')
      })
      .catch(err => {
        console.log(err)
        setError('Update failed.')
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className='text-center mb-4'>Update Profile</h2>
          {error && (
            <Alert className='text-center mt-3 mb-3' variant='danger'>
              {error}
            </Alert>
          )}
          <Form onSubmit={handleSubmit}>
            <Form.Group id='email'>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type='email'
                ref={emailRef}
                defaultValue={currentUser.email}
              />
            </Form.Group>
            <Form.Group className='mt-4 mb-4' id='password'>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type='password'
                ref={passwordRef}
                placeholder='Leave blank to keep the same'
              />
            </Form.Group>
            <Form.Group className='mt-4' id='password-confirm'>
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control type='password' ref={passwordConfirmRef} />
            </Form.Group>
            <Button
              disabled={loading}
              className='w-100 mt-4 mb-2'
              type='submit'
            >
              Update
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className='w-100 text-center mt-2'>
        <Link to='/'>Cancel</Link>
      </div>
    </>
  )
}
