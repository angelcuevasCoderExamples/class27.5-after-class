const dotenv = require('dotenv');

dotenv.config();

module.exports = {
    mongoConnectionLink: process.env.MONGO_CONNECTION_LINK,
    jwtSecret: process.env.JWT_SECRET,
    port: process.env.PORT
}

