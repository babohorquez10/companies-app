const jwt = require('jsonwebtoken');

const User = require('../models/User');

const verifyToken = async (req, res, next, userType) => {
  const token =
    req.body.token || req.query.token || req.headers['x-access-token'];

  if (!token) {
    return res
      .status(403)
      .json({ error: 'Token required for authentication.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.TOKEN_KEY);

    const query = { email: decoded.email };

    if (userType) query.userType = userType;

    const user = await User.query().findOne(query);

    if (!user) {
      return res.status(401).json({ error: 'Invalid token.' });
    }

    req.user = decoded;
  } catch (err) {
    return res.status(401).json({ error: 'Invalid Token.' });
  }

  return next();
};

const userAuth = (req, res, next) => verifyToken(req, res, next);
const adminAuth = (req, res, next) => verifyToken(req, res, next, 'ADMIN');

module.exports = {
  userAuth,
  adminAuth,
};
