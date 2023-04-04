import { Router } from 'express';
import matcheModel from '../models/matches.model';
import teamModel from '../models/teams.model';
import MatcheService from '../services/matche.service';
import MatcheController from '../controller/matche.controller';

const matcheRouter = Router();

const service = new MatcheService(matcheModel, teamModel);
const controller = new MatcheController(service);

matcheRouter.get('/', controller.getAll);

export default matcheRouter;
