import jwt from 'jsonwebtoken';

import User from '../schemas/User';
import authConfig from '../../config/auth';

class UserController {
  async store(req, res) {
    const { nome, email, senha, telefones } = req.body;

    const userEmail = await User.findOne({ email });

    if (userEmail) {
      return res.status(201).json({
        mensagem: 'E-mail já existente',
      });
    }

    const user = new User({
      nome,
      email,
      senha,
      telefones,
    });

    user.senha = await user.cryptPass(user.senha);

    user.token = jwt.sign({ id: user._id }, authConfig.secret, {
      expiresIn: authConfig.experisIn,
    });

    await user.save((err, results) => {
      if (err) {
        return res
          .status(404)
          .json({ mensagem: 'mensagem de erro', erro: err });
      }
      return results;
    });

    return res.status(200).json(user);
  }
}

export default new UserController();
