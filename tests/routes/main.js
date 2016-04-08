'use strict';

const supertest = require('supertest');
const app = require('../../app');

describe('GET /', () => {
  let server;
  before ((done) => {
    server = app.listen((err) => {
      done(err);
    });
  });

  after((done) => {
    server.close();
    done();
  });

  it(`- returns a 200`, (done) => {
    supertest(server)
      .get('/')
      .expect(200, done);
  });
});
