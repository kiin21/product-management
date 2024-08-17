const dashboardRouter = require('./dashboard.router');
const systemConfig = require('../../config/system');

module.exports = (app) => {
    const adminPrefix = systemConfig.adminPrefix;
    app.use(adminPrefix + '/dashboard', dashboardRouter);
};


