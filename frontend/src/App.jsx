import React, { useState } from 'react';
import { ChakraProvider, Button } from '@chakra-ui/react';
import { HashRouter, Route, Routes } from 'react-router-dom';

import Test from './pages/Test';

function App() {
  const [ethAddress, setETHAddress] = useState('');

  const connectMetamask = async () => {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    setETHAddress(accounts[0]);
  }

  return (
    <ChakraProvider>
      <HashRouter>
        <Routes>
          <Route
            path="/test"
            element={<Test />} />
          <Route
            path="/"
            element={
              <div>
                <Button onClick={connectMetamask}>
                  {ethAddress ? ethAddress.slice(0, 5) + "..." + ethAddress.slice(37, 42) : 'Connect Wallet'}
                </Button>
              </div>} />
        </Routes>
      </HashRouter>
    </ChakraProvider>
  )
}

export default App;
