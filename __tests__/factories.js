import faker from 'faker';
import { factory } from 'factory-girl';

import User from '../src/app/schemas/User';

const prueba = faker.phone.phoneNumberFormat(0);
const [ddd, num1, num2] = prueba.split('-');

factory.define('User', User, {
  nome: faker.name.findName(),
  email: faker.internet.email(),
  senha: faker.internet.password(),
  telefones: [
    {
      numero: `${num1}${num2}`,
      ddd,
    },
  ],
});

export default factory;
