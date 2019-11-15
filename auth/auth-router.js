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

router.post('/login', (req, res) => {
  // implement login
});

module.exports = router;
