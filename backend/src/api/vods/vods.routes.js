// TODO: Vods Routes, Get All, by id, Add new, Edit existing.
const express = require('express');
const yup = require('yup');
const Jwt = require('../../lib/jwt');

const Vods = require('./vods.model');
const { route } = require('../auth/auth.routes');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const vods = await Vods
    .query()
    .select('id', 'local_id', 'visitor_id','local_result',  'visitor_result', 'league_id','user_id')
    .where('deleted_at', null);
  if(undefined || vods.length < 1){
    res.status(404)
    throw error
  }
  res.json(vods);
  } catch (error) {
    next();
  }
});

router.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const vods = await Vods
      .query()
      .select('id', 'local_id', 'visitor_id','local_result',  'visitor_result', 'league_id','user_id')
      .where('deleted_at', null)
      .where({ id });
    if(undefined || vods.length < 1){
      res.status(404)
      throw error
    }
    res.json(vods);
  } catch (error) {
    next()
  }
});


// TODO: Create schema

router.post('/new', async(req, res, next) => {
  const {
    jwt,
    local_id,
    visitor_id,
    local_result,
    visitor_result,
    league_id
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
    // TODO: Actually create the new entity
  } catch (error) {
    next(error);
  }
});


// DONE: Authorization with jwt
module.exports = router;