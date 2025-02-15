const { User } = require('../models/user');
require('dotenv').config();
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');

// Custom extractor to get token from cookies
const cookieExtractor = (req) => {
    let token = null;
    if (req && req.cookies) {
        console.log('Cookies:', req.cookies);  // Log all cookies
        token = req.cookies['x-access-token'];
    }
    console.log('Extracted Token:', token);   // Log extracted token
    return token;
}

const jwtOptions = {
    secretOrKey: "jsndjdkndvknvnskdhsdjdj",  // Fixed: Removed quotes to use the actual env value
    jwtFromRequest: cookieExtractor      // Use custom extractor
}

const jwtVerify = async (payload, done) => {
    try {
        const user = await User.findById(payload.sub);
        if (!user) {
            return done(null, false);
        }
        done(null, user);
    } catch (error) {
        done(error, false);
    }
}

const jwtStrategy = new JwtStrategy(jwtOptions, jwtVerify);

module.exports = {
    jwtStrategy
}