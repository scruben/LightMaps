const userModel = require('./models/users.js');

module.exports = function * (next) {
  // TODO: refactor this, too many 'Not authorized'
  if (this.request.header.authorization) {
    let token = this.request.header.authorization.split(' ');
    if (token[0] === 'Bearer') {
      token = token[1];
      // yield userModel.getUserWithToken(token)
      //   .then(data => {
      //     this.set('X-User',data.role).then(() => {next});
      //     // this.set('X-User',JSON.stringify({username: data.username, role: data.role})).then(() => {next});
      //   })
      //   .catch(() =>{
      //     this.status = 401;
      //     this.body = JSON.stringify({error: 'Not authorized.'});
      //   });
      let user = yield userModel.getUserWithToken(token);
      if (user.clearance && user.clearance !=='') {
        this.set('X-User',user.clearance);
        yield next;
      } else {
        this.status = 401;
        this.body = JSON.stringify({error: 'Not authorized.'});
      }
    } else if (token[0] === 'Basic') {
      yield next;
    } else {
      this.status = 401;
      this.body = JSON.stringify({error: 'Not authorized.'});
    }
  } else {
    this.status = 401;
    this.body = JSON.stringify({error: 'Not authorized.'});
  }
};
