const jwt = require('jsonwebtoken');

const generateJwt = (id) => {
  return new Promise((resolve, reject) => {
    const paylod = {
      id,
    };
    // eslint-disable-next-line no-undef
    const secret = process.env.JWT_SECRET;
    const options = {
      expiresIn: '12h',
    };
    jwt.sign(paylod, secret, options, (err, token) => {
      if (err) {
        console.log(err);
        return reject('Error creating token');
      }
      resolve(token);
    });
  });
};

module.exports = { generateJwt };
