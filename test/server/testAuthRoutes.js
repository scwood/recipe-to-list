import mockgoose from 'mockgoose';
import mongoose from 'mongoose';
import supertest from 'supertest';

import app from '../../src/server';
import config from '../../src/server/config';

before((done) => {
  mockgoose(mongoose).then(() => {
    mongoose.connect(config.testMongodbUrl, (error) => done(error));
  });
});

describe('Auth routes', () => {
  describe('POST /register', () => {
    const uri = '/api/register';
    it('Should 400 on missing username and password', (done) => {
      supertest(app)
        .post(uri)
        .expect(400, done);
    });
    it('Should 400 on missing username', (done) => {
      supertest(app)
        .post(uri)
        .send({ password: 'asdf' })
        .expect(400, done);
    });
    it('Should 400 on missing password', (done) => {
      supertest(app)
        .post(uri)
        .send({ username: 'asdf' })
        .expect(400, done);
    });
    it('Should 201 with valid username and password', (done) => {
      supertest(app)
        .post(uri)
        .send({ username: 'asdf', password: 'asdf' })
        .expect(201, done);
    });
    it('Should 403 after trying to create user with existing username', (done) => {
      supertest(app)
        .post(uri)
        .send({ username: 'asdf', password: 'asdf' })
        .expect(403, done);
    });
  });
});
