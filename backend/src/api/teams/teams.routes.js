const express = require('express');

const queries = require('./teams.queries');

const router = express.Router();

router.get('/', async (req,res) => {
  const teams = await queries.find();
  res.json(teams);
});

router.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const teams = await queries.get(id);
    if (teams == undefined || teams.length < 1) {
      return next()
    }else if (teams){
    return res.json(teams);
    }
    return next();
  } catch (error) {
    return next(error);
  }
});

module.exports = router;