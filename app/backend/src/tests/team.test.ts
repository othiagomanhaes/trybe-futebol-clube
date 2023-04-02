import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app'
import teamModel from '../database/models/teams.model';
import { allTeamsMock } from './mocks/team.mock';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testa a model de teams', () => {
  afterEach(() => {
    sinon.restore();
  })

  it('Retorna todos os times', async () => {
    sinon.stub(teamModel, 'findAll').resolves(allTeamsMock);

    const result: Response = await chai.request(app).get('/teams');

    expect(result.status).to.be.equal(200);
    expect(result.body).to.be.deep.equal(allTeamsMock);
  })

  it('Retorna um time pelo id', async () => {
    sinon.stub(teamModel, 'findByPk').resolves(allTeamsMock[0]);

    const result: Response = await chai.request(app).get('/teams/1');

    expect(result.status).to.be.equal(200);
    expect(result.body).to.be.deep.equal(allTeamsMock[0]);
  })
})