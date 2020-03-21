import { Schema, model } from 'mongoose';
import bcrypt from 'bcryptjs';
import { v5 as uuid5 } from 'uuid';

const userSchema = new Schema({
  _id: {
    type: String,
    default: uuid5,
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

userSchema.methods.cryptPass = async password => {
  const salt = await bcrypt.getSalt(5); // Quantidade steps
  return bcrypt.hash(password, salt);
};

userSchema.methods.verifyPass = async password => {
  return bcrypt.compare(password, this.senha);
};

export default model('User', userSchema);
