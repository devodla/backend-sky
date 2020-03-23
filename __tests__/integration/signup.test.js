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
    expect(response.body).toHaveProperty('token');
  });

  it('email exists', async done => {
    const user = await factory.attrs('User');

    await request(app)
      .post('/signup')
      .send(user);

    const responseExist = await request(app)
      .post('/signup')
      .send(user);

    expect(responseExist.status).toBe(201);
    expect(responseExist.body).toMatchObject({
      mensagem: 'E-mail já existente',
    });
    done();
  });
});
