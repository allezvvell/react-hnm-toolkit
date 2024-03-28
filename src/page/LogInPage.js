import React from 'react';
import { Form, Button,Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const LogInPage = ({setAuthenticate}) => {
  const navigate = useNavigate();

  const loginEvent = (e) => {
    e.preventDefault();
    setAuthenticate(true);
    navigate('/');
  } 

  return (
    <div className='login-form'>
      <Container>
        <form onSubmit={(e) => {loginEvent(e)}}>
          <Form.Label htmlFor='input-text'>Email</Form.Label>
          <Form.Control 
            type='email'
            id='input-text'
            placeholder='Enter your email address'
            title='sss'
            required
            />
          <Form.Label htmlFor='input-pw'>Password</Form.Label>
          <Form.Control 
            type='password'
            id='input-pw'
            placeholder='Enter your password'
            required
            />
          <Button variant="danger" type='submit'>Login</Button>
        </form>
      </Container>
    </div>
  )
}

export default LogInPage
