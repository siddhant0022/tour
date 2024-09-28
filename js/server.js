// server.js
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// Mock user database
const users = [];

// Signup route
app.post('/signup', async (req, res) => {
  const { email, password } = req.body;
  
  const hashedPassword = await bcrypt.hash(password, 10);
  users.push({ email, password: hashedPassword });
  
  res.json({ success: true, message: 'User registered!' });
});

// Login route
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  
  const user = users.find(u => u.email === email);
  if (!user) {
    return res.json({ success: false, message: 'User not found!' });
  }
  
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.json({ success: false, message: 'Invalid password!' });
  }

  const token = jwt.sign({ email: user.email }, 'secretkey', { expiresIn: '1h' });
  res.json({ success: true, token });
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
