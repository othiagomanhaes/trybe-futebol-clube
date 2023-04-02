import { ModelStatic } from 'sequelize';
import teamModel from '../models/teams.model';

class TeamService {
  constructor(private team: ModelStatic<teamModel>) {
    this.team = team;
  }

  public async getAll(): Promise<teamModel[]> {
    const allTeams = await this.team.findAll();
    return allTeams;
  }

  public async getById(id: number): Promise<teamModel | null> {
    const teamById = await this.team.findByPk(id);
    return teamById;
  }
}

export default TeamService;
