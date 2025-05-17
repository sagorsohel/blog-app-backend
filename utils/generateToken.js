const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();
const generateToken = (userId) => {
  const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: '1h', // Token expiration time
  });
  return token;
};
module.exports = generateToken;