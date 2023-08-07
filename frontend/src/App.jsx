import { HashRouter, Route, Routes } from 'react-router-dom';

import Test from './pages/Test';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route
          path="/test"
          element={<Test />} />
        <Route
          path="/"
          element={
            <h1>Home</h1>} />
      </Routes>
    </HashRouter>
  )
}

export default App;
