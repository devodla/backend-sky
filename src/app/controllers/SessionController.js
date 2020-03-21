import jwt from 'jsonwebtoken';

import User from '../schemas/User';
import authConfig from '../../config/auth';

class SessionController {
  async store(req, res) {
    const { email, senha } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ mensagem: 'Usuário e/ou senha inválidos' });
    }

    const verifyPass = await user.verifyPass(senha);

    if (!verifyPass) {
      return res.status(404).json({ mensagem: 'Usuário e/ou senha inválidos' });
    }

    const token = jwt.sign({ id: user._id }, authConfig.secret, {
      expiresIn: authConfig.experisIn,
    });

    const result = await User.findOneAndUpdate(
      { _id: user._id },
      { token, ultimo_login: new Date() },
      {
        projection: {
          senha: 0,
          __v: 0,
        },
      },
      (err, results) => {
        if (err) {
          return res
            .status(404)
            .json({ mensagem: 'mensagem de erro', erro: err });
        }

        return results;
      }
    );

    return res.status(200).json(result);
  }
}

export default new SessionController();
