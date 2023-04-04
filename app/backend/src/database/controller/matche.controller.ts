import { Response, Request } from 'express';
import matcheService from '../services/matche.service';

class MatcheController {
  constructor(private matche: matcheService) {
    this.matche = matche;
  }

  public getAll = async (req: Request, res: Response) => {
    const { inProgress } = req.query;
    if (inProgress) {
      const allMatchesQuery = await this.matche.findInProgress(inProgress as string);
      return res.status(200).json(allMatchesQuery);
    }
    const allMatches = await this.matche.getAll();
    console.log('SHOW ME', allMatches);
    return res.status(200).json(allMatches);
  };
}

export default MatcheController;
