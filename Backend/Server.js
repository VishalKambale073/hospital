const cors = require('cors');
const express = require('express');
const dotenv = require("dotenv");
const connectDB = require('./Database/db');
const appRoutes = require('./Routes/auth-routes');

dotenv.config();
const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());

app.use(cors({ origin: "http://localhost:5173", credentials: true }));

connectDB();

app.use('/api', appRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
