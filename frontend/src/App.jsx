import React, { useState } from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';

import Test from './pages/Test';

function App() {
  const [ethAddress, setETHAddress] = useState('');

  const connectMetamask = async () => {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    setETHAddress(accounts[0]);
  }

  return (
    <HashRouter>
      <Routes>
        <Route
          path="/test"
          element={<Test />} />
        <Route
          path="/"
          element={
            <div>
               <button onClick={connectMetamask}>
                {ethAddress ? ethAddress.slice(0, 5) + "..." + ethAddress.slice(37, 42) : 'Connect Wallet'}
              </button>
            </div>} />
      </Routes>
    </HashRouter>
  )
}

export default App;
