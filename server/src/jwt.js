import jwt from 'jsonwebtoken';

import { JWT_SECRET } from './config';

export const signToken = user => {
  const payload = {
    userId: user.id
  };
  const options = {
    expiresIn: '1h'
  };
  return jwt.sign(payload, JWT_SECRET, options);
};

// middleware function
export const verifyToken = async (req, res, next) => {
  const { token } = req.cookies;

  // user is not logged in
  if (!token) {
    req.userId = null;
    return next();
  }

  // user is logged in
  try {
    const decoded = await jwt.verify(token, JWT_SECRET);
    req.userId = decoded.userId;
    return next();
  } catch (error) {
    return next(error);
  }
};
