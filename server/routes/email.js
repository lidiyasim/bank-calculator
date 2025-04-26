// server/routes/email.js
const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

router.post('/send', async (req, res) => {
  const { email, data } = req.body;

  try {
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Банк Онлайн" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Результаты расчета ипотеки',
      html: `
        <h3>Ваш расчёт:</h3>
        <p><strong>Сумма кредита:</strong> ${data.loanAmount} ₽</p>
        <p><strong>Ежемесячный платеж:</strong> ${data.monthlyPayment} ₽</p>
        <p><strong>Общая сумма выплат:</strong> ${data.totalCost} ₽</p>
        <p><strong>Необходимый доход:</strong> ${data.requiredIncome} ₽</p>
      `,
    });

    res.status(200).send({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: 'Не удалось отправить письмо' });
  }
});

module.exports = router;
