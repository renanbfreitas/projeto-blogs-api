const { User } = require('../models');
const jwt = require('../middlewares/jwt');

const loginService = {
  login: async ({ email, password }) => {
    const user = await User.findOne({ where: { email } });
    if (!user || user.password !== password) {
      return { error: { code: 400, message: 'Invalid fields' } };
    }
    const datavalues = user.toJSON();
    const { id, image, ...userWithoutPassword } = datavalues;
    return jwt.createToken(userWithoutPassword);
  },
};

module.exports = loginService;