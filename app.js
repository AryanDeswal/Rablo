if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}

const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const session = require('express-session');

const app = express();
app.use(express.json());
app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true
}));

// Connect to MongoDB
const dbURL = process.env.DB_URL || 'mongodb://localhost:27017/rabloDB';
mongoose.connect(dbURL)
    .then((resukt) => { console.log('Connected to Database'); })
    .catch(err => console.log(err));

app.use(authRoutes);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
})