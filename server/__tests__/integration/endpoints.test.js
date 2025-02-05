const request = require('supertest');
const { resetTestDB } = require('./config');
const app = require('../../app');

describe('Integration Tests for Spanish Translate and Users Endpoints', () => {
  let api;

  beforeAll(() => {
    api = app.listen(4000, () => {
      console.log('Test server running on port 4000');
    });
  });

  beforeEach(async () => {
    try {
      await resetTestDB();
    } catch (err) {
      console.log("Could not reset TestDB", err);
    }
  });

  afterAll((done) => {
    console.log('Gracefully closing server');
    api.close(done);
  });

  describe('GET /spanish/games/translate/:level', () => {
    it('should return 200 and an array of questions for a valid level', async () => {
      const level = 'easy';
      const response = await request(api).get(`/spanish/games/translate/${level}`);
      
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      if (response.body.length > 0) {
        const question = response.body[0];
        expect(question).toHaveProperty('question');
        expect(question).toHaveProperty('english');
        expect(question).toHaveProperty('fool_1');
        expect(question).toHaveProperty('fool_2');
        expect(question).toHaveProperty('fool_3');
      }
    });

    it('should return 404 with an error message for an invalid level', async () => {
      const invalidLevel = 'impossible';
      const response = await request(api).get(`/spanish/games/translate/${invalidLevel}`);
      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('error', `No questions found for level: ${invalidLevel}`);
    });
  });

  describe('GET /users', () => {
    it('should return 200 and an array of students', async () => {
      const response = await request(api).get('/users');
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThan(0);
    });
  });

  describe('POST /users/register', () => {
    it('should register a new user and return it with status 201', async () => {
      const newUser = {
        firstName: 'John',
        lastName: 'Doe',
        student_login: 'johndoe',
        password: 'secret123'
      };

      const response = await request(api)
        .post('/users/register')
        .send(newUser);

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('student_id');
      expect(response.body.firstName).toBe(newUser.firstName);
      expect(response.body.lastName).toBe(newUser.lastName);
      expect(response.body.student_login).toBe(newUser.student_login);
      expect(response.body.password).not.toBe(newUser.password);
    });

    it('should return 400 if required fields are missing', async () => {
      const incompleteUser = {
        firstName: 'John',
        lastName: 'Doe'
      };

      const response = await request(api)
        .post('/users/register')
        .send(incompleteUser);

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
    });
  });

  describe('POST /users/login', () => {
    it('should return 401 for a non-existent user', async () => {
      const loginData = {
        student_login: 'nonexistent',
        password: 'irrelevant'
      };

      const response = await request(api)
        .post('/users/login')
        .send(loginData);

      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty('error', 'Student does not exist!');
    });

    it('should return 401 for incorrect authentication credentials', async () => {
      const newUser = {
        firstName: 'Alice',
        lastName: 'Smith',
        student_login: 'alicesmith',
        password: 'password123'
      };

      await request(api)
        .post('/users/register')
        .send(newUser);

      const loginData = {
        student_login: 'alicesmith',
        password: 'wrongpassword'
      };

      const response = await request(api)
        .post('/users/login')
        .send(loginData);

      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty('error', 'User could not be authenticated');
    });

    it('should return 200 and a token when authentication is successful', async () => {
      const newUser = {
        firstName: 'Bob',
        lastName: 'Brown',
        student_login: 'bobbrown',
        password: 'mypassword'
      };

      await request(api)
        .post('/users/register')
        .send(newUser);

      const loginData = {
        student_login: 'bobbrown',
        password: 'mypassword'
      };

      const response = await request(api)
        .post('/users/login')
        .send(loginData);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('success', true);
      expect(response.body).toHaveProperty('token');
      expect(typeof response.body.token).toBe('string');
      expect(response.body.token.length).toBeGreaterThan(0);
    });
  });
});
