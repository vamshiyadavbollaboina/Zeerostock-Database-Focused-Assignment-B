// Load environment variables at the very top
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const supplierRoutes = require('./routes/supplierRoutes');
const inventoryRoutes = require('./routes/inventoryRoutes');

const app = express();

// app.use(cors({
//     origin: process.env.CORS_ORIGIN || '*', 
//     methods: ['GET', 'POST']
// }));
app.use(express.json());

app.use('/supplier', supplierRoutes);
app.use('/inventory', inventoryRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});
