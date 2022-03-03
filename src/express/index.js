const express = require('express');
const logger = require('../lib/logger');
const compress = require('compression');
const serveStatic = require('serve-static');
const path = require('path');
const lastResortErrorHandler = require('../lib/last-resort-error-handler');
const basicAuth = require('../lib/basic-auth');
const tokenAuth = require('../lib/token-auth');
const findUser = require('../lib/find-user');

const usersRouter = require('./routes/users');
const emailsRouter = require('./routes/emails');
const tokensRouter = require('./routes/tokens');

let app = express();

// middleware
app.use(logger);
app.use(compress());
app.use(serveStatic(path.join(__dirname, '../public')));
app.use('/uploads', serveStatic(path.join(__dirname, '../uploads')));
app.use('/tokens', tokensRouter);
app.use(tokenAuth(findUser.byToken));
app.use(basicAuth(findUser.byCredentials));
app.use(lastResortErrorHandler);

// routers
app.use('/emails', emailsRouter);
app.use('/users', usersRouter);


app.listen(3000);