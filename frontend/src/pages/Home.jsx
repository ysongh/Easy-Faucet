import { useState } from 'react';
import { Container, Box, Center, Heading, FormControl, FormLabel, Input, Button } from '@chakra-ui/react';
import { IDKitWidget } from '@worldcoin/idkit';

import { WLD_APP_ID } from '../../keys';

function Home() {
  const [to, setTo] = useState();
  const [amount, setAmount] = useState();
  const [loading, setLoading] = useState("");

  const onSuccess = async (proofdata) => {
    try {
      const res = await fetch('http://localhost:4000/verifyproof', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          merkle_root: proofdata.merkle_root,
          nullifier_hash: proofdata.nullifier_hash,
          proof: proofdata.proof,
          credential_type: proofdata.credential_type,
          action: "test"
        })
      })
      const data = await res.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  }

  const handleVerify = () => {
    
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
      <Center>
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

          <Button mt="4" mb='2' onClick={receiveFaucet} isLoading={loading} loadingText='Submitting'>
            Send
          </Button>

          <br />

          <IDKitWidget
            app_id={WLD_APP_ID}
            action="test"
            onSuccess={onSuccess}
            handleVerify={handleVerify}
            credential_types={['orb', 'phone']}
            enableTelemetry
          >
            {({ open }) => <Button onClick={open}>Verify with World ID and Send</Button>}
          </IDKitWidget>
        </Box>
      </Center>
    </Container>
  )
}

export default Home;