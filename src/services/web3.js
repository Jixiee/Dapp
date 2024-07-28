import Web3 from 'web3';
import VotingContract from '../contracts/Voting.json';

let web3;
let votingContract;

const getWeb3 = () => new Promise((resolve, reject) => {
  window.addEventListener('load', async () => {
    if (window.ethereum) {
      web3 = new Web3(window.ethereum);
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        resolve(web3);
      } catch (error) {
        reject(error);
      }
    } else if (window.web3) {
      web3 = new Web3(window.web3.currentProvider);
      resolve(web3);
    } else {
      reject(new Error('Must install MetaMask'));
    }
  });
});

const getVotingContract = async () => {
  const networkId = await web3.eth.net.getId();
  const deployedNetwork = VotingContract.networks[networkId];
  if (deployedNetwork) {
    votingContract = new web3.eth.Contract(VotingContract.abi, deployedNetwork.address);
    return votingContract;
  } else {
    throw new Error('Contract not deployed on the current network');
  }
};

export { getWeb3, getVotingContract };

