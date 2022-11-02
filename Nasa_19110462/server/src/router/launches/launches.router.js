const express = require('express');
const launchesRouter = express.Router();

const { httpGetAllLaunches,  httpGetAddNewLaunch, httpAbortLaunch} = require('./lauches.controller');



launchesRouter.get('/', httpGetAllLaunches);
launchesRouter.post('/', httpGetAddNewLaunch);
launchesRouter.delete('/:id', httpAbortLaunch);

module.exports = launchesRouter