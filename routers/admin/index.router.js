const dashboardRouter = require('./dashboard.router');
const systemConfig = require('../../config/system');

module.exports = (app) => {
    const prefixAdmin = systemConfig.prefixAdmin;
    app.use(prefixAdmin + '/dashboard', dashboardRouter);
};


