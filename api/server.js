// Load Environment Variables and Required Modules
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { xss } = require('express-xss-sanitizer');
const mongoSanitize = require('express-mongo-sanitize');
const passport = require('passport');
const cookieParser = require('cookie-parser');   // Move this up
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

// CORS
app.use(cors({
  origin: ['https://flickbase-beginning.vercel.app', 'http://localhost:5173'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

// Middleware
app.use(cookieParser());       // Moved up to make cookies available for all routes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(xss());
app.use(mongoSanitize());

// Passport
app.use(passport.initialize());
passport.use('jwt', jwtStrategy);

// Root Route
app.get('/', (req, res) => {
    res.send('Hello, Vivek :)');
});

// Combine all routes into one app
app.use('/api', routes);

// Error Handling
app.use(convertToApiError);
app.use((err, req, res, next) => {
    handleError(err, res);
});

module.exports = app;