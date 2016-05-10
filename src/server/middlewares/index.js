import jwt from 'jsonwebtoken';
import config from '../config';

export function verifyToken(req, res, next) {
  const { token } = req.body;
  if (!token) {
    return res.send({ error: 'Missing token' });
  }
  return jwt.verify(token, config.secret, (error, user) => {
    if (error) {
      return res.status(401).send({ error: 'Invalid token' });
    }
    req.user = user; // eslint-disable-line no-param-reassign
    return next();
  });
}
