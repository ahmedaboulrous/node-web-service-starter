const ResponseError = require('../helpers/ResponseError');

module.exports = (req, res, next) => {
  const error = new ResponseError('Requested URI is Not Found', 404);
  next(error);
};
