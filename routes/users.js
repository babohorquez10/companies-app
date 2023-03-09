const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const router = express.Router();

const User = require('../models/User');
const { userAuth } = require('../middleware/auth');

router.post('/register', async (req, res) => {
  try {
    const { email, password, userType } = req.body;

    if (!email || !password) {
      return res.status(500).json({ error: 'Missing data.' });
    }

    const oldUser = await User.query().findById(email);

    if (oldUser) {
      return res.status(500).json({ error: 'User already exists.' });
    }

    const encryptedPassword = await bcrypt.hash(password, 10);
    const token = jwt.sign({ email }, process.env.TOKEN_KEY);
    const user = await User.query().insert({
      email,
      password: encryptedPassword,
      userType: userType || 'USER',
      token,
    });

    return res.json(user);
  } catch (err) {
    return res.status(500).json(err);
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(500).json({ error: 'Missing data.' });
    }

    const user = await User.query().findById(email);

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign({ email }, process.env.TOKEN_KEY);

      const updatedUser = await User.query().patchAndFetchById(email, {
        token,
      });

      return res.json(updatedUser);
    }

    return res.status(500).json({ error: 'Invalid credentials.' });
  } catch (err) {
    return res.status(500).json(err);
  }
});

router.post('/verify', userAuth, async (req, res) => {
  try {
    const { token } = req.body;

    if (!token) {
      return res.status(500).json({ error: 'Missing data.' });
    }

    const user = await User.query().findOne({
      token,
    });

    if (user) {
      return res.json(user);
    }

    return res.status(500).json({ error: 'Invalid credentials.' });
  } catch (err) {
    return res.status(500).json(err);
  }
});

module.exports = router;
