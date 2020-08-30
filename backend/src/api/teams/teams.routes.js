const express = require('express');
const Team = require('./teams.model');

const router = express.Router();

router.get('/', async (req,res) => {
  const teams = await Team
    .query()
    .withGraphFetched('acronym', 'logo')
    .select('id', 'name')
    .where('deled_at',null);
  res.json(teams);
});

router.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const teams = await Team
      .query()
      .withGraphFetched('acronym', 'logo')
      .select('id', 'name')
      .where({
        deleted_at: null, 
        id,
      });
    if (undefined || teams.length < 1) {
      res.status(404)
      throw error
    }
    res.json(teams)
  } catch (error) {
    next();
  }
});

module.exports = router;