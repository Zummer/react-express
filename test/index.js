var app = require('../server/index.js');
var request = require('supertest')(app);

describe('Example Node Server', () => {
  it('должен вернуться статус 200', done => {
    request
      .get('/')
      .expect(200, done);
  });

 // it('ответ должен содеражть слово Hello', done => {
 //   request
 //     .get('/')
 //     .expect(200)
 //     .expect(/Hello/, done);
 // })

  it('должно вернуться html', function (done) {
    request
      .get('/')
      .expect('Content-Type', /text\/html/)
      .expect(200, done);

  });

});
