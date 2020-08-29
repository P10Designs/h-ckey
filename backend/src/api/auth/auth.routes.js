const express = require('express');
const yup = require('yup');
const bcrypt = require('bcrypt');

const jwt = require('../../lib/jwt');
const User = require('../users/users.model');

const router = express.Router();

const errorMessages = {
  invalidLogin: 'Invalid login.',
  invalidPassword: 'Invalid Password',
}

const loginSchema = yup.object().shape({
  username: yup.string().trim().min(2).matches(/[a-z ]/i).required(),
});



router.post('/login', async (req, res, next) => {
  const {
    username,
    password
  } = req.body;
  try {
    await loginSchema.validate({
      username,
    }, {
      abortEarly: false,
    });
    const user = await User.query().where({ username }).first();
    if(!user){
      const error = new Error(errorMessages.invalidLogin);
      res.status(403);
      throw error;
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if(!validPassword){
      const error = new Error(errorMessages.invalidLogin);
      res.status(403);
      throw error;
    }
    const payload = {
      id: user.id,
      username,
    };
    const token = await jwt.sign(payload);
    res.json({
      user: payload,
      token,
    });
  } catch (error) {
    next(error);
  }
});


module.exports = router;