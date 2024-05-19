const siteRouter = require('./Site');
const userRouter = require('./User');
const hospitalRouter = require('./Hospital');

function route(app) {
  app.use('/api', siteRouter);
  app.use('/hospital', hospitalRouter);
  // app.use('/hospital', hospitalRouter);
  app.use('/', userRouter);
}

module.exports = route;
