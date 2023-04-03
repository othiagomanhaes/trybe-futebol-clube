// import * as bcrypt from 'bcryptjs';
import { Response, Request } from 'express';
import UserService from '../services/user.service';
import tokenJWT from '../../auth/authToken';

class UserController {
  constructor(private user: UserService) {}

  public makeLogin = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      const result = await this.user.makeLogin(email, password);
      if (!result) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }
      const { role } = result;
      const token = tokenJWT.generateToken({ email, password, role });
      return res.status(200).json({ token });
    } catch (err) {
      return res.status(500).json({ message: 'Erro interno' });
    }
  };

  public verifyToken = async (req: Request, res: Response) => {
    const { role } = req.body.vasco;
    res.status(200).json({ role });
  };
}

export default UserController;
