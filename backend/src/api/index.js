const express = require('express');

const leagues = require('./leagues/leagues.routes');
const users = require('./users/users.routes');
const project = require('../constants/project');
const auth = require('./auth/auth.routes');
const team = require('./teams/teams.routes');
const newType = require('./newsType/newsType.routes');
const match = require('./matches/matches.routes');
const vods = require('./vods/vods.routes');

const router = express.Router();


router.get('/', (req,res) => {
  res.json({
    message: project.message,
  });
});

router.use('/leagues', leagues)
router.use('/users', users)
router.use('/auth', auth)
router.use('/teams', team)
router.use('/newtype', newType)
router.use('/match', match)
router.use('/vods', vods)


module.exports = router;
