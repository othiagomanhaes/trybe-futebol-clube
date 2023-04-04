import ILogin from './ILogin.interface';

export default interface IUser extends ILogin {
  id: number;
  username: string;
}
