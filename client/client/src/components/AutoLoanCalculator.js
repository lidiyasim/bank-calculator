// src/components/AutoLoanCalculator.js
import React, { useState } from 'react';
import './MortgageCalculator.css'; // Используем те же стили
import axios from 'axios';

const AutoLoanCalculator = () => {
  const [carPrice, setCarPrice] = useState('');
  const [initialPayment, setInitialPayment] = useState('');
  const [years, setYears] = useState('');
  const [email, setEmail] = useState('');
  const [result, setResult] = useState(null);
  const [sent, setSent] = useState(false);

  const handleCalculate = () => {
    const loanAmount = carPrice - initialPayment;
    const annualRate = 3.5;
    const monthlyRate = annualRate / 12 / 100;
    const totalMonths = years * 12;
    const compoundRate = Math.pow(1 + monthlyRate, totalMonths);

    const monthlyPayment = loanAmount * monthlyRate * compoundRate / (compoundRate - 1);
    const totalCost = monthlyPayment * totalMonths;
    const requiredIncome = monthlyPayment * 2.5;

    setResult({
      monthlyPayment: monthlyPayment.toFixed(2),
      totalCost: totalCost.toFixed(2),
      requiredIncome: requiredIncome.toFixed(2),
      loanAmount: loanAmount.toFixed(2)
    });

    setSent(false);
  };

  const handleSendEmail = async () => {
    try {
      await axios.post('http://localhost:5000/api/send', {
        email,
        data: result
      });
      setSent(true);
    } catch (error) {
      alert('Ошибка при отправке: ' + error.message);
    }
  };

  return (
    <div className="calculator-container">
      <h2>Калькулятор Автокредита</h2>

      <div className="form-group">
        <label>Стоимость автомобиля (₽)</label>
        <input
          type="number"
          value={carPrice}
          onChange={e => setCarPrice(+e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>Первоначальный взнос (₽)</label>
        <input
          type="number"
          value={initialPayment}
          onChange={e => setInitialPayment(+e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>Срок кредита (лет)</label>
        <input
          type="number"
          value={years}
          onChange={e => setYears(+e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>Ваш e-mail</label>
        <input
          type="email"
          placeholder="example@mail.ru"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
      </div>

      <button onClick={handleCalculate}>Рассчитать</button>

      {result && (
        <>
          <div className="result">
            <p>🚘 Сумма кредита: <strong>{result.loanAmount} ₽</strong></p>
            <p>📅 Ежемесячный платеж: <strong>{result.monthlyPayment} ₽</strong></p>
            <p>📈 Общая сумма выплат: <strong>{result.totalCost} ₽</strong></p>
            <p>👨‍👩‍👧 Необходимый доход: <strong>{result.requiredIncome} ₽</strong></p>
          </div>

          <button onClick={handleSendEmail}>
            📩 Отправить результат на e-mail
          </button>

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

export default AutoLoanCalculator;
