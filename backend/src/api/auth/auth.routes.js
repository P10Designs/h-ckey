const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('../../lib/jwt');
const yup = require('yup');

const User = require('../users/users.model');

const router = express.Router();

const errors = {
  invalidLogin: 'Invalid login credentials',
}

const schema = yup.object().shape({
  username: yup.string().trim().required(),
  password: yup.string().trim().max(100).required(),
});

router.post('/login', async (req, res, next) => {
  const {
    username,
    password,
  } = req.body;
  console.log(req.body);
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
    const updated_at = await User.query().update({
      last_login: new Date().toISOString(),
    }).where({ username }).first();
    const payload = {
      id: user.id,
      username,
    };
    const token = await jwt.sign(payload)
    res.status(200)
    res.json({
      user:payload,
      token
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;