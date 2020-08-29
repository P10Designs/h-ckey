const express = require('express');

const NewType = require('./newsType.model');
const router = express.Router();

router.get('/', async (req,res) => {
  const newsType = await NewType
    .query()
    .select('id', 'type')
    .where('deleted_at', null);
  res.json(newsType);
});

router.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const newsType = await NewType
      .query()
      .select('id', 'type')
      .where({
        deleted_at: null,
        id,
      });

    if (undefined || newsType.length < 1) {
      const error = new Error('Not found');
      res.status(404)
      throw error;
    }
    res.json(newsType);
  } catch (error) {
    next();
  }
});

module.exports = router;