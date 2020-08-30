const express = require('express');

const Acronym = require('./acronyms.model');

const router = express.Router();

router.get('/', async (req,res,next) => {
  const acronyms = await Acronym
    .query()
    .select('id', 'name')
    .where('deleted_at', null);
  res.json(acronyms);
});

router.get('/:id', async (req,res, next) => {
  const { id } = req.params;
  try {
    const acronyms = await Acronym
      .query()
      .select('id', 'username')
      .where({
        deleted_at: null,
        id,
      });
    if(undefined || acronyms.length<1){
      res.status(404);
      throw error;
    }
    res.json(acronyms);
    
  } catch (error) {
    next()
  }
});


module.exports = router;