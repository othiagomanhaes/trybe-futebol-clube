import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app'
import Matche from '../database/models/matches.model';
import { matches } from './mocks/matche.mock';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testa a model de matche', () => {
  afterEach(() => {
    sinon.restore();
  })

  it('Retorna todas as partidas', async () => {
    sinon.stub(Matche, 'findAll').resolves(matches as any);

    const result: Response = await chai.request(app).get('/matches').send();

    expect(result.status).to.be.equal(200);
    expect(result.body).to.be.deep.equal(matches);
  })

  it('Retorna todas as partidas em progresso', async () => {
    sinon.stub(Matche, 'findAll').resolves(matches[0] as any);

    const result: Response = await chai.request(app).get('/matches?inProgress=true').send();

    expect(result.status).to.be.equal(200);
    expect(result.body).to.be.deep.equal(matches[0]);
  })
})