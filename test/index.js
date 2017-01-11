var app = require('../server/index.js');
var request = require('supertest')(app);

describe('Example Node Server', () => {
  it('should return 200', done => {
    request
      .get('/')
      .expect(200, done);
  });

  it('should return Hello', done => {
    request
      .get('/')
      .expect(200)
      .expect(/Hello/, done);
  })

});
