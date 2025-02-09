const jwt = require('jsonwebtoken')

const generateToken = payload => {
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "30d", // Token will be valid for 30 days
    });
    return token;

}
module.exports = generateToken;