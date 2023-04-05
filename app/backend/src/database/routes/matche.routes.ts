import { Router } from 'express';
import matcheModel from '../models/matches.model';
import teamModel from '../models/teams.model';
import MatcheService from '../services/matche.service';
import MatcheController from '../controller/matche.controller';
import verifyValidLogin from '../middleware/verifyValidLogin';

const matcheRouter = Router();

const service = new MatcheService(matcheModel, teamModel);
const controller = new MatcheController(service);

matcheRouter.get('/', controller.getAll);
matcheRouter.patch('/:id/finish', verifyValidLogin, controller.finalizaMatche);
matcheRouter.patch('/:id', verifyValidLogin, controller.updateGoals);

export default matcheRouter;
