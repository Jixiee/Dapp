import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { theme } from './theme';
import { GlobalStyle } from './GlobalStyle';
import { Web3Provider } from './services/web3Context'; 
import LandingPage from './components/landingpage';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
import CreateContest from './components/CreateContest';
import ContestsPage from './components/ContestsPage';
import VotingComponent from './components/votingcomponent';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
    <Web3Provider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/create-contest" element={<CreateContest />} />
          <Route path="/contest-page" element={<ContestsPage />} />
          <Route path="/vote" element={<VotingComponent />} />
        </Routes>
      </Router>
    </Web3Provider>
    </ThemeProvider>
  );
};
export default App;