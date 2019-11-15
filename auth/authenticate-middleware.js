const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    const secret = process.env.JWT_SECRET || 'is it secret is it safe?';
    jwt.verify(token, secret, (err, decodedToken) => {
      if (err) {
        res.status(401).json({ you: 'shall not pass!' });
      } else {
        req.decodedToken = decodedToken;
        next();
      }
    });
  } else {
    res.status(400).json({ message: 'No credentials provided' });
  }
};
