import React, { useState } from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { HashRouter, Route, Routes } from 'react-router-dom';

import Navbar from './components/layout/Navbar';
import Home from './pages/Home';
import MintNFT from './pages/MintNFT';
import BurnerWallet from './pages/BurnerWallet';
import Test from './pages/Test';

function App() {
  const [ethAddress, setETHAddress] = useState('');
  const [contractNFT, setContractNFT] = useState(null);

  return (
    <ChakraProvider>
      <HashRouter>
        <Navbar
          ethAddress={ethAddress}
          setETHAddress={setETHAddress}
          setContractNFT={setContractNFT} />
        <Routes>
          <Route
            path="/mintnft"
            element={<MintNFT ethAddress={ethAddress} contractNFT={contractNFT} />} />
          <Route
            path="/test"
            element={<Test />} />
          <Route
            path="/burnerwallet"
            element={<BurnerWallet />} />
          <Route
            path="/"
            element={<Home />} />
        </Routes>
      </HashRouter>
    </ChakraProvider>
  )
}

export default App;
