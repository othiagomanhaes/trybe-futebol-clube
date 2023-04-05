import { ModelStatic } from 'sequelize';
import matcheModel from '../models/matches.model';
import teamModel from '../models/teams.model';

class MatcheService {
  constructor(
    private matche: ModelStatic<matcheModel>,
    private team: ModelStatic<teamModel>,
  ) {
    this.matche = matche;
    this.team = team;
  }

  public async getAll(): Promise<matcheModel[]> {
    const allMatches = await this.matche.findAll({
      include: [{
        model: this.team,
        as: 'awayTeam',
      },
      {
        model: this.team,
        as: 'homeTeam',
      }],
    });
    return allMatches;
  }

  private verifyKeyBool = (keyBool: string) => {
    if (keyBool === 'false') return false;
    return true;
  };

  public async findInProgress(keyBool: string): Promise<matcheModel[]> {
    const keyBoolRight = this.verifyKeyBool(keyBool);
    const allMatches = await this.matche.findAll({
      include: [{
        model: this.team,
        as: 'awayTeam',
      },
      {
        model: this.team,
        as: 'homeTeam',
      }],
      where: { inProgress: keyBoolRight },
    });
    return allMatches;
  }

  public async finalizaMatch(id: number): Promise<void> {
    await this.matche.update(
      { inProgress: false },
      { where: { id } },
    );
  }

  public async updateGoals(
    id: number,
    homeTeamGoals: number,
    awayTeamGoals: number,
  ): Promise<void> {
    await this.matche.update(
      { homeTeamGoals,
        awayTeamGoals },
      { where: { id } },
    );
  }
}

export default MatcheService;
