import mockgoose from 'mockgoose';
import mongoose from 'mongoose';
import supertest from 'supertest';

import app from '../../src/server';
import config from '../../src/server/config';
import User from '../../src/server/models/user.js';

const registerUri = '/api/register';
const loginUri = '/api/login';
const logoutUri = '/api/logout';
const testUser = {
  username: 'valid',
  password: 'valid',
};

beforeEach((done) => {
  mockgoose(mongoose).then(() => {
    mongoose.connect(config.testMongodbUrl, (error) => done(error));
  });
});

afterEach((done) => {
  mongoose.connection.close();
  done();
});

describe('Auth routes', () => {
  describe('POST /api/register', () => {
    it('Should 400 on missing username and password', (done) => {
      supertest(app)
        .post(registerUri)
        .expect(400, done);
    });
    it('Should 400 on missing username', (done) => {
      supertest(app)
        .post(registerUri)
        .send({ password: 'somepassword' })
        .expect(400, done);
    });
    it('Should 400 on missing password', (done) => {
      supertest(app)
        .post(registerUri)
        .send({ username: 'someusername' })
        .expect(400, done);
    });
    it('Should 201 with valid credentials and 403 after trying existing user', (done) => {
      supertest(app)
        .post(registerUri)
        .send(testUser)
        .expect(201, { user: { username: testUser.username, recipes: [], shoppingList: [] } })
        .end(() => {
          supertest(app)
            .post(registerUri)
            .send(testUser)
            .expect(403, done);
        });
    });
  });

  describe('POST /api/login', () => {
    beforeEach((done) => {
      User.create({ username: 'valid', password: User.hashPassword('valid') }, done);
    });
    it('Should 400 on missing username and password', (done) => {
      supertest(app)
        .post(loginUri)
        .expect(400, done);
    });
    it('Should 400 on missing username', (done) => {
      supertest(app)
        .post(loginUri)
        .send({ password: testUser.password })
        .expect(400, done);
    });
    it('Should 400 on missing password', (done) => {
      supertest(app)
        .post(loginUri)
        .send({ username: testUser.username })
        .expect(400, done);
    });
    it('Should 200 with valid usernamd and password', (done) => {
      supertest(app)
        .post(loginUri)
        .send(testUser)
        .expect(200, done);
    });
  });

  describe('POST /api/logout', () => {
    beforeEach((done) => {
      User.create({ username: 'valid', password: User.hashPassword('valid') }, done);
    });
    const agent = supertest.agent(app);
    it('Should 200 and respond with false even when not logged in', (done) => {
      agent
        .post(logoutUri)
        .expect(200, { success: false }, done);
    });
    it('Should 200 and respond with true when logged in', (done) => {
      agent
        .post(loginUri)
        .send(testUser)
        .end(() => {
          agent
            .post(logoutUri)
            .expect(200, { success: true }, done);
        });
    });
  });
});
