import request from 'supertest';
import app from '../../src/app';

import factory from '../factories';
import '../setup';

describe('Sing Up', () => {
  it('Register new user', async () => {
    const user = await factory.attrs('User');

    const response = await request(app)
      .post('/signup')
      .send(user);

    expect(response.status).toBe(200);
  });

  it('Login', async () => {
    const user = await factory.attrs('User');

    const responseTo = await request(app)
      .post('/signin')
      .send({ email: user.email, senha: user.senha });

    expect(responseTo.status).toBe(200);
  });
});
