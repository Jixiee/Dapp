import React, { useEffect, useState } from 'react';
import { getWeb3, getVotingContract } from './services/web3';

function App() {
  const [accounts, setAccounts] = useState([]);
  const [contract, setContract] = useState(null);
  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    const init = async () => {
      try {
        const web3 = await getWeb3();
        console.log("Web3 instance:", web3);  // Using the web3 variable to pass ESLint check

        const accounts = await web3.eth.getAccounts();
        setAccounts(accounts);

        const contract = await getVotingContract(web3);
        setContract(contract);

        const candidatesCount = await contract.methods.candidatesCount().call();
        const candidates = [];
        for (let i = 1; i <= candidatesCount; i++) {
          const candidate = await contract.methods.candidates(i).call();
          candidates.push(candidate);
        }
        setCandidates(candidates);
      } catch (error) {
        console.error("Error initializing web3 or contract", error);
      }
    };
    init();
  }, []);

  const vote = async (candidateId) => {
    try {
      await contract.methods.vote(candidateId).send({ from: accounts[0] });
      // Update the vote count after voting
      const updatedCandidates = [...candidates];
      const index = updatedCandidates.findIndex(c => c.id === candidateId);
      updatedCandidates[index].voteCount++;
      setCandidates(updatedCandidates);
    } catch (error) {
      console.error("Error voting", error);
    }
  };

  return (
    <div>
      <h1>Voting DApp</h1>
      <ul>
        {candidates.map(candidate => (
          <li key={candidate.id}>
            {candidate.name} - {candidate.voteCount} votes
            <button onClick={() => vote(candidate.id)}>Vote</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
