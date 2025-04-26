import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MortgageCalculator from './components/MortgageCalculator';
import AutoLoanCalculator from './components/AutoLoanCalculator';
import PensionCalculator from './components/PensionCalculator';
import Header from './components/Header';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<div style={{ padding: '2rem', textAlign: 'center' }}>
          <h2>Добро пожаловать!</h2>
          <p>Выберите нужный раздел калькулятора в меню выше.</p>
        </div>} />
        <Route path="/mortgage" element={<MortgageCalculator />} />
        <Route path="/auto" element={<AutoLoanCalculator />} />
        <Route path="/pension" element={<PensionCalculator />} />
      </Routes>
    </Router>
  );
}

export default App;
