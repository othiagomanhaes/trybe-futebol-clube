import { Router } from 'express';
import LeaderboardController from '../controller/leaderBoard.controller';
import LeaderboardService from '../services/leaderBoarder.service';
import Team from '../models/teams.model';
import Matche from '../models/matches.model';

const leaderBoardRouter = Router();

const service = new LeaderboardService(Team, Matche);
const controller = new LeaderboardController(service);

leaderBoardRouter.get('/home', controller.getAll);

export default leaderBoardRouter;
