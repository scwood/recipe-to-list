import mockgoose from 'mockgoose';
import mongoose from 'mongoose';
import supertest from 'supertest';

import app from '../../src/server';
import config from '../../src/server/config';
import User from '../../src/server/models/user.js';

before((done) => {
  mockgoose(mongoose).then(() => {
    mongoose.connect(config.testMongodbUrl, (error) => done(error));
  });
});

describe('Auth routes', () => {
  describe('POST /register', () => {
    after((done) => {
      User.remove({}, done);
    });
    const uri = '/api/register';
    it('Should 400 on missing username and password', (done) => {
      supertest(app)
        .post(uri)
        .expect(400, done);
    });
    it('Should 400 on missing username', (done) => {
      supertest(app)
        .post(uri)
        .send({ password: 'somepassword' })
        .expect(400, done);
    });
    it('Should 400 on missing password', (done) => {
      supertest(app)
        .post(uri)
        .send({ username: 'someusername' })
        .expect(400, done);
    });
    it('Should 201 with valid username and password', (done) => {
      supertest(app)
        .post(uri)
        .send({ username: 'someusername', password: 'somepassword' })
        .expect(201, {
          user: { username: 'someusername', recipes: [], shoppingList: [] },
        }, done);
    });
    it('Should 403 after trying to create user with existing username', (done) => {
      supertest(app)
        .post(uri)
        .send({ username: 'someusername', password: 'somepassword' })
        .expect(403, done);
    });
  });

  describe('POST /login', () => {
    before((done) => {
      const hashedPassword = User.hashPassword('somepassword');
      User.create({ username: 'someusername', password: hashedPassword }, done);
    });
    after((done) => {
      User.remove({}, done);
    });
    const uri = '/api/login';
    it('Should 400 on missing username and password', (done) => {
      supertest(app)
        .post(uri)
        .expect(400, done);
    });
    it('Should 400 on missing username', (done) => {
      supertest(app)
        .post(uri)
        .send({ password: 'somepassword' })
        .expect(400, done);
    });
    it('Should 400 on missing password', (done) => {
      supertest(app)
        .post(uri)
        .send({ username: 'someusername' })
        .expect(400, done);
    });
    it('Should 200 with valid usernamd and password', (done) => {
      supertest(app)
        .post(uri)
        .send({ username: 'someusername', password: 'somepassword' })
        .expect(200, done);
    });
  });
});
