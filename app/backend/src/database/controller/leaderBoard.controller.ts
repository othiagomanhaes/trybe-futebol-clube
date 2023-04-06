import { Request, Response } from 'express';
import LeaderboardService from '../services/leaderBoarder.service';

export default class LeaderboardController {
  private _leaderboardService: LeaderboardService;

  constructor(leaderboardService: LeaderboardService) {
    this._leaderboardService = leaderboardService;
  }

  public getAll = async (_req: Request, res: Response): Promise<void> => {
    const allLeaderboard = await this._leaderboardService.getAll();
    res.status(200).json(allLeaderboard);
  };
}
