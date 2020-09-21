const express = require('express');
const yup = require('yup');

const router = express.Router();
const Match = require('./matches.model');
const jwToken = require('../../lib/jwt');


router.get('/', async (req, res, next) => {
  const matches = await Match
    .query()
    .withGraphFetched('local')
    .withGraphFetched('visitor')
    .withGraphFetched('league')
    .withGraphFetched('vod')
    .select('id', 'played', 'match_time','user_id')
    .where('deleted_at', null).orderBy('match_time');
  res.json(matches)
});

router.get('/:id', async (req, res, next) =>{
  const { id } = req.params;
  try {
    const matches = await Match
    .query()
    .withGraphFetched('local')
    .withGraphFetched('visitor')
    .withGraphFetched('league')
    .withGraphFetched('vod')
    .select('id', 'played', 'match_time','user_id')
    .where({
      id,
    });
    if(undefined || matches.length<1){
      res.status(404)
      throw error;
    }
    res.json(matches)
  } catch (error) {
    next()
  }
});

const schema = yup.object().shape({
  local_id: yup.number().required(),
  visitor_id: yup.number().required(),
  league_id: yup.number().required(),
  vod_id: yup.number(),
  played: yup.boolean().required(),
  match_time: yup.string().trim().required(),
  user_id: yup.number().required(),
});

router.post('/add', async (req, res, next) => {
  const {
    jwt,
    local_id,
    visitor_id,
    league_id,
    vod_id,
    played,
    match_time,
  } = req.body;

  try {
    const payload = await jwToken.verify(jwt);
    if(!payload){
      const error = new Error('Unauthorized');
      res.status(403);
      throw error;
    }
    const user_id = payload.payload.id;
    await schema.validate({
      local_id,
      visitor_id,
      league_id,
      vod_id,
      played,
      match_time,
      user_id,
    }, { abortEarly:false });
    const toAdd = await Match
      .query()
      .insert({
        local_id,
        visitor_id,
        league_id,
        vod_id,
        played,
        match_time,
        user_id,
      });
    
    res.json({
      message: 'Match has been added ✅',
      match: toAdd,
    })
  } catch (error) {
    next(error)
  }
});


router.post('/update/:id', async (req, res, next) => {
  const {
    jwt,
    local_id,
    visitor_id,
    league_id,
    vod_id,
    played,
    match_time,
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
      local_id,
      visitor_id,
      league_id,
      vod_id,
      played,
      match_time,
      user_id,
    }, { abortEarly:false });
    const toUpdate = await Match
      .query()
      .insert({
        local_id,
        visitor_id,
        league_id,
        vod_id,
        played,
        match_time,
        user_id,
        updated_at: new Date().toISOString(),
      })
      .where({
        delete_at:null,
        id,
      });
    
    res.json({
      message: 'Match has been updated ✅',
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
    const toDelete = await Match
    .query()
    .deleteById(id);
  res.json({
    message: 'Match was deleted ✅', 
    new: toDelete,
  })
  } catch (error) {
    next(error)
  }
});
module.exports = router;