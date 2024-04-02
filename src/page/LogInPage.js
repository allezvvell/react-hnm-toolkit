import React, { useState } from 'react';
import { Form, Button,Container } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { authAction } from '../redux/actions/authAction';


const LogInPage = ({setAuthenticate}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [id,setId] = useState('');
  const [pw,setPw] = useState('');
  const loginEvent = (e) => {
    e.preventDefault();
    dispatch(authAction.loginEvent(id,pw));
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
            onChange={(e)=>{setId(e.target.value)}}
            />
          <Form.Label htmlFor='input-pw'>Password</Form.Label>
          <Form.Control 
            type='password'
            id='input-pw'
            placeholder='Enter your password'
            required
            onChange={(e)=>{setPw(e.target.value)}}
            />
          <Button variant="danger" type='submit'>Login</Button>
          <Button variant="dark">Join</Button>
        </form>
      </Container>
    </div>
  )
}

export default LogInPage
