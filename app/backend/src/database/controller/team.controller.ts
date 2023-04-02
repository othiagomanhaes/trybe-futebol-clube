import { Request, Response } from 'express';
import TeamService from '../services/team.service';

class TeamController {
  constructor(private team: TeamService) {}

  public getAll = async (_req: Request, res: Response) => {
    const allTeams = await this.team.getAll();
    return res.status(200).json(allTeams);
  };

  public getById = async (req: Request, res: Response) => {
    const { id } = req.params;

    const teamById = await this.team.getById(Number(id));
    return res.status(200).json(teamById);
  };
}

export default TeamController;
