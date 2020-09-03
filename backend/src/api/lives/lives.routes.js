const express = require('express');
const yup = require('yup');

const router = express.Router();
const Live = require('./lives.model');
const jwToken = require('../../lib/jwt');


router.get('/', async (req, res, next) => {
  const lives = await Live
    .query()
    .withGraphFetched('match')
    .select('id', 'stream_url')
    .where('deleted_at', null);
  res.json(lives)
});

router.get('/:id', async (req, res, next) =>{
  const { id } = req.params;
  try {
    const lives = await Live
    .query()
    .withGraphFetched('match')
    .select('id', 'stream_url')
    .where({
      deleted_at: null,
      id,
    });
    if(undefined || matches.length<1){
      res.status(404)
      throw error;
    }
    res.json(lives)
  } catch (error) {
    next()
  }
});

const schema = yup.object().shape({
  stream_url: yup.string().trim().max(2000).required(),
  match_id: yup.number().required(),
});

router.post('/add', async (req, res, next) => {
  const {
    jwt,
    stream_url,
    match_id,
  } = req.body;

  try {
    const payload = await jwToken.verify(jwt);
    if(!payload){
      const error = new Error('Unauthorized');
      res.status(403);
      throw error;
    }
    await schema.validate({
      stream_url, 
      match_id
    }, { abortEarly:false });
    const toAdd = await Live
      .query()
      .insert({
       stream_url,
       match_id,
      });
    
    res.json({
      message: 'Live event has been added ✅',
      match: toAdd,
    })
  } catch (error) {
    next(error)
  }
});


router.post('/update/:id', async (req, res, next) => {
  const {
    jwt,
    stream_url,
    match_id,
  } = req.body;
  const { id } = req.params;
  try {
    const payload = await jwToken.verify(jwt);
    if(!payload){
      const error = new Error('Unauthorized');
      res.status(403);
      throw error;
    }
    const user_id = payload.payload.id;
    await schema.validate({
      stream_url,
      match_id,
    }, { abortEarly:false });
    const toUpdate = await Live
      .query()
      .insert({
        stream_url,
        match_id,
        updated_at: new Date().toISOString(),
      })
      .where({
        delete_at:null,
        id,
      });
    
    res.json({
      message: 'Live event has been updated ✅',
      match: toUpdate,
    })
  } catch (error) {
    next(error)
  }
});

router.delete('/delete/:id', async (req, res, next) => {
  const {
    jwt
  } = req.body;
  const { id } = req.params;
  try {
    const payload = await jwToken.verify(jwt);
    if(!payload){
      const error = new Error(errors.un);
      res.status(403);
      throw error
    }
    const toDelete = await Live
    .query()
    .deleteById(id);
  res.json({
    message: 'Live event was deleted ✅', 
    new: toDelete,
  })
  } catch (error) {
    next(error)
  }
});
module.exports = router;