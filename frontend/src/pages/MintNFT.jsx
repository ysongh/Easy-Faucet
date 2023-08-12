import React from 'react';
import { Container, Heading, Text, Button } from '@chakra-ui/react';

function MintNFT({ ethAddress, contractNFT}) {
  const mint = async () => {
    try {
      const transaction = await contractNFT.issueNFT(ethAddress);
      const tx = await transaction.wait();
      console.log(tx);
    } catch(error) {
      console.error(error);
    }
  }

  return (
    <Container maxW='1100px'>
      <Heading>Faucet NFT</Heading>
      <Text mt='2'>Mint a NFT on Mode Testnet to receive Faucet</Text>
      <Button onClick={mint} mt='4'>
        Mint
      </Button>
    </Container>
  )
}

export default MintNFT;