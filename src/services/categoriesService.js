const { Category } = require('../models');

const categoriesService = {
  create: async (body) => {
    const category = await Category.create(body);
    const datavalues = category.toJSON();
    return datavalues;
  },
  findAll: async () => {
    const categories = await Category.findAll();
    return categories;
  },
};

module.exports = categoriesService;