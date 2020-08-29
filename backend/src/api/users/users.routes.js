const express = require('express');

const User = require('./users.model');

const router = express.Router();

router.get('/', async (req,res) => {
  const users = await User
    .query()
    .select('id', 'username')
    .where('deleted_at', null);
  res.json(users);
});

module.exports = router;