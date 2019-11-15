const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Users = require('../users/users-model.js');

router.post('/register', async (req, res) => {
  let user = req.body;

  const hash = bcrypt.hashSync(user.password, 10); // 2 ^ n
  user.password = hash;

  try {
    const savedUser = await Users.add(user);
    res.status(201).json(savedUser);
  } catch (error) {
    if (error.code === 'SQLITE_CONSTRAINT') {
      res.status(401).json({
        message: `An account with that username already exists`,
        error,
      });
    } else {
      res.status(500).json(error);
    }
  }
});

router.post('/login', async (req, res) => {
  let { username, password } = req.body;

  try {
    const user = await Users.findBy({ username }).first();
    if (user && bcrypt.compareSync(password, user.password)) {
      const token = getJwtToken(user.username);
      res.status(200).json({
        message: `Welcome ${user.username}!`,
        token,
      });
    } else {
      res.status(401).json({ message: 'Invalid Credentials' });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

function getJwtToken(username) {
  const payload = {
    username,
  };
  const secret = process.env.JWT_SECRET || 'is it secret is it safe?';
  const options = {
    expiresIn: '1d',
  };

  return jwt.sign(payload, secret, options);
}

module.exports = router;
