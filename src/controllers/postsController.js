const postsService = require('../services/postsService');
const jwt = require('../middlewares/jwt');
const validatePost = require('../middlewares/validatePost');
const validateUpdatePost = require('../middlewares/validateUpdatePost');

const postsController = {
  create: async (req, res) => {
    const token = req.headers.authorization;
    const validatedToken = jwt.verifyToken(token);
    if (validatedToken.error) {
      return res.status(validatedToken.error.code).json(validatedToken.error.message);
    }
    const validateBody = validatePost(req.body);
    if (validateBody.error) {
      return res.status(validateBody.error.code).json(validateBody.error.message);
    }
    const { email } = validatedToken;
    const result = await postsService.create(validateBody, email);
    if (result.error) return res.status(result.error.code).json(result.error.message);
    res.status(201).json(result);
  },
  findAll: async (req, res) => {
    const token = req.headers.authorization;
    const validatedToken = jwt.verifyToken(token);
    if (validatedToken.error) {
      return res.status(validatedToken.error.code).json(validatedToken.error.message);
    }
    const posts = await postsService.findAll();
    res.status(200).json(posts);
  },
  findByPk: async (req, res) => {
    const token = req.headers.authorization;
    const validatedToken = jwt.verifyToken(token);
    if (validatedToken.error) {
      return res.status(validatedToken.error.code).json(validatedToken.error.message);
    }
    const { id } = req.params;
    const post = await postsService.findByPk(id);
    if (post.error) return res.status(post.error.code).json(post.error.message);
    res.status(200).json(post);
  },
  update: async (req, res) => {
    const token = req.headers.authorization;
    const validatedToken = jwt.verifyToken(token);
    if (validatedToken.error) {
      return res.status(validatedToken.error.code).json(validatedToken.error.message);
    }
    const validateBody = validateUpdatePost(req.body);
    if (validateBody.error) {
      return res.status(validateBody.error.code).json(validateBody.error.message);
    }
    const { id } = req.params;
    const { email } = validatedToken;
    const updatePost = await postsService.update(validateBody, id, email);
    if (updatePost.error) return res.status(updatePost.error.code).json(updatePost.error.message);
    res.status(200).json(updatePost);
  },
};

module.exports = postsController;