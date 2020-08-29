const jwt = require('jsonwebtoken');

function sign(payload) {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '1d',
    }, (error, token) => {
      if (error) return reject(error);
      return resolve(token);
    });
  })
}

function verify(payload) {
  return new Promise((resolve, reject) => {
    jwt.verify(payload, process.env.JWT_SECRET, {
      complete: true,
    }, (error, result) => {
      return resolve(result);
    });
  })
}

module.exports = {
  sign,
  verify,
};
