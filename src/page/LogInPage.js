import React from 'react';
import { Form, Button,Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const LogInPage = ({setAuthenticate}) => {
  const navigate = useNavigate();

  const loginEvent = (e) => {
    e.preventDefault();
    const idValue = document.getElementById('input-text').value;
    const pwValue = document.getElementById('input-pw').value;
    const regEmail =  /^[a-zA-Z0-9._]+@[a-zA-Z0-9.-]+.[a-zA-Z]$/;
    if(regEmail.test(idValue) === false){
      alert('올바른 이메일 형식이 아닙니다.');
      return
    }else if(pwValue.length < 4){ 
      alert('비밀번호는 4자리 이상 입력해주세요.');
      return
    }
    setAuthenticate(true);
    navigate('/');
  } 

  return (
    <div className='login-form'>
      <Container>
        <form onSubmit={(e) => {loginEvent(e)}}>
          <Form.Label htmlFor='input-text'>Email</Form.Label>
          <Form.Control 
            type='text'
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
