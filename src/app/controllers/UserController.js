import User from '../schemas/User';

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

    await user.save();

    const resUser = await User.findOne({ email }, { senha: 0, __v: 0 });

    return res.status(200).json(resUser);
  }
}

export default new UserController();
