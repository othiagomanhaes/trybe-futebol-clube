import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app'
import userModel from '../database/models/users.model';
import { userMock } from './mocks/user.mock';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testa a model de users', () => {
  afterEach(() => {
    sinon.restore();
  })

  it('Retorna o token do user', async () => {
    sinon.stub(userModel, 'findOne').resolves(userMock);

    const result: Response = await chai.request(app).post('/login').send({ email: 'admin@admin.com', password: 'admin82' });

    expect(result.status).to.be.equal(200);
    expect(result.body).to.be.includes('token');
  })

  it('Retorna um erro ao faltar credenciais', async () => {
    const result: Response = await chai.request(app).post('/login').send({ email: 'admin@admin.com' });

    expect(result.status).to.be.equal(400);
    expect(result.body).to.be.deep.equal({ message: 'All fields must be filled' });
  })
})