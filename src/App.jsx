import { useState } from 'react'
import Signup from './components/Signup'
import { Container } from 'react-bootstrap'

export default function App() {
  return (
    <Container className='d-flex align-items-center justify-content-center min-vh-100'>
      <div className='w-100' style={{ maxWidth: 400 }}>
        <Signup />
      </div>
    </Container>
  )
}
