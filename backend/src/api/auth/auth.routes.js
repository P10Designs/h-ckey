const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('../../lib/jwt');
const yup = require('yup');

const User = require('../users/users.model');
const { token } = require('morgan');

const router = express.Router();

const errors = {
  invalidLogin: 'Invalid login credentials',
}

const schema = yup.object().shape({
  username: yup.string().trim().min(2).required(),
  password: yup.string().trim().min(8).max(100).required(),
});

router.post('/login', async (req, res, next) => {
  const {
    username,
    password,
  } = req.body;

  try {
    await schema.validate({
        username,
        password,
      },{ abortEarly: false });
    const user = await User.query().where({ username }).first();
    if(!user){
      const error = new Error(errors.invalidLogin);
      res.status(403);
      throw error;
    }
    const validPassword =  await bcrypt.compare(password, user.password);
    if (!validPassword){
      const error = new Error(errors.invalidLogin);
      res.status(403);
      throw error;
    }
    const payload = {
      id: user.id,
      username,
    };
    const token = await jwt.sign(payload)
    res.json({
      user:payload,
      token
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;