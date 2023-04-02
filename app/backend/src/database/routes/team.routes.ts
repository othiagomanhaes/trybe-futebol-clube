import { Router } from 'express';
import teamModel from '../models/teams.model';
import TeamService from '../services/team.service';
import TeamController from '../controller/team.controller';

const teamRouter = Router();

const service = new TeamService(teamModel);
const controller = new TeamController(service);

teamRouter.get('/', controller.getAll);
teamRouter.get('/:id', controller.getById);

export default teamRouter;
