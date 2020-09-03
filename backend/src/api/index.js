const express = require('express');
const db = require('../db'); // REQUIRED TO DATABASE CONNECTION WORKS

const project = require('../constants/project');

const users = require('./users/users.routes');
const acronym = require('./acronyms/acronyms.routes');
const logos = require('./logos/logos.routes');
const newTypes = require('./newsTypes/newsTypes.routes');
const teams = require('./teams/teams.routes');
const leagues = require('./leagues/leagues.routes');
const auth = require('./auth/auth.routes');
const news = require('./news/news.routes');
const vods = require('./vods/vods.routes');
const matches = require('./matches/matches.routes');
const lives = require('./lives/lives.routes');

const router = express.Router();


router.get('/', (req,res) => {
  res.json({
    message: project.message,
  });
});

router.use('/users', users);
router.use('/acronyms', acronym);
router.use('/logos', logos);
router.use('/newtypes', newTypes)
router.use('/teams', teams)
router.use('/leagues', leagues)
router.use('/leagues', leagues)
router.use('/auth', auth)
router.use('/news', news)
router.use('/vods', vods)
router.use('/matches', matches)
router.use('/lives', lives)


module.exports = router;
