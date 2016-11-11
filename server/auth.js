const userModel = require('./models/users.js');

module.exports = function * (next) {
  if (this.request.header.authorization) {
    let token = this.request.header.authorization.split(' ');
    if (token[0] === 'Bearer') {
      token = token[1];
      yield userModel.getUserWithToken(token)
        .then(data => {
          this.request.user = data;
        })
        .catch(() =>{
        });
    }
  }
  yield next;
  // TODO: when middleware in router ...
  // in case not authorized, not yield next, status 401 and return undefined
};
