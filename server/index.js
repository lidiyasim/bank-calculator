const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());
const emailRouter = require('./routes/email');
app.use('/api', emailRouter);

// Подключение к MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/bank_calculator');

mongoose.connection.once('open', () => {
  console.log('✅ MongoDB connected');
});

// Тестовый маршрут
app.get('/', (req, res) => {
  res.send('API работает!');
});

// Запуск сервера
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
