import User from '../schemas/User';

class BuscarController {
  async index(req, res) {
    const userID = req.userId;

    const usuarioPesquisado = await User.findById(userID, { senha: 0, __v: 0 });

    const [, token] = req.headers.authorization.split(' ');

    if (usuarioPesquisado.token !== token) {
      return res.status(401).json({ mensagem: 'Não autorizado' });
    }
    const now = new Date();

    if (
      now.getUTCMinutes() - usuarioPesquisado.ultimo_login.getUTCMinutes() >=
      30
    ) {
      return res.status(401).json({
        mensagem: 'Sessão inválida',
      });
    }
    return res.status(200).json(usuarioPesquisado);
  }
}

export default new BuscarController();
