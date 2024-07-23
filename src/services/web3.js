import Web3 from 'web3';
import Voting from '../contracts/Voting.json'; // Updated path

const getWeb3 = () =>
  new Promise((resolve, reject) => {
    window.addEventListener('load', async () => {
      if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        try {
          await window.ethereum.enable();
          resolve(web3);
        } catch (error) {
          reject(error);
        }
      } else if (window.web3) {
        const web3 = window.web3;
        resolve(web3);
      } else {
        reject('Must install MetaMask');
      }
    });
  });

const getVotingContract = async (web3) => {
  const networkId = await web3.eth.net.getId();
  const deployedNetwork = Voting.networks[networkId];
  return new web3.eth.Contract(
    Voting.abi,
    deployedNetwork && deployedNetwork.address,
  );
};

export { getWeb3, getVotingContract };
