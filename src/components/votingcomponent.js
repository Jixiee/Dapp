import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const VoteInContest = ({ contract, accounts }) => {
  const { id } = useParams();
  const [contest, setContest] = useState(null);
  const [selectedCandidate, setSelectedCandidate] = useState('');

  useEffect(() => {
    const loadContest = async () => {
      const contestDetails = await contract.methods.contests(id).call();
      const candidates = await contract.methods.getCandidates(id).call();
      setContest({ ...contestDetails, candidates });
    };
    loadContest();
  }, [contract, id]);

  const handleVote = async (event) => {
    event.preventDefault();
    await contract.methods.vote(id, selectedCandidate).send({ from: accounts[0] });
  };

  if (!contest) {
    return <div>Loading contest...</div>;
  }

  return (
    <div>
      <h2>{contest.name}</h2>
      <form onSubmit={handleVote}>
        {contest.candidates.map(candidate => (
          <div key={candidate}>
            <label>
              <input
                type="radio"
                value={candidate}
                checked={selectedCandidate === candidate}
                onChange={() => setSelectedCandidate(candidate)}
              />
              {candidate}
            </label>
          </div>
        ))}
        <button type="submit">Vote</button>
      </form>
    </div>
  );
};

export default VoteInContest;


