import { Router } from 'express';
import UserModel from '../models/users.model';
import UserService from '../services/user.service';
import UserController from '../controller/user.controller';
import verifyLogin from '../middleware/verifyLogin';
import verifyValidLogin from '../middleware/verifyValidLogin';

const userRouter = Router();

const service = new UserService(UserModel);
const controller = new UserController(service);

userRouter.post('/', verifyLogin, controller.makeLogin);
userRouter.get('/role', verifyValidLogin, controller.verifyToken);

export default userRouter;
