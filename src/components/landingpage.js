import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import blockchainBackground from '../assets/blockchain-background.jpeg'; 

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-image: url(${blockchainBackground});
  background-size: cover;
  background-position: center;
  color: grey;
  text-align: center;
  padding: 20px;
  backdrop-filter: blur(5px);
`;

const Heading = styled.h1`
  font-size: 4.5rem;
  margin-bottom: 20px;
  color: black;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5), 4px 4px 8px rgba(0, 0, 0, 0.3);
`;

const Subheading = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 25px;
  color: black;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5), 4px 4px 8px rgba(0, 0, 0, 0.3);
`;

const Button = styled.button`
  font-size: 1.2rem;
  padding: 10px 20px;
  background-color: black;
  color: white;
  border: none;
  border-radius: 4px;
  transition: background-color 0.3s;

  &:hover {
    background-color: darkgrey;
  }
`;

const LandingPage = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/login');
  };

  return (
    <Container>
      <Heading>Welcome to Votex</Heading>
      <Subheading>Secure and Transparent Voting System</Subheading>
      <Button onClick={handleButtonClick}>Get Started</Button>
    </Container>
  );
};
export default LandingPage;
