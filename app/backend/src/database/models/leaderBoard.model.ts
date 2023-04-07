import ITeam from '../interface/ITeam.interface';
import IMatch from '../interface/IMatch.interface';

class Leaderboard {
  private _name: string;
  private _totalGames: number;
  private _totalPoints: number;
  private _totalVictories: number;
  private _totalDraws: number;
  private _totalLosses: number;
  private _goalsFavor: number;
  private _goalsOwn: number;
  private _goalsBalance: number;
  private _efficiency: number;
  private _team: ITeam;
  private _matches: IMatch[];

  constructor(team: ITeam, matches: IMatch[]) {
    this._matches = matches;
    this._team = team;
    this._name = this._team.teamName;
    this._totalVictories = this.getTotalVictories();
    this._totalDraws = this.getTotalDraws();
    this._totalLosses = this.getTotalLosses();
    this._totalGames = this._totalVictories + this._totalDraws + this._totalLosses;
    this._totalPoints = this._totalVictories * 3 + this._totalDraws;
    this._goalsFavor = this.getGoalsFavor();
    this._goalsOwn = this.getGoalsOwn();
    this._goalsBalance = this._goalsFavor - this._goalsOwn;
    this._efficiency = Number(this.getEfficiency().toFixed(2));
  }

  private getTotalVictories = () => {
    const victories = this._matches.reduce((acc, cur) => {
      if (
        cur.homeTeamId === this._team.id && !cur.inProgress && cur.homeTeamGoals > cur.awayTeamGoals
      ) {
        return acc + 1;
      }
      return acc;
    }, 0);

    return victories;
  };

  private getTotalDraws = () => {
    const draws = this._matches.reduce((acc, cur) => {
      if (
        cur.homeTeamId === this._team.id
        && !cur.inProgress
        && cur.homeTeamGoals === cur.awayTeamGoals
      ) {
        return acc + 1;
      }
      return acc;
    }, 0);

    return draws;
  };

  private getTotalLosses = () => {
    const draws = this._matches.reduce((acc, cur) => {
      if (
        cur.homeTeamId === this._team.id
        && !cur.inProgress
        && cur.homeTeamGoals < cur.awayTeamGoals
      ) {
        return acc + 1;
      }
      return acc;
    }, 0);

    return draws;
  };

  private getGoalsFavor = () => {
    const goalsFavor = this._matches.reduce((acc, cur) => {
      if (
        cur.homeTeamId === this._team.id
        && !cur.inProgress
      ) {
        return acc + cur.homeTeamGoals;
      }
      return acc;
    }, 0);

    return goalsFavor;
  };

  private getGoalsOwn = () => {
    const goalsOwn = this._matches.reduce((acc, cur) => {
      if (
        cur.homeTeamId === this._team.id
        && !cur.inProgress
      ) {
        return acc + cur.awayTeamGoals;
      }
      return acc;
    }, 0);

    return goalsOwn;
  };

  private getEfficiency = () => {
    const divisor = this._totalGames * 3;
    const division = this._totalPoints / divisor;
    const efficiency = division * 100;

    return efficiency;
  };

  public getAll = () => {
    const leaderboardTable = {
      name: this._name,
      totalPoints: this._totalPoints,
      totalGames: this._totalGames,
      totalVictories: this._totalVictories,
      totalDraws: this._totalDraws,
      totalLosses: this._totalLosses,
      goalsFavor: this._goalsFavor,
      goalsOwn: this._goalsOwn,
      goalsBalance: this._goalsBalance,
      efficiency: this._efficiency,
    };

    return leaderboardTable;
  };
}

export default Leaderboard;
