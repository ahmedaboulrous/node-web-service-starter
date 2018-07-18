
class ResponseError extends Error {
  constructor(message, statusCode) {
    super(message);
    this._statusCode = statusCode;
  }

  get statusCode() {
    return this._statusCode;
  }

  set statusCode(statusCode) {
    this._statusCode = statusCode;
  }
}

module.exports = ResponseError;
