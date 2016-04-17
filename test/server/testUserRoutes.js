import jwt from 'jsonwebtoken';
import mockgoose from 'mockgoose';
import mongoose from 'mongoose';
import supertest from 'supertest';

import User from '../../src/server/models/user';
import app from '../../src/server';
import config from '../../src/server/config';

const testUser = {
  email: 'valid',
  name: 'valid',
  password: 'valid',
};
const testToken = jwt.sign(testUser, config.secret);
const userUri = '/api/user';
const signUpEmailUri = '/api/user/signUpEmail';
const tokenUri = '/api/user/token';

before(done => {
  mockgoose(mongoose).then(() => {
    mongoose.connect(config.testMongodbUrl, (error) => done(error));
  });
});

afterEach((done) => {
  mockgoose.reset(done);
});

describe('User routes', () => {
  describe(`POST ${userUri}`, () => {
    it('Should 400 on missing token', (done) => {
      supertest(app)
        .post(userUri)
        .expect(400, done);
    });
    it('Should 200 on valid token', (done) => {
      supertest(app)
        .post(userUri)
        .send({ token: testToken })
        .expect(200, done);
    });
  });

  describe(`POST ${signUpEmailUri}`, () => {
    it('Should 400 on missing email, name, and password', (done) => {
      supertest(app)
        .post(signUpEmailUri)
        .expect(400, done);
    });
    it('Should 400 on missing email', (done) => {
      supertest(app)
        .post(signUpEmailUri)
        .send({ name: testUser.name, password: testUser.password })
        .expect(400, done);
    });
    it('Should 400 on missing name', (done) => {
      supertest(app)
        .post(signUpEmailUri)
        .send({ email: testUser.email, password: testUser.password })
        .expect(400, done);
    });
    it('Should 400 on missing password', (done) => {
      supertest(app)
        .post(signUpEmailUri)
        .send({ email: testUser.email, name: testUser.name })
        .expect(400, done);
    });
    it('Should 403 when trying existing user', (done) => {
      User.create(testUser)
        .then(() => {
          supertest(app)
            .post(signUpEmailUri)
            .send(testUser)
            .expect(403, done);
        });
    });
    it('Should 200 with valid parameters', (done) => {
      supertest(app)
        .post(signUpEmailUri)
        .send(testUser)
        .expect(200, done);
    });
  });

  describe(`POST ${tokenUri}`, () => {
    it('Should 400 on missing username and password', (done) => {
      supertest(app)
      .post(tokenUri)
      .expect(400, done);
    });
    it('Should 400 on missing username', (done) => {
      supertest(app)
      .post(tokenUri)
      .send({ password: testUser.password })
      .expect(400, done);
    });
    it('Should 400 on missing password', (done) => {
      supertest(app)
      .post(tokenUri)
      .send({ username: testUser.username })
      .expect(400, done);
    });
    it('Should 200 with valid username and password', (done) => {
      User.create(testUser)
        .then(() => {
          supertest(app)
            .post(tokenUri)
            .send({ email: testUser.email, password: testUser.password })
            .expect(200, done);
        });
    });
  });
});
