const jwt = require('jsonwebtoken');

const validateJwt = (req, res, next) => {
  const token = req.header('x-token');
  if (!token) {
    return res.status(401).json({
      status: 401,
      messages: 'Token expected',
    });
  }
  try {
    // eslint-disable-next-line no-undef
    const secret = process.env.JWT_SECRET;
    const { id } = jwt.verify(token, secret);
    req.id = id;
    next();
  } catch (error) {
    return res.status(401).json({
      status: 401,
      messages: 'Token invalid',
    });
  }
};

module.exports = { validateJwt };
