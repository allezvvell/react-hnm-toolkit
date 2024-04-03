import React from 'react';
import { Form, Button,Container } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { authActions } from '../redux/reducers/authSlice';


const LogInPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loginEvent = (e) => {
    e.preventDefault();
    dispatch(authActions.loginSuccess());
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
          <Button variant="dark">Join</Button>
        </form>
      </Container>
    </div>
  )
}

export default LogInPage
