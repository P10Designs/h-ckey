const express = require('express');

const Leagues = require('./leagues.models');
const { league } = require('../../constants/tableNames');

const router = express.Router();

router.get('/', async (req,res) => {
  const leagues = await Leagues
    .query()
    .select('id', 'name')
    .where('deleted_at', null);
  res.json(leagues);
});

router.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const leagues = await Leagues
      .query()
      .select('id', 'name')
      .where('deleted_at', null)
      .where({id});
    
    if(undefined || leagues.length < 1){
      res.status(404);
      throw error;
    }
    res.json(leagues)
  } catch (error) {
    next()
  }
});

module.exports = router;