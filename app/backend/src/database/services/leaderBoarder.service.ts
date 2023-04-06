import { ModelStatic } from 'sequelize';
import Leaderboard from '../models/leaderBoard.model';
import Matche from '../models/matches.model';
import Team from '../models/teams.model';
import ILeaderboard from '../interface/ILeaderBoard.interface';

export default class LeaderboardService {
  private _teamModel: ModelStatic<Team>;
  private _matchModel: ModelStatic<Matche>;

  constructor(teamModel: ModelStatic<Team>, matchModel: ModelStatic<Matche>) {
    this._teamModel = teamModel;
    this._matchModel = matchModel;
  }

  private sortArray = (leaderboardArray: ILeaderboard[]): ILeaderboard[] => {
    const organized = leaderboardArray.sort((a, b) => {
      if (a.totalPoints > b.totalPoints) return -1;
      if (b.totalPoints > a.totalPoints) return 1;
      if (a.totalVictories < b.totalVictories) return 1;
      if (a.totalVictories > b.totalVictories) return -1;
      if (a.goalsBalance > b.goalsBalance) return -1;
      if (a.goalsBalance < b.goalsBalance) return 1;
      if (a.goalsFavor > b.goalsFavor) return -1;
      if (a.goalsFavor < b.goalsFavor) return 1;

      return 0;
    });

    return organized;
  };

  public getAll = async (): Promise<ILeaderboard[]> => {
    const teams = await this._teamModel.findAll();
    const matches = await this._matchModel.findAll();
    const leaderboardHome = teams.map((team) => {
      const result = new Leaderboard(team, matches);
      return result.getAll();
    });

    const organized = this.sortArray(leaderboardHome);

    return organized;
  };
}
