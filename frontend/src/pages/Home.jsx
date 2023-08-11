import { useState } from 'react';
import { ethers } from 'ethers';
import { Container, Box, Heading, FormControl, FormLabel, Input, Button } from '@chakra-ui/react';

function Home() {
  const [address, setAddress] = useState();
  const [mnemonic, setMnemonic] = useState();
  const [privateKey, setPrivateKey] = useState();

  const [to, setTo] = useState();
  const [amount, setAmount] = useState();
  const [loading, setLoading] = useState("");

  const createBurnerWallet = () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const wallet = ethers.Wallet.createRandom().connect(provider);
    console.log(wallet);
    setAddress(wallet.address);
    setMnemonic(wallet.mnemonic.phrase);
    setPrivateKey(wallet.privateKey);
  }

  const receiveFaucet = async () => {
    try {
      setLoading(true);
      const res = await fetch('http://localhost:4000/sendfund', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          to,
          amount
        })
      })
      const data = await res.json();
      console.log(data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
   
  }

  return (
    <Container maxW='1100px'>
      <Button onClick={createBurnerWallet}  type="primary">
        Create
      </Button>
      <p>{address}</p>
      <p>{mnemonic}</p>
      <p>{privateKey}</p>

      <Box borderWidth='1px' borderRadius='lg' borderColor='green' overflow='hidden' p='5' width='500px' mt='5'>
        <Heading textAlign="center" fontSize="3xl" mb="4">Receive Faucet</Heading>
        <FormControl mb='3'>
          <FormLabel htmlFor='address'>Address</FormLabel>
          <Input value={to} onChange={(e) => setTo(e.target.value)} />
        </FormControl>
        <FormControl mb='3'>
          <FormLabel htmlFor='amount'>Amount</FormLabel>
          <Input value={amount} onChange={(e) => setAmount(e.target.value)} />
        </FormControl>

        <Button mt="4" onClick={receiveFaucet} isLoading={loading} loadingText='Submitting'>
          Send
        </Button>
      </Box>
    </Container>
  )
}

export default Home;