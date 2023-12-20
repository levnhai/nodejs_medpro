const siteRouter = require('./Site');
const userRouter = require('./User');

function route(app) {
  app.use('/api', siteRouter);
  app.use('/', userRouter);
}

module.exports = route;
