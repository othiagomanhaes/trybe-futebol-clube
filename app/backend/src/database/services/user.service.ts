import * as bcrypt from 'bcryptjs';
import { ModelStatic } from 'sequelize';
// import ILogin from '../interface/ILogin.interface';
import usersModel from '../models/users.model';

class UserService {
  constructor(private user: ModelStatic<usersModel>) {
    this.user = user;
  }

  public async makeLogin(email: string, password: string) {
    const result = await this.user.findOne({ where: { email } });
    if (result) {
      const verifyPasword = await bcrypt.compare(password, result.password);
      if (!verifyPasword) return null;
      return result;
    }
    return null;
  }
}

export default UserService;
