import { Schema, model } from 'mongoose';
import bcrypt from 'bcryptjs';
import { v4 as uuid4 } from 'uuid';
import jwt from 'jsonwebtoken';

import authConfig from '../../config/auth';

const userSchema = new Schema({
  _id: {
    type: String,
    default: uuid4,
  },
  nome: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  senha: {
    type: String,
    required: true,
  },
  telefones: [
    {
      _id: {
        type: String,
        default: uuid4,
      },
      numero: {
        type: Number,
        required: true,
      },
      ddd: {
        type: Number,
        required: true,
      },
    },
  ],
  data_criacao: {
    type: Date,
    default: Date.now,
    index: true,
  },
  data_atualizacao: {
    type: Date,
    default: Date.now,
    index: true,
  },
  ultimo_login: {
    type: Date,
    default: Date.now,
    index: true,
  },
  token: {
    type: String,
  },
});

userSchema.pre('save', async function salvar(next) {
  const doc = this;
  const salt = await bcrypt.genSalt(5); // Quantidade steps
  doc.token = jwt.sign({ id: doc._id }, authConfig.secret, {
    expiresIn: authConfig.experisIn,
  });
  doc.senha = await bcrypt.hash(doc.senha, salt);
  next();
});

userSchema.methods.verifyPass = function verifyPass(password) {
  return bcrypt.compare(password, this.senha);
};

export default model('User', userSchema);
