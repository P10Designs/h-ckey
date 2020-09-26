const express = require('express');

const router = express.Router();
const League = require('./leagues.model');
const { league } = require('../../constants/tableNames');


router.get('/', async (req,res) => {
  const leagues =  await League
    .query()
    .withGraphFetched('logo')
    .select('id', 'name')
    .where('deleted_at', null)
  res.status(200)
  res.json(leagues);
});

router.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const leagues = await League
      .query()
      .withGraphFetched('logo')
      .select('id', 'name')
      .where({
        deleted_at: null,
        id
      });
      if(undefined || leagues.length < 1){
        res.status(404)
        throw error;
      }
      res.status(200);
      res.json(leagues);
  } catch (error) {
    next()
  }

});


module.exports = router;