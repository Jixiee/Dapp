import React, { createContext, useContext, useEffect, useState } from 'react';
import Web3 from 'web3';
import VotingContract from '../contracts/Voting.json';

const Web3Context = createContext();

export const Web3Provider = ({ children }) => {
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState(null);

  useEffect(() => {
    const initWeb3 = async () => {
      if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        await window.ethereum.enable();
        setWeb3(web3);

        const accounts = await web3.eth.getAccounts();
        setAccount(accounts[0]);

        const networkId = await web3.eth.net.getId();
        const deployedNetwork = VotingContract.networks[networkId];
        if (deployedNetwork) {
          const contractInstance = new web3.eth.Contract(
            VotingContract.abi,
            deployedNetwork.address
          );
          setContract(contractInstance);
        } else {
          console.error('Smart contract not deployed to detected network.');
        }
      } else {
        console.error('Ethereum browser extension not detected!');
      }
    };

    initWeb3();
  }, []);

  return (
    <Web3Context.Provider value={{ web3, contract, account }}>
      {children}
    </Web3Context.Provider>
  );
};

export const useWeb3 = () => useContext(Web3Context);

