const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const { xss } = require('express-xss-sanitizer');
const mongoSanitize = require('express-mongo-sanitize');
const passport = require('passport');
const { jwtStrategy } = require('./middleware/passport');
const { handleError, convertToApiError } = require('./middleware/apiError');
const routes = require('./routes');

const app = express();

// MongoDB Connection
const mongoUri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}?retryWrites=true&w=majority&appName=Flickbase`;
mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => {
        console.error('Failed to connect to MongoDB:', err.message);
        process.exit(1);
    });

// Middleware
app.use(express.json());
app.use(xss());
app.use(mongoSanitize());

// Passport
app.use(passport.initialize());
passport.use('jwt', jwtStrategy);

//CORS
const cors = require('cors');
app.use(cors({
  origin: ['https://flickbase-beginning.vercel.app', 'http://localhost:5173'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

// Combine all routes into one app
const apiRoutes = require('./routes');
app.use('/api', apiRoutes);

module.exports = app;

// Error Handling
app.use(convertToApiError);
app.use((err, req, res, next) => {
    handleError(err, res);
});

app.get('/', (req, res) => {
    res.send('Hello, Vivek :)');
});