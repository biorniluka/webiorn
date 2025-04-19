const express = require('express');
const cors = require('cors');
const fs = require('fs');
const app = express();

app.use(cors());
app.use(express.json());

// Lexo makinat nga JSON
const cars = JSON.parse(fs.readFileSync('./cars.json', 'utf-8'));

// API për makinat
app.get('/api/cars', (req, res) => {
  res.json(cars);
});

// API për rezervimin
app.post('/api/rent', (req, res) => {
  const { carId, date } = req.body;
  res.json({ success: true, message: `Makina ${carId} u rezervua për ${date}` });
});

app.listen(5000, () => {
  console.log('Serveri është duke u drejtuar në http://localhost:5000');
});
