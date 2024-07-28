import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import blockchainBackground from '../assets/dashboard.jpeg';

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-image: url(${blockchainBackground});
  background-size: cover;
  background-position: center;
  backdrop-filter: blur(40%);
  color: white;
  text-align: center;
  margin: 0;
  padding: 0;
  width: 100vw;
  font-family: 'Poppins', sans-serif;
`;

const StyledTypography = styled(Typography)`
  font-size: 5rem !important;
  margin-bottom: 50px;
  font-family: 'Poppins', sans-serif;
  font-weight: 600 !important;
  color: white !important;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5), 4px 4px 8px rgba(0, 0, 0, 0.3);
`;

const StyledButton = styled(Button)`
  width: 60%;
  margin: 1.5mm 0 !important;
  font-size: 1.2rem;
  border: none;
  border-radius: 5px;
  background-color: black !important;
  color: white !important;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #333 !important;
  }
`;

const Dashboard = () => {
  return (
    <StyledContainer>
      <Box textAlign="center">
        <StyledTypography variant="h2" gutterBottom>
          Dashboard
        </StyledTypography>
        <StyledButton
          component={Link}
          to="/contests"
          variant="contained"
          size="large"
        >
          Vote in an Ongoing Contest
        </StyledButton>
        <StyledButton
          component={Link}
          to="/create-contest"
          variant="contained"
          size="large"
        >
          Conduct Your Own Contest
        </StyledButton>
      </Box>
    </StyledContainer>
  );
};

export default Dashboard;


