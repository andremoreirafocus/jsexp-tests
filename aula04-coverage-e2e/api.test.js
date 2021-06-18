var assert = require('assert');
const { describe, it } = require('mocha');
const request = require('supertest');

const app = require('./api');

describe('API test suite', () => {
  describe('/contact', () => {
    it('should request the contact page and return HTTP status 200', async() => {
      const response = await request(app)
        .get('/contact')
        .expect(200)
      assert.deepStrictEqual(response.text, 'contact page');
      console.log({response});
    });
  });
  describe('/hello', () => {
    it('should request an inexistent route /hi and redirect to /hello', async() => {
      const response = await request(app)
        .get('/hi')
        .expect(200)
      assert.deepStrictEqual(response.statusCode, 200);
      assert.deepStrictEqual(response.text, 'Hello World!')
    });
  });
  describe('/login', () => {
    it('should login successfully using the login route and return HTTP status 200', async() => {
      const response = await request(app)
        .post('/login')
        .send({ username: "AndreMoreira", password: "12345"})
        .expect(200)
      assert.deepStrictEqual(response.statusCode, 200);
      assert.deepStrictEqual(response.text, 'Login succeded!')
    });
  });
  describe('/login', () => {
    it('should fail login  using the login route and return HTTP status 401', async() => {
      const response = await request(app)
        .post('/login')
        .send({ username: "AndreMoreira", password: "blabla"})
        .expect(401)
      assert.ok(response.unauthorized);
      assert.deepStrictEqual(response.text, 'Login failed!')
    });
  });
});