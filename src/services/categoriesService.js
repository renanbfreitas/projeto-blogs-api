const { Category } = require('../models');

const categoriesService = {
  create: async (body) => {
    const category = await Category.create(body);
    const datavalues = category.toJSON();
    return datavalues;
  },
};

module.exports = categoriesService;