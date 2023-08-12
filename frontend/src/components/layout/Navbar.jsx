import { Link as ReactLink } from 'react-router-dom';
import { Container, Box, Flex, Heading, Spacer, Button, Link } from '@chakra-ui/react';
import { ethers } from 'ethers';

import FaucetNFT from "../../artifacts/contracts/FaucetNFT.sol/FaucetNFT.json";

const MODE_CONTRACT_ADDRESS = "0xc1c025BC0A13Aba567f6C85Ea2A642AFb3d6bEd6";

function Navbar({ ethAddress, setETHAddress, setContractNFT }) {
  const connectMetamask = async () => {
    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      setETHAddress(accounts[0]);
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
  
      const contract = new ethers.Contract(MODE_CONTRACT_ADDRESS, FaucetNFT.abi, signer);
      setContractNFT(contract);
    } catch(error) {
      console.error(error);
    }
  }

  return (
    <Box p={2}>
      <Container maxW='1100px'>
        <Flex minWidth='max-content' alignItems='center' gap='2'>
          <Box mr="4">
            <Link as={ReactLink} to="/">
              <Heading color="green" mt="3" mb="5">Easy Faucet</Heading>
            </Link>
          </Box>
          <Link as={ReactLink} to="/">Home</Link>
          <Link as={ReactLink} to="/mintnft">Mint</Link>
          <Link as={ReactLink} to="/test">Test</Link>
          <Spacer />
          <Button onClick={connectMetamask}>
            {ethAddress ? ethAddress.slice(0, 5) + "..." + ethAddress.slice(37, 42) : 'Connect Wallet'}
          </Button>
        </Flex>
      </Container>
    </Box>
  )
}

export default Navbar;