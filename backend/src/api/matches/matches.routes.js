const express = require('express');
const yup = require('yup');
const Jwt = require('../../lib/jwt');

const Match = require('./matches.model');
const { league } = require('../../constants/tableNames');

const router = express.Router();

router.get('/', async (req,res) => {
  const matches = await Match
    .query()
    .withGraphFetched('league')
    .select('id', 'local_id','visitor_id','user_id','played')
    .where('deleted_at', null);
  res.json(matches);
});


router.get('/:id', async (req,res,next) => {
  const { id } = req.params;
  try {
    const matches = await Match
      .query()
      .withGraphFetched(league)
      .select('id', 'local_id','visitor_id','user_id','played','vods_id')
      .where({id: id})
      .where('deleted_at', null);
    if (undefined || matches.length < 1) {
      const error = new Error('Match not found');
      res.status(404)
      throw error;
    }
    res.json(matches);
  } catch (error) {
    next(error)
  }
});

const matchSchema = yup.object().shape({
  id: yup.number(),
  local_id: yup.number().required(),
  visitor_id: yup.number().required(),
  league_id: yup.number().required(),
  played: yup.boolean(),
});


router.post('/new', async (req,res,next) =>{
  const {
    jwt,
    local_id,
    visitor_id,
    league_id,
    played,
    match_time,
    vods_id
  } = req.body;
  try {
    if (!jwt) {
      const error = new Error('Unauthorized');
      res.status(403);
      throw error;
    }
    const logged = await Jwt.verify(jwt);
    if (!logged) {
      const error = new Error('Unauthorized');
      res.status(403);
      throw error;
    }
    await matchSchema.validate({
      local_id,
      visitor_id,
      league_id,
      played,
    })
    const insertedMatch = await Match
      .query()
      .insert({
        user_id: logged.payload.id,
        local_id,
        visitor_id,
        league_id,
        played,
        match_time,
      }).returning('*');
    res.json({
      message: '✅ Match has been inserted successfully ✅',
      match: insertedMatch,
    })
  } catch (error) {
    next(error);
  }
});

router.post('/edit', async (req, res, next) => {
  const {
    jwt,
    id,
    local_id,
    visitor_id,
    league_id,
    played,
    match_time,
    vods_id
  } = req.body;
  try {
    if (!jwt) {
      const error = new Error('Unauthorized');
      res.status(403);
      throw error;
    } 
    const logged = await Jwt.verify(jwt);
    if (!logged) {
      const error = new Error('Unauthorized');
      res.status(403);
      throw error;
    }
    await matchSchema.validate({
      local_id,
      visitor_id,
      league_id,
      played,
    });
    console.log(logged.payload.id);
    const updatedMatch = await Match
    .query()
    .update({
      local_id,
      visitor_id,
      league_id,
      played,
      match_time,
      vods_id,
      user_id: logged.payload.id,
      updated_at: new Date().toISOString(),
    })
    .where({id})
    .returning('*');
    res.json({
      message: '✅ Record has been changed',
      match: updatedMatch,
    });
  } catch (error) {
    next(error);
}
});

module.exports = router;