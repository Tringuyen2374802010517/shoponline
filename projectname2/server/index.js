const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 5000;

// ================= MIDDLEWARE =================
app.use(cors({ origin: "*" }));
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

// ================= FRONTEND PATH =================
const adminPath = path.join(__dirname, '../client-admin/build');
const customerPath = path.join(__dirname, '../client-customer/build');

// DEBUG PATH
console.log("ADMIN PATH:", adminPath);
console.log("CUSTOMER PATH:", customerPath);

// CHECK BUILD EXIST
if (!fs.existsSync(path.join(adminPath, 'index.html'))) {
console.error("❌ ADMIN BUILD NOT FOUND - hãy chạy: cd client-admin && npm run build");
}

if (!fs.existsSync(path.join(customerPath, 'index.html'))) {
console.error("❌ CUSTOMER BUILD NOT FOUND - hãy chạy: cd client-customer && npm run build");
}

// ================= ADMIN =================
app.use('/admin', express.static(adminPath));

app.get('/admin/*', (req, res) => {
res.sendFile(path.join(adminPath, 'index.html'));
});

// ================= CUSTOMER =================
app.use(express.static(customerPath));

app.get('*', (req, res) => {
res.sendFile(path.join(customerPath, 'index.html'));
});

// ================= START SERVER =================
app.listen(PORT, () => {
console.log(`🚀 Server running on port ${PORT}`);
});
