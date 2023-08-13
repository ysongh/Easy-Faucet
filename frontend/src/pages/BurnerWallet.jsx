import { useState } from 'react';
import { ethers } from 'ethers';
import { Container, Heading, Button } from '@chakra-ui/react';

function BurnerWallet() {
  const [address, setAddress] = useState();
  const [mnemonic, setMnemonic] = useState();
  const [privateKey, setPrivateKey] = useState();

  const createBurnerWallet = () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const wallet = ethers.Wallet.createRandom().connect(provider);
    console.log(wallet);
    setAddress(wallet.address);
    setMnemonic(wallet.mnemonic.phrase);
    setPrivateKey(wallet.privateKey);
  }

  return (
    <Container maxW='1100px'>
      <Heading mb='3'>Create Burner Wallet</Heading>
      <Button onClick={createBurnerWallet}  type="primary">
        Create
      </Button>
      <p>{address}</p>
      <p>{mnemonic}</p>
      <p>{privateKey}</p>
    </Container>
  )
}

export default BurnerWallet;