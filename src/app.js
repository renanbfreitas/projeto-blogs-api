const express = require('express');
const loginRouter = require('./router/loginRouter');
const usersRoute = require('./router/usersRoute');
const categoryRoute = require('./router/categoryRoute');
const postsRoute = require('./router/postsRoute');

// ...

const app = express();

// não remova ou mova esse endpoint
app.get('/', (_request, response) => {
  response.send();
});

app.use(express.json());
app.use('/login', loginRouter);
app.use('/user', usersRoute);
app.use('/categories', categoryRoute);
app.use('/post', postsRoute);

// ...

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
