const express = require('express');

const User = require('./users.model');

const router = express.Router();

router.get('/', async (req,res) => {
  const users = await User
    .query()
    .select('id', 'username', 'last_login')
    .where('deleted_at', null);
  res.status(200)
  res.json(users);
});

router.get('/:id', async (req,res, next) => {
  const { id } = req.params;
  try {
    const users = await User
      .query()
      .select('id', 'username', 'last_login')
      .where({
        deleted_at: null,
        id,
      });
    if(undefined || users.length<1){
      res.status(404);
      throw error;
    }
    res.status(200)
    res.json(users);
    
  } catch (error) {
    next()
  }
});


module.exports = router;