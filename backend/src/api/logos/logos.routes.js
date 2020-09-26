const express = require('express');

const Logos = require('./logos.model');

const router = express.Router();

router.get('/', async (req,res,next) => {
  const logos = await Logos
    .query()
    .select('id', 'logo_url')
    .where('deleted_at', null);
  res.status(200)
  res.json(logos);
});

router.get('/:id', async (req,res, next) => {
  const { id } = req.params;
  try {
    const logos = await Logos
      .query()
      .select('id', 'logo_url')
      .where({
        deleted_at:null,
        id,
      });
    if(undefined || logos.length<1){
      res.status(404);
      throw error;
    }
    res.status(200)
    res.json(logos);
    
  } catch (error) {
    next()
  }
});


module.exports = router;