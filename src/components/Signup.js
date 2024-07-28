import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import blockchainBackground from '../assets/image.png';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-image: url(${blockchainBackground});
  background-size: cover;
  background-position: center;
  backdrop-filter: blur(40%);
  color: black;
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
  padding: 10px;
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

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/signup', { email, password });
      navigate('/dashboard');
    } catch (err) {
      setError('Signup failed. Please try again.');
    }
  };

  return (
    <Container>
      <h2>Signup</h2>
      <Form onSubmit={handleSubmit}>
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
        <Button type="submit">Signup</Button>
      </Form>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <SignupMessage>
        Already have an account? <a href="/login">Login</a>
      </SignupMessage>
    </Container>
  );
};

export default Signup;
