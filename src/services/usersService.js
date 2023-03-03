const { User } = require('../models');
const jwt = require('../middlewares/jwt');

const usersService = {
  create: async (body) => {
    const user = await User.findOne({ where: { email: body.email } });
    if (user) return { error: { code: 409, message: { message: 'User already registered' } } };
    await User.create(body);
    const { id, password, image, ...userWithouthPassword } = body;
    return jwt.createToken(userWithouthPassword);
},
findAll: async () => {
  const users = await User.findAll({ attributes: { exclude: ['password'] } });
  return users;
  },
};

module.exports = usersService;