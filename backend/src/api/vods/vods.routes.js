// TODO: VODS routes, all of them, need GET ALL, GET ONE, POST ADD , POST UPDATE
const express = require('express');
const yup = require('yup');
const jwToken = require('../../lib/jwt');

const router = express.Router()
const Vod = require('./vods.model');

const errors = {
  un: 'Unauthorized',
}

router.get('/', async(req, res, next) => {
  const vods = await Vod
    .query()
    .withGraphFetched('local')
    .withGraphFetched('visitor')
    .withGraphFetched('league')
    .select('id','name','match_date','image_url','local_result','visitor_result','video_url','user_id')
    .where('deleted_at',null).orderBy('id', 'desc');
  res.status(200)
  res.json(vods);
});

router.get('/league/:league_id', async (req,res,next) => {
  const { league_id } = req.params;
  try {
    const vods = await Vod
    .query()
    .withGraphFetched('local')
    .withGraphFetched('visitor')
    .withGraphFetched('league')
    .select('id','name','match_date', 'image_url','local_result','visitor_result','video_url','user_id')
    .where({
      deleted_at: null,
      league_id,
    }).orderBy('match_date', 'desc')
    if (undefined || vods.length < 1) {
      res.status(404);
      throw error;
    }
    res.status(200)
    res.json(vods);
  } catch (error) {
    res.status(600)
    res.json({
      message: 'Not Found'
    })
  }
});

router.get('/:id', async(req, res, next) => {
  const { id } = req.params; 
  try {
    const vods = await Vod
    .query()
    .withGraphFetched('local')
    .withGraphFetched('visitor')
    .withGraphFetched('league')
    .select('id','name', 'image_url','local_result','visitor_result','video_url','user_id')
    .where({
      deleted_at: null,
      id,
    })
    if (undefined || vods.length < 1) {
      res.status(404);
      throw error;
    }
    res.status(200)
    res.json(vods);
  } catch (error) {
    next();
  }
  
});

const schema = yup.object().shape({
  match_date:  yup.string().trim().required(),
  image_url: yup.string().trim().max(2000).required(),
  name: yup.string().trim().required(),
  local_id: yup.number().required(),
  visitor_id: yup.number().required(),
  local_result: yup.number().required(),
  visitor_result: yup.number().required(),
  league_id: yup.number().required(),
  video_url: yup.string().trim().max(2000).required(),
  user_id: yup.number().required(),
});

router.post('/add', async (req, res, next) => {
  const {
    jwt,
    match_date,
    image_url,
    name,
    local_id,
    visitor_id,
    local_result,
    visitor_result,
    league_id,
    video_url,
  } = req.body;
  try {
    const payload = await jwToken.verify(jwt);
    if(!payload){
      const error = new Error(errors.un);
      res.status(403);
      throw error
    }
    const user_id = payload.payload.id;
    await schema.validate({
      name,
      match_date,
      image_url,
      local_id,
      visitor_id,
      local_result,
      visitor_result,
      league_id,
      video_url,
      user_id,
    },{ abortEarly: false });
    const toAdd = await Vod
    .query()
    .insert({
      match_date,
      image_url,
      name,
      local_id,
      visitor_id,
      local_result,
      visitor_result,
      league_id,
      video_url,
      user_id,
    });
  res.status(200)
  res.json({
    message: 'Vod was added ✅', 
    new: toAdd,
  })
  } catch (error) {
    next(error)
  }
});

router.post('/update/:id', async (req, res, next) => {
  const {
    jwt,
    match_date,
    image_url,
    name,
    local_id,
    visitor_id,
    local_result,
    visitor_result,
    league_id,
    video_url,
  } = req.body;
  const { id } = req.params;
  try {
    const payload = await jwToken.verify(jwt);
    if(!payload){
      const error = new Error(errors.un);
      res.status(403);
      throw error
    }
    const user_id = payload.payload.id;
    await schema.validate({
      name,
      match_date,
      image_url,
      local_id,
      visitor_id,
      local_result,
      visitor_result,
      league_id,
      video_url,
      user_id,
    },{ abortEarly: false });
    const toUpdate = await Vod
    .query()
    .insert({
      name,
      match_date,
      image_url,
      local_id,
      visitor_id,
      local_result,
      visitor_result,
      league_id,
      video_url,
      user_id,
      updated_at: new Date().toISOString(),
    }).where({ id });
    res.status(200)
    res.json({
      message: 'Vod was updated ✅', 
      new: toUpdate,
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
    const user_id = payload.payload.id;
   
    const toDelete = await Vod
    .query()
    .deleteById(id);
    res.status(200)
    res.json({
      message: 'Vod was deleted ✅', 
      new: toDelete,
    })
  } catch (error) {
    next(error)
  }
});

module.exports = router;