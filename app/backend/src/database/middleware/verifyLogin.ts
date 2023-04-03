import { Response, Request, NextFunction } from 'express';

const verifyLogin = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ message: 'All fields must be filled' });

  const regex = /\S+@\S+\.\S+/;
  const isValidEmail = regex.test(email);

  if (!isValidEmail || password.length < 6) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  next();
};

export default verifyLogin;
