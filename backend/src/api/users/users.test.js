const supertest = require('supertest');

const app = require('../../app');

describe('GET /api/v1/users', () => {
  it('should respond with an array of users' , async () =>{
    const respose = await supertest(app)
      .get('/api/v1/users')
      .expect('Content-Type', /json/)
      .expect(200);
    expect(respose.body.length).toBeGreaterThan(0);
  });
});