const express = require('express');

const NewType = require('./newsTypes.model');
const router = express.Router();

router.get('/', async (req,res) => {
  const newsType = await NewType
    .query()
    .select('id', 'name')
    .where('deleted_at', null);
  res.status(200)
  res.json(newsType);
});

router.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const newsType = await NewType
      .query()
      .select('id', 'name')
      .where({
        deleted_at: null,
        id,
      });

    if (undefined || newsType.length < 1) {
      const error = new Error('Not found');
      res.status(404)
      throw error;
    }
    res.status(200)
    res.json(newsType);
  } catch (error) {
    next();
  }
});

module.exports = router;