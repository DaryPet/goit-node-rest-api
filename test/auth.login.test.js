import request from 'supertest';
import { app } from '../app.js';
import { User } from '../db/index.js';

describe('POST /api/auth/login', () => {
  const testUser = {
    email: 'test@example.com',
    password: '123456'
  };

  beforeAll(async () => {
    await User.create(testUser);
  });

  afterAll(async () => {
    await User.destroy({ where: { email: testUser.email } });
  });

  it('should return 200 status', async () => {
    const response = await request(app)
      .post('/api/auth/login')
      .send(testUser);
    expect(response.status).toBe(200);
  });

  it('should return token', async () => {
    const response = await request(app)
      .post('/api/auth/login')
      .send(testUser);
    expect(response.body.token).toBeDefined();
    expect(typeof response.body.token).toBe('string');
  });

  it('should return user object with email and subscription', async () => {
    const response = await request(app)
      .post('/api/auth/login')
      .send(testUser);
    expect(response.body.user).toBeDefined();
    expect(response.body.user.email).toBe(testUser.email);
    expect(response.body.user.subscription).toBeDefined();
    expect(typeof response.body.user.subscription).toBe('string');
  });
});