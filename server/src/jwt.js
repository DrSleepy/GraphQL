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
  const token = req.headers.authorization;

  // user is not logged in
  if (token === undefined) {
    req.userId = null;
    return next();
  }

  // user is logged in
  jwt.verify(token, JWT_SECRET, (error, decoded) => {
    req.userId = decoded.userId;
    next();
  });
};
