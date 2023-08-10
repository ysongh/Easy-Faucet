import React, { useState } from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { HashRouter, Route, Routes } from 'react-router-dom';

import Navbar from './components/layout/Navbar';
import Home from './pages/Home';
import Test from './pages/Test';

function App() {
  const [ethAddress, setETHAddress] = useState('');

  return (
    <ChakraProvider>
      <HashRouter>
        <Navbar
          ethAddress={ethAddress}
          setETHAddress={setETHAddress} />
        <Routes>
          <Route
            path="/test"
            element={<Test />} />
          <Route
            path="/"
            element={<Home />} />
        </Routes>
      </HashRouter>
    </ChakraProvider>
  )
}

export default App;
