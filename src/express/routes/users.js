const express = require('express');
const users = require('../fixtures/users');
const requireAuth = require('../../lib/require-auth');

let getUsersRoute = (req, res) => {
    res.send(users);
}

let getUserRoute = (req, res) => {
    console.log(req.params);
    let user = users.find(user => user.id === req.params.id);
    res.send(user);
}

let usersRouter = express.Router();

// require all requests to the router be authenticated
usersRouter.use(requireAuth);

usersRouter.get('/', getUsersRoute);
usersRouter.get('/:id', getUserRoute);

module.exports = usersRouter;