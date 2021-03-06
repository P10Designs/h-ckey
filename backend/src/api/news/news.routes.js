const express = require('express');
const yup = require('yup');
const jwToken = require('../../lib/jwt');

const router = express.Router();
const New = require('./news.model');

const errors = {
  un: 'Unauthorized',
}

router.get('/', async (req, res, next) => {
  const news = await New
    .query()
    .withGraphFetched('league')
    .withGraphFetched('type')
    .select('id', 'image_url', 'name', 'new_url')
    .where('deleted_at', null)
    .orderBy('id', 'desc');
  res.status(200);
  res.json(news);
}); 


router.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const news = await New
    .query()
    .withGraphFetched('league')
    .withGraphFetched('type')
    .select('id', 'image_url', 'name', 'new_url')
    .where({
      deleted_at: null,
      id,
    });
    if(undefined || news.length < 1){
      res.status(404);
      throw error
    }
    res.status(200);
    res.json(news)
  } catch (error) {
    next()
  }
});

const schema = yup.object().shape({
  name: yup.string().trim().required(),
  image_url: yup.string().trim().max(2000).required(),
  new_url: yup.string().trim().max(2000).required(),
  new_type_id: yup.number().required(),
  league_id: yup.number().required(),
  user_id: yup.number().required(),
});

router.post('/add', async (req, res, next) => {
  const {
    jwt,
    name,
    image_url,
    new_url,
    new_type_id,
    league_id
  } = req.body; 
  try {
    const payload = await jwToken.verify(jwt);
    if(!payload) {
      const error = new Error(errors.un);
      res.status(403)
      throw error
    }
    const user_id = payload.payload.id;
    await schema.validate({
      name,
      image_url,
      new_url,
      new_type_id,
      league_id,
      user_id
    },{ abortEarly: false });
    const toAdd = await New
      .query()
      .insert({
        name,
        image_url,
        new_url,
        new_type_id,
        league_id,
        user_id
      });
    res.status(200);
    res.json({
      message: 'New was added ✅', 
      new: toAdd,
    })
  } catch (error) {
    next(error)
  }
});


router.post('/update/:id', async (req, res, next) => {
  const {
    jwt,
    name,
    image_url,
    new_url,
    new_type_id,
    league_id
  } = req.body;
  const { id } = req.params;
  try {
    const payload = await jwToken.verify(jwt);
    if(!payload) {
      const error = new Error(errors.un);
      res.status(403)
      throw error
    }
    const user_id = payload.payload.id;
    await schema.validate({
      name,
      image_url,
      new_url,
      new_type_id,
      league_id,
      user_id,
    },{ abortEarly: false });
    const toAdd = await New
      .query()
      .update({
        name,
        image_url,
        new_url,
        new_type_id,
        league_id,
        user_id,
        updated_at: new Date().toISOString(),
      })
      .where({ id });
    res.status(200);
    res.json({
      message: 'New was added ✅', 
      new: toAdd,
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
    const toDelete = await New
    .query()
    .deleteById(id);
  res.status(200);
  res.json({
    message: 'New was deleted ✅', 
    new: toDelete,
  })
  } catch (error) {
    next(error)
  }
});

module.exports = router;