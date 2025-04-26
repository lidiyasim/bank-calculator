// src/components/PensionCalculator.js
import React, { useState } from 'react';
import './MortgageCalculator.css';
import axios from 'axios';

const PensionCalculator = () => {
  const [currentAge, setCurrentAge] = useState('');
  const [retirementAge, setRetirementAge] = useState('');
  const [monthlyContribution, setMonthlyContribution] = useState('');
  const [email, setEmail] = useState('');
  const [result, setResult] = useState(null);
  const [sent, setSent] = useState(false);

  const handleCalculate = () => {
    const monthsLeft = (retirementAge - currentAge) * 12;
    const total = monthsLeft * monthlyContribution;

    setResult({
      monthsLeft,
      total: total.toFixed(2),
    });

    setSent(false);
  };

  const handleSendEmail = async () => {
    try {
      await axios.post('http://localhost:5000/api/send', {
        email,
        data: result,
      });
      setSent(true);
    } catch (error) {
      alert('Ошибка при отправке: ' + error.message);
    }
  };

  return (
    <div className="calculator-container">
      <h2>Калькулятор Пенсионных Накоплений</h2>

      <div className="form-group">
        <label>Ваш текущий возраст</label>
        <input
          type="number"
          value={currentAge}
          onChange={(e) => setCurrentAge(+e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>Возраст выхода на пенсию</label>
        <input
          type="number"
          value={retirementAge}
          onChange={(e) => setRetirementAge(+e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>Ежемесячный взнос (₽)</label>
        <input
          type="number"
          value={monthlyContribution}
          onChange={(e) => setMonthlyContribution(+e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>Ваш e-mail</label>
        <input
          type="email"
          placeholder="example@mail.ru"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <button onClick={handleCalculate}>Рассчитать</button>

      {result && (
        <>
          <div className="result">
            <p>📆 До пенсии осталось: <strong>{result.monthsLeft} мес.</strong></p>
            <p>💰 Вы накопите: <strong>{result.total} ₽</strong></p>
          </div>

          <button onClick={handleSendEmail}>📩 Отправить результат на e-mail</button>

          {sent && (
            <p style={{ color: 'green', marginTop: '10px' }}>
              ✅ Письмо отправлено на {email}
            </p>
          )}
        </>
      )}
    </div>
  );
};

export default PensionCalculator;
