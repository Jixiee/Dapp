import React, { useEffect, useState } from 'react';
import { useWeb3 } from '../services/web3Context';

const ContestsPage = () => {
  const { contract } = useWeb3();
  const [contests, setContests] = useState([]);

  useEffect(() => {
    const fetchContests = async () => {
      if (contract) {
        const contestsCount = await contract.methods.contestsCount().call();
        const contestsList = [];

        for (let i = 1; i <= contestsCount; i++) {
          const contest = await contract.methods.getContest(i).call();
          contestsList.push(contest);
        }

        setContests(contestsList);
      }
    };

    fetchContests();
  }, [contract]);

  return (
    <div>
      <h2>Ongoing Contests</h2>
      <ul>
        {contests.map((contest, index) => (
          <li key={index}>
            {contest.name} (Candidates: {contest.candidatesCount}, Votes: {contest.votesCount})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContestsPage;

