import User from '../../database/models/users.model';

const userMock = {
  id: 1,
  username: 'Admin',
  role: 'admin',
  email: 'admin@admin.com',
  password: '$2a$12$1Dn1grZ15oiLWuFaiqywJe5p1qFoROO.2ys85xFbPKeSnrbZllT3G' 
} as User;

export { userMock };