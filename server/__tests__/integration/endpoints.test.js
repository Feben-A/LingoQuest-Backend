const request = require('supertest');
const app = require('../../app');
const { resetTestDB } = require('./config');

describe('API Integration Tests', () => {
  let api;

  beforeEach(async () => {
    await resetTestDB();
  });

  beforeAll(() => {
    api = app.listen(4000, () => {
      console.log('Test server running on port 4000');
    });
  });

  afterAll((done) => {
    console.log('Gracefully closing server');
    api.close(done);
  });

  // Users API Tests
  describe('Users API', () => {
    it('should register a new user', async () => {
      const newUser = {
        firstName: 'Alice',
        lastName: 'Smith',
        student_login: 'alicesmith',
        password: 'securepassword'
      };

      const res = await request(api).post('/users/register').send(newUser);

      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty('student_id');
    });

    it('should login a user', async () => {
      const loginData = {
        student_login: 'alicesmith',
        password: 'securepassword'
      };

      const res = await request(api).post('/users/login').send(loginData);

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('token');
    });
  });

  // Marks API Tests
  describe('Marks API', () => {
    it('should return leaderboard', async () => {
      const res = await request(api).get('/student/marks/leaders');

      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
    });

    it('should update marks and return updated score', async () => {
      const res = await request(api)
        .patch('/student/marks/score')
        .send({ student_id: 1, score: 10 });

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('total_marks');
    });
  });

  // Translate API Tests
  describe('Translate API', () => {
    it('should return translation questions', async () => {
      const res = await request(api).get('/spanish/games/translate/easy');

      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
    });

    it('should return 404 if no translation questions found', async () => {
      const res = await request(api).get('/spanish/games/translate/hard');

      expect(res.status).toBe(404);
      expect(res.body).toHaveProperty('error');
    });
  });
});
