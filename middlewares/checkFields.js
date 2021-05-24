const { validationResult } = require('express-validator');
const checkFields = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(403).json({
      status: 403,
      messages: errors.mapped(),
    });
  }
  next();
};

module.exports = { checkFields };
