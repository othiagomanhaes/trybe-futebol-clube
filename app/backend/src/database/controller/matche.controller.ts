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
    return res.status(200).json(allMatches);
  };

  public finalizaMatche = async (req: Request, res: Response) => {
    const { id } = req.params;
    await this.matche.finalizaMatch(Number(id));
    return res.status(200).json({ message: 'Finished' });
  };

  public updateGoals = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;
    await this.matche.updateGoals(Number(id), homeTeamGoals, awayTeamGoals);
    return res.status(200).json({ message: 'Updated' });
  };

  public createNewMatche = async (req: Request, res: Response) => {
    const theMatch = req.body;
    const theNewMatch = await this.matche.createNewMatche(theMatch);
    if (typeof theNewMatch === 'string') {
      if (theNewMatch.includes('possible')) {
        return res.status(422).json({ message: theNewMatch });
      }
      return res.status(404).json({ message: theNewMatch });
    }
    return res.status(201).json(theNewMatch);
  };
}

export default MatcheController;
