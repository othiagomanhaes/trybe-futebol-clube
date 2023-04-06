export default interface ILeaderboard {
  name: string;
  totalVictories: number;
  totalDraws: number;
  totalLosses: number;
  totalGames: number;
  totalPoints: number;
  goalsFavor: number;
  goalsOwn: number;
  efficiency: number;
  goalsBalance: number;
}
