const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

// ================= MIDDLEWARE =================
app.use(cors({
  origin: "*"
}));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// ================= STATIC UPLOADS =================
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ================= TEST API =================
app.get('/hello', (req, res) => {
  res.json({ message: 'Hello from server!' });
});

// ================= API =================
app.use('/api/admin', require('./api/admin'));
app.use('/api/customer', require('./api/customer'));

// ================= FRONTEND =================

// ADMIN
app.use('/admin', express.static(path.resolve(__dirname, '../client-admin/build')));
app.get('/admin/*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client-admin/build/index.html'));
});

// CUSTOMER
app.use(express.static(path.resolve(__dirname, '../client-customer/build')));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client-customer/build/index.html'));
});

// ================= START SERVER =================
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});