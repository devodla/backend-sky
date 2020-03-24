import request from 'supertest';
import app from '../../src/app';

import factory from '../factories';
import '../setup';

describe('Buscar', () => {
  it('buscar usuario con sucesso', async done => {
    const user = await factory.attrs('User');

    await request(app)
      .post('/signup')
      .send(user);

    const responseSingIn = await request(app)
      .post('/signin')
      .send({ email: user.email, senha: user.senha });

    const responseBuscar = await request(app)
      .get('/buscar')
      .set('Authorization', `bearer ${responseSingIn.body.token}`)
      .send();

    expect(responseBuscar.status).toBe(200);
    expect(responseBuscar.body).toHaveProperty('_id');
    done();
  });

  it('buscar usuario sem o token', async done => {
    const responseBuscar = await request(app)
      .get('/buscar')
      .send();

    expect(responseBuscar.status).toBe(401);
    expect(responseBuscar.body).toMatchObject({
      mensagem: 'Não autorizado',
    });
    done();
  });

  it('buscar usuario com o token errado', async done => {
    const responseBuscar = await request(app)
      .get('/buscar')
      .set('Authorization', `bearer tokeninvalidosemformato`)
      .send();

    expect(responseBuscar.status).toBe(401);
    expect(responseBuscar.body).toMatchObject({
      mensagem: 'Token invalido',
    });
    done();
  });
});
