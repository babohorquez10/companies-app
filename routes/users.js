const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const router = express.Router();

const User = require('../models/User');

router.post('/register', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(500).send('Missing data.');
    }

    const oldUser = await User.query().findById(email);

    if (oldUser) {
      return res.status(500).send('User already exists.');
    }

    const encryptedPassword = await bcrypt.hash(password, 10);
    const token = jwt.sign({ email }, process.env.TOKEN_KEY);
    const user = await User.query().insert({
      email,
      password: encryptedPassword,
      userType: 'USER',
      token,
    });

    return res.json(user);
  } catch (err) {
    return res.status(500).send(err);
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(500).send('Missing data.');
    }

    const user = await User.query().findById(email);

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign({ email }, process.env.TOKEN_KEY);

      const updatedUser = await User.query().patchAndFetchById(email, {
        token,
      });

      return res.json(updatedUser);
    }

    return res.status(400).send('Invalid Credentials.');
  } catch (err) {
    return res.status(500).send(err);
  }
});

module.exports = router;