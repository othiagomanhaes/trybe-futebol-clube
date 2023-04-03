import { Response, Request, NextFunction } from 'express';
import tokenJWT from '../../auth/authToken';

const verifyValidLogin = (req: Request, res: Response, next: NextFunction) => {
  try {
    const hasToken = req.header('Authorization');
    if (!hasToken) return res.status(401).json({ message: 'Token not found' });
    const isValidToken = tokenJWT.verifyToken(hasToken);
    req.body.vasco = isValidToken;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token must be a valid token' });
  }
};

export default verifyValidLogin;
