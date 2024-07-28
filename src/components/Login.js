import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import loginBackground from '../assets/image.png';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-image: url(${loginBackground});
  background-size: cover;
  background-position: center;
  backdrop-filter: blur(80%);
  color: grey;
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  width: 300px;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  font-size: 1.5rem;
  border: none;
  border-radius: 4px;
  background-color: rgba(255, 255, 245, 0.1);
  color: black;

  &::placeholder {
    color: black;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 12px;
  font-size: 1.5rem;
  border: none;
  border-radius: 5px;
  background-color: black;
  color: white;
  cursor: pointer;

  &:hover {
    background-color: black;
  }
`;

const ErrorMessage = styled.p`
  color: red;
`;

const SignupMessage = styled.p`
  color: white;

  a {
    color: black;
    text-decoration: underline;

    &:hover {
      color: black;
    }
  }
`;

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/login', {
        email,
        password,
      });

      if (response.data.success) {
        navigate('/dashboard');
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('Invalid email or password');
    }
  };

  return (
    <Container>
      <h2>Login</h2>
      <Form onSubmit={handleLogin}>
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button type="submit">Login</Button>
      </Form>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <SignupMessage>Don't have an account? <a href="/signup">Sign Up</a></SignupMessage>
    </Container>
  );
};

export default Login;
