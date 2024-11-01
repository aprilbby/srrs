const express = require('express');
const app = express();
const authRoutes = require('./routes/authRoutes');
const tenantRoutes = require('./routes/tenantRoutes');

app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api', tenantRoutes);

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
