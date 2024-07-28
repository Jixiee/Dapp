import React, { useState } from 'react';
import { useWeb3 } from '../services/web3Context';
import styled from 'styled-components';
import blockchainBackground from '../assets/blockchain-background.jpeg';

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

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledHeading = styled.h2`
  font-size: 3rem;
  margin-bottom: 20px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5), 4px 4px 8px rgba(0, 0, 0, 0.3);
`;

const StyledInput = styled.input`
  margin-bottom: 10px;
  padding: 10px;
  font-size: 1rem;
  border-radius: 5px;
  border: none;
  outline: none;
  width: 80%;
`;

const StyledButton = styled.button`
  margin: 10px;
  padding: 10px 20px;
  font-size: 1.2rem;
  border: none;
  border-radius: 5px;
  background-color: black;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #333;
  }
`;

const CreateContest = () => {
  const { contract, account } = useWeb3();
  const [contestName, setContestName] = useState('');
  const [candidates, setCandidates] = useState(['']);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCandidateChange = (index, event) => {
    const newCandidates = [...candidates];
    newCandidates[index] = event.target.value;
    setCandidates(newCandidates);
  };

  const addCandidateField = () => {
    setCandidates([...candidates, '']);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (contract) {
        await contract.methods.createContest(contestName).send({ from: account });
        const contestId = await contract.methods.contestsCount().call();

        for (let candidateName of candidates) {
          await contract.methods.addCandidate(contestId, candidateName).send({ from: account });
        }

        console.log('Contest and candidates created successfully');
        setContestName('');
        setCandidates(['']);
      } else {
        console.error('Contract is not loaded.');
      }
    } catch (error) {
      console.error('Error creating contest:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <StyledContainer>
      <StyledHeading>Create Contest</StyledHeading>
      <StyledForm onSubmit={handleSubmit}>
        <StyledInput
          type="text"
          value={contestName}
          onChange={(e) => setContestName(e.target.value)}
          placeholder="Contest Name"
          required
        />
        {candidates.map((candidate, index) => (
          <StyledInput
            key={index}
            type="text"
            value={candidate}
            onChange={(e) => handleCandidateChange(index, e)}
            placeholder={`Candidate ${index + 1}`}
            required
          />
        ))}
        <StyledButton type="button" onClick={addCandidateField}>
          Add Candidate
        </StyledButton>
        <StyledButton type="submit" disabled={isSubmitting}>
          Create
        </StyledButton>
      </StyledForm>
    </StyledContainer>
  );
};

export default CreateContest;
