import request from 'supertest';
import faker from 'faker';
import app from '../../src/app';

import factory from '../factories';
import '../setup';

describe('Sing In', () => {
  it('Login successful', async () => {
    const user = await factory.attrs('User');

    await request(app)
      .post('/signup')
      .send(user);

    const responseTo = await request(app)
      .post('/signin')
      .send({ email: user.email, senha: user.senha });

    expect(responseTo.status).toBe(200);
    expect(responseTo.body).toHaveProperty('token');
  });

  it('Login not success without password incorrect', async done => {
    const user = await factory.attrs('User');
    const senhaFail = faker.internet.password();

    await request(app)
      .post('/signup')
      .send(user);

    const responseTo = await request(app)
      .post('/signin')
      .send({ email: user.email, senha: senhaFail });

    expect(responseTo.status).toBe(404);
    expect(responseTo.body).toMatchObject({
      mensagem: 'Usuário e/ou senha inválidos',
    });
    done();
  });

  it('Login not success without email not exists', async done => {
    const user = await factory.attrs('User');
    const emailFail = faker.internet.email();

    await request(app)
      .post('/signup')
      .send(user);

    const responseTo = await request(app)
      .post('/signin')
      .send({ email: emailFail, senha: user.senha });

    expect(responseTo.status).toBe(404);
    expect(responseTo.body).toMatchObject({
      mensagem: 'Usuário e/ou senha inválidos',
    });
    done();
  });
});
